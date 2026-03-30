import { formatDisplayDateTime } from "../../utils/transactionDates";
import TransactionPagination from "./TransactionPagination";

function TransactionTable({
  rows,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = rows.slice(startIndex, startIndex + pageSize);

  return (
    <div className="overflow-hidden rounded border border-[#ececec] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-[#efefef] bg-white text-[12px] text-[#6a6a6a]">
              <th className="px-4 py-4 font-medium">S. No.</th>
              <th className="px-4 py-4 font-medium">Transaction ID</th>
              <th className="px-4 py-4 font-medium">Amount</th>
              <th className="px-4 py-4 font-medium">Date</th>
              <th className="px-4 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((item, index) => (
                <tr
                  key={`${item.Transaction_Id}-${index}`}
                  className="border-b border-[#f3f3f3] text-[12px] text-[#444]"
                >
                  <td className="px-4 py-4">{startIndex + index + 1}</td>
                  <td className="px-4 py-4">{item.Transaction_Id || "-"}</td>
                  <td className="px-4 py-4">
                    {item.Transaction_Amount ?? "-"}
                  </td>
                  <td className="px-4 py-4">
                    {formatDisplayDateTime(item["Date_&_Time"])}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded bg-[#eefbe7] px-2 py-1 text-[11px] font-medium text-[#6abf40]">
                      Received
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-[13px] text-[#888]"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TransactionPagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default TransactionTable;