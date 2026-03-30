import { useState } from "react";
import { SUPPORT_REASON_OPTIONS } from "../../utils/support";

function RaiseTicketModal({ open, onClose, onSubmit, isSubmitting }) {
  const [reasonType, setReasonType] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!reasonType) {
      setError("Please select reason.");
      return;
    }

    if (!transactionId.trim()) {
      setError("Please enter transaction ID.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter description.");
      return;
    }

    setError("");
    onSubmit({
      reasonType,
      transactionId,
      description,
      attachmentName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[520px] rounded bg-white shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
        <div className="border-b px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#2f2f2f]">Raise a Query</h2>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Reason</label>
            <select
              value={reasonType}
              onChange={(e) => setReasonType(e.target.value)}
              className="h-[38px] w-full rounded border border-[#dddddd] px-3 text-[13px] outline-none"
            >
              <option value="">Please Select Reason</option>
              {SUPPORT_REASON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Transaction ID</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter the Transaction ID"
              className="h-[38px] w-full rounded border border-[#dddddd] px-3 text-[13px] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any additional details..."
              className="w-full rounded border border-[#dddddd] px-3 py-3 text-[13px] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Attachment</label>
            <label className="flex h-[46px] cursor-pointer items-center gap-3 rounded border border-dashed border-[#d8d8d8] px-3 text-[13px] text-[#888]">
              <span>📎</span>
              <span>{attachmentName || "Please Add Attachment"}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachmentName(e.target.files?.[0]?.name || "")}
              />
            </label>
          </div>

          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
              {error}
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] font-medium text-[#ef4444]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded bg-[#0b69c7] px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaiseTicketModal;