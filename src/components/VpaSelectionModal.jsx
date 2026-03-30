import { useEffect, useState } from "react";

function VpaSelectionModal({ open, profiles = [], onCancel, onProceed }) {
  const [selectedVpa, setSelectedVpa] = useState("");

  useEffect(() => {
    if (profiles.length > 0) {
      setSelectedVpa(profiles[0].vpa_id || "");
    }
  }, [profiles]);

  if (!open) return null;

  const selectedProfile = profiles.find((item) => item.vpa_id === selectedVpa);

  const handleProceed = () => {
    if (selectedProfile) {
      onProceed(selectedProfile);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[420px] rounded bg-white shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
        <div className="border-b px-5 py-4">
          <h2 className="text-[15px] font-medium text-[#2d2d2d]">Select VPA</h2>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-[12px] text-[#5a5a5a]">Select a VPA to Proceed</p>

          <div className="space-y-2">
            {profiles.map((item) => (
              <label
                key={`${item.vpa_id}-${item.serial_number}`}
                className="flex cursor-pointer items-center gap-3 rounded border border-[#ebebeb] px-3 py-3 hover:bg-[#fafafa]"
              >
                <input
                  type="radio"
                  name="selected_vpa"
                  checked={selectedVpa === item.vpa_id}
                  onChange={() => setSelectedVpa(item.vpa_id)}
                  className="h-4 w-4"
                />
                <span className="text-[13px] text-[#3f3f3f]">{item.vpa_id}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 pb-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] font-medium text-[#ef4444]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleProceed}
            disabled={!selectedProfile}
            className="rounded bg-[#0b69c7] px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default VpaSelectionModal;