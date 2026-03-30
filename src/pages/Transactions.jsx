import { useMemo, useState } from "react";
import { storage } from "../utils/storage";
import {
  formatInputDateToDDMMYYYY,
  getLastMonthsRange,
  getTodayRange,
  isFutureDate,
  isStartAfterEnd,
} from "../utils/transactionDates";
import {
  getTransactionReportStatus,
  submitTransactionReportQuery,
} from "../services/reportApi";
import TransactionFilterCard from "../components/transactions/TransactionFilterCard";
import TransactionSearchBar from "../components/transactions/TransactionSearchBar";
import TransactionTable from "../components/transactions/TransactionTable";

function Transactions() {
  const selectedProfile = storage.getSelectedProfile();
  const [filterType, setFilterType] = useState("today");
  const [monthlyRange, setMonthlyRange] = useState("3");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [latestQueryId, setLatestQueryId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const vpaId = selectedProfile?.vpa_id || "";

  const filteredRows = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return tableRows;
    return tableRows.filter((item) =>
      String(item?.Transaction_Id || "").toLowerCase().includes(keyword)
    );
  }, [tableRows, search]);

  /**
   * BUILD PAYLOAD
   * Logic: Use "both" for UI visibility, "excel" for file-only requests
   */
  const buildPayload = (isDownloadAction = false) => {
    if (!vpaId) throw new Error("VPA not found. Please re-login.");

    let start, end;
    if (filterType === "today") {
      const range = getTodayRange();
      start = range.startDate;
      end = range.endDate;
    } else if (filterType === "monthly") {
      const range = getLastMonthsRange(monthlyRange);
      start = range.startDate;
      end = range.endDate;
    } else {
      if (!startDate || !endDate) throw new Error("Please select start date and end date.");
      if (isFutureDate(startDate) || isFutureDate(endDate)) throw new Error("Dates cannot be in the future.");
      if (isStartAfterEnd(startDate, endDate)) throw new Error("Start date cannot be greater than end date.");
      start = formatInputDateToDDMMYYYY(startDate);
      end = formatInputDateToDDMMYYYY(endDate);
    }

    return {
      startDate: start,
      endDate: end,
      vpa_id: vpaId,
      // For Submit button: always try "both" so table data is returned
      // For Download button: use "excel" to ensure we get a fresh query_id for the file
      mode: isDownloadAction ? "excel" : "both",
    };
  };

  /**
   * HANDLE SUBMIT (Populate UI Table)
   */
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      setStatusMessage("");
      setTableRows([]); // Reset table while loading

      const payload = buildPayload(false); // Mode: "both"
      const response = await submitTransactionReportQuery(payload);

      // Successfully received data for the table
      if (response?.data && Array.isArray(response.data)) {
        setTableRows(response.data);
        setCurrentPage(1);
        
        // Capture query_id for download if the server provides it in "both" mode
        if (response.query_id) {
            setLatestQueryId(response.query_id);
        }

        if (response.data.length === 0) {
            setError("No transactions found for the selected range.");
        }
      } 
      // Fallback: If "both" only returns a query_id for large ranges
      else if (response?.query_id) {
        setLatestQueryId(response.query_id);
        setStatusMessage("Report is too large to display. Please click 'Download All' to view.");
      }
    } catch (err) {
      setError(err.statusDescription || err.message || "Unable to load transactions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * HANDLE DOWNLOAD ALL (Generate/Fetch Excel)
   */
  const handleDownloadAll = async () => {
    try {
      setIsDownloading(true);
      setError("");
      
      let queryId = latestQueryId;

      // If no QueryId exists yet (e.g. user hasn't clicked Submit), 
      // or we need a specific "excel" mode queryId
      if (!queryId) {
        const payload = buildPayload(true); // Forces mode: "excel"
        const response = await submitTransactionReportQuery(payload);
        queryId = response?.query_id;
        setLatestQueryId(queryId);
      }

      if (!queryId) throw new Error("Could not generate report query ID.");

      const statusResponse = await getTransactionReportStatus(queryId);
      const report = statusResponse?.data;

      if (report?.status === "READY" && report?.signed_url) {
        // Cleaning URL as per previous requirements
        const cleanUrl = report.signed_url.trim().split(',')[0];
        window.open(cleanUrl, "_blank", "noopener,noreferrer");
        setStatusMessage("Download started successfully.");
      } else {
        // If status is "PROCESSING" or "NOT_FOUND"
        setStatusMessage(`Report status: ${report?.status || 'PREPARING'}. Please wait a moment and try again.`);
      }
    } catch (err) {
      setError(err.statusDescription || err.message || "Unable to download report.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-[28px] font-bold text-[#1f1f1f]">
        Transaction Reports
      </h1>

      <div className="space-y-6">
        {/* Filter Section */}
        <TransactionFilterCard
          filterType={filterType}
          monthlyRange={monthlyRange}
          startDate={startDate}
          endDate={endDate}
          onFilterTypeChange={setFilterType}
          onMonthlyRangeChange={setMonthlyRange}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Dynamic Status / Error Messages */}
        {(error || statusMessage) && (
          <div className={`p-4 rounded-lg border text-[13px] ${
            error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-blue-50 border-blue-200 text-[#0b69c7]'
          }`}>
            {error || statusMessage}
          </div>
        )}

        {/* Table & Search Section */}
        <div className="bg-white rounded-lg border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50 border-b border-[#e8e8e8]">
            <TransactionSearchBar value={search} onChange={setSearch} />

            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="bg-[#0b69c7] hover:bg-[#0956a3] text-white px-6 py-2.5 rounded text-[13px] font-semibold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? "Checking Status..." : "Download All"}
            </button>
          </div>

          <TransactionTable
            rows={filteredRows}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;