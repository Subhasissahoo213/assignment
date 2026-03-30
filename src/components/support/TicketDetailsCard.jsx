import SupportStatusBadge from "./SupportStatusBadge";
import { formatSupportShortDate } from "../../utils/support";

function TicketDetailsCard({ ticket, onReopen, onCloseTicket }) {
  return (
    <div className="rounded border border-[#e8e8e8] bg-white">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-[22px] font-semibold text-[#2f2f2f]">
          Ticket ID: #{ticket.ticketId}
        </h2>

        {ticket.canReopen ? (
          <button
            type="button"
            onClick={onReopen}
            className="rounded bg-[#58c11b] px-4 py-2 text-[12px] font-medium text-white"
          >
            Reopen
          </button>
        ) : null}

        {ticket.canClose ? (
          <button
            type="button"
            onClick={onCloseTicket}
            className="rounded bg-[#f1f1f1] px-4 py-2 text-[12px] font-medium text-[#666]"
          >
            Close Ticket
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 py-7 md:grid-cols-3">
        <div>
          <p className="text-[13px] font-medium text-[#8b8b8b]">Reason Type</p>
          <p className="mt-2 text-[18px] font-semibold text-[#333]">{ticket.reasonType}</p>

          <p className="mt-5 text-[13px] font-medium text-[#8b8b8b]">Raised Date</p>
          <p className="mt-2 text-[16px] font-semibold text-[#333]">
            {formatSupportShortDate(ticket.raisedDate)}
          </p>
        </div>

        <div className="border-l border-[#dff0c9] pl-6">
          <p className="text-[13px] font-medium text-[#8b8b8b]">Transaction ID</p>
          <p className="mt-2 text-[18px] font-semibold text-[#333]">{ticket.transactionId}</p>

          <p className="mt-5 text-[13px] font-medium text-[#8b8b8b]">Status</p>
          <div className="mt-2">
            <SupportStatusBadge status={ticket.status} />
          </div>
        </div>

        <div className="border-l border-[#dff0c9] pl-6">
          <p className="text-[13px] font-medium text-[#8b8b8b]">Description</p>
          <p className="mt-2 text-[15px] leading-7 text-[#333]">{ticket.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsCard;