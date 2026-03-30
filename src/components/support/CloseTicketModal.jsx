import SupportStatusBadge from "./SupportStatusBadge";
import { formatSupportShortDate } from "../../utils/support";

function CloseTicketModal({ open, ticket, onCancel, onConfirm, isSubmitting }) {
  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[520px] rounded bg-white shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
        <div className="border-b px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#2f2f2f]">Close Ticket?</h2>
        </div>

        <div className="p-5">
          <div className="rounded border border-[#ececec] p-4">
            <p className="text-[24px] font-semibold text-[#333]">
              🏳 Ticket ID: #{ticket.ticketId}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] text-[#8b8b8b]">Reason Type</p>
                <p className="mt-1 text-[16px] font-semibold text-[#333]">{ticket.reasonType}</p>
              </div>

              <div>
                <p className="text-[12px] text-[#8b8b8b]">Raised Date</p>
                <p className="mt-1 text-[16px] font-semibold text-[#333]">
                  {formatSupportShortDate(ticket.raisedDate)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 rounded border border-[#ececec] p-4">
              <div>
                <p className="text-[12px] text-[#8b8b8b]">Transaction ID</p>
                <p className="mt-1 text-[16px] font-semibold text-[#333]">{ticket.transactionId}</p>
              </div>

              <div>
                <p className="text-[12px] text-[#8b8b8b]">Status</p>
                <div className="mt-1">
                  <SupportStatusBadge status="In Progress" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] font-medium text-[#ef4444]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="rounded bg-[#ff2d2d] px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Closing..." : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CloseTicketModal;