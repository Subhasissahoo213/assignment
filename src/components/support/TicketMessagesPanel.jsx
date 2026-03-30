import { useState } from "react";
import { formatSupportDate } from "../../utils/support";

function MessageAvatar({ initials }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9e9e9e] text-[16px] font-semibold text-white">
      {initials}
    </div>
  );
}

function TicketMessagesPanel({ messages, onSendReply, isSending }) {
  const [reply, setReply] = useState("");

  const handleSend = () => {
    if (!reply.trim()) return;
    onSendReply(reply.trim());
    setReply("");
  };

  return (
    <div className="rounded border border-[#e8e8e8] bg-white">
      <div className="border-b px-5 py-4">
        <h3 className="text-[16px] font-medium text-[#333]">Messages</h3>
      </div>

      <div className="px-6 py-6">
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-[#1d7de3] px-6 py-3 text-[13px] font-medium text-white shadow-[0_6px_10px_rgba(250,120,30,0.45)]"
          >
            ↑ Show Older Messages
          </button>
        </div>

        <div className="space-y-8">
          {messages.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative">
                <MessageAvatar initials={item.senderInitials} />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#6abf40] ring-2 ring-white" />
              </div>

              <div className="max-w-[740px]">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-[#555]">{item.senderName}</p>
                  <p className="text-[12px] text-[#999]">{formatSupportDate(item.sentAt)}</p>
                </div>

                <p className="mt-2 text-[14px] leading-7 text-[#444]">{item.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 rounded border border-[#bdbdbd] px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0e0e0] text-[16px]">
            🧑
          </div>
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Reply here..."
            className="h-[38px] flex-1 border-none bg-transparent text-[14px] outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="text-[24px] text-[#333] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketMessagesPanel;