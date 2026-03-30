import { useEffect, useMemo, useState } from "react";
import EmptySupportState from "../components/support/EmptySupportState";
import SupportFilters from "../components/support/SupportFilters";
import SupportTable from "../components/support/SupportTable";
import RaiseTicketModal from "../components/support/RaiseTicketModal";
import TicketDetailsCard from "../components/support/TicketDetailsCard";
import TicketMessagesPanel from "../components/support/TicketMessagesPanel";
import CloseTicketModal from "../components/support/CloseTicketModal";
import {
  closeSupportTicket,
  createSupportTicket,
  getSupportTicketDetails,
  getSupportTickets,
  reopenSupportTicket,
  sendSupportReply,
} from "../services/supportApi";

function Support() {
  const [mode, setMode] = useState("list");
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const filteredTickets = useMemo(() => tickets, [tickets]);

  const loadTickets = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      setInfoMessage("");

      const response = await getSupportTickets({
        startDate,
        endDate,
        status,
        search,
      });

      setTickets(Array.isArray(response?.data) ? response.data : []);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || "Unable to load support tickets.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleViewDetails = async (ticketId) => {
    try {
      setError("");
      const response = await getSupportTicketDetails(ticketId);
      setSelectedTicket(response?.data || null);
      setMode("details");
    } catch (err) {
      setError(err.message || "Unable to load ticket details.");
    }
  };

  const handleRaiseTicket = async (payload) => {
    try {
      setIsSubmitting(true);
      setError("");
      setInfoMessage("");

      await createSupportTicket(payload);
      setIsRaiseModalOpen(false);
      setInfoMessage("Ticket raised successfully.");
      await loadTickets();
    } catch (err) {
      setError(err.message || "Unable to raise ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendReply = async (message) => {
    try {
      if (!selectedTicket) return;

      setIsReplying(true);
      setError("");

      const response = await sendSupportReply({
        ticketId: selectedTicket.ticketId,
        message,
      });

      setSelectedTicket((prev) => ({
        ...prev,
        messages: [...(prev?.messages || []), response.data],
      }));
    } catch (err) {
      setError(err.message || "Unable to send reply.");
    } finally {
      setIsReplying(false);
    }
  };

  const handleReopenTicket = async () => {
    try {
      if (!selectedTicket) return;

      setError("");
      const response = await reopenSupportTicket(selectedTicket.ticketId);
      setInfoMessage(response.message || "Ticket reopened successfully.");
      setSelectedTicket((prev) => ({
        ...prev,
        status: "Open",
        canReopen: false,
        canClose: true,
      }));
    } catch (err) {
      setError(err.message || "Unable to reopen ticket.");
    }
  };

  const handleCloseTicket = async () => {
    try {
      if (!selectedTicket) return;

      setIsClosing(true);
      setError("");
      const response = await closeSupportTicket(selectedTicket.ticketId);
      setInfoMessage(response.message || "Ticket closed successfully.");
      setIsCloseModalOpen(false);
      setSelectedTicket((prev) => ({
        ...prev,
        status: "Resolved",
        canClose: false,
        canReopen: true,
      }));
    } catch (err) {
      setError(err.message || "Unable to close ticket.");
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-[28px] font-semibold text-[#1f1f1f]">Help &amp; Support</h1>

        <button
          type="button"
          onClick={() => {
            setMode("list");
            setIsRaiseModalOpen(true);
          }}
          className="rounded bg-[#0b69c7] px-4 py-2 text-[12px] font-medium text-white"
        >
          Raise a ticket
        </button>
      </div>

      {error ? (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {error}
        </div>
      ) : null}

      {infoMessage ? (
        <div className="mb-4 rounded border border-blue-200 bg-blue-50 px-4 py-3 text-[13px] text-[#0b69c7]">
          {infoMessage}
        </div>
      ) : null}

      {mode === "list" ? (
        tickets.length === 0 ? (
          <div className="rounded border border-[#e8e8e8] bg-white">
            <EmptySupportState />
          </div>
        ) : (
          <div className="space-y-4">
            <SupportFilters
              startDate={startDate}
              endDate={endDate}
              status={status}
              search={search}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onStatusChange={setStatus}
              onSearchChange={setSearch}
              onSubmit={loadTickets}
              isSubmitting={isSubmitting}
            />

            <SupportTable
              rows={filteredTickets}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              onViewDetails={handleViewDetails}
            />
          </div>
        )
      ) : selectedTicket ? (
        <div className="space-y-4">
          <TicketDetailsCard
            ticket={selectedTicket}
            onReopen={handleReopenTicket}
            onCloseTicket={() => setIsCloseModalOpen(true)}
          />

          <TicketMessagesPanel
            messages={selectedTicket.messages || []}
            onSendReply={handleSendReply}
            isSending={isReplying}
          />
        </div>
      ) : null}

      <RaiseTicketModal
        open={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        onSubmit={handleRaiseTicket}
        isSubmitting={isSubmitting}
      />

      <CloseTicketModal
        open={isCloseModalOpen}
        ticket={selectedTicket}
        onCancel={() => setIsCloseModalOpen(false)}
        onConfirm={handleCloseTicket}
        isSubmitting={isClosing}
      />
    </div>
  );
}

export default Support;