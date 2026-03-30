function QrDetailsForm({
  qrType,
  amount,
  onTypeChange,
  onAmountChange,
  onSubmit,
  isGenerating,
}) {
  return (
    <div className="rounded border border-[#e8e8e8] bg-white p-4">
      <p className="mb-3 text-[12px] text-[#8a8a8a]">Select The Type of QR</p>

      <div className="mb-4 flex items-center gap-5 text-[13px] text-[#444]">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="qr_type"
            checked={qrType === "static"}
            onChange={() => onTypeChange("static")}
          />
          Static
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="qr_type"
            checked={qrType === "dynamic"}
            onChange={() => onTypeChange("dynamic")}
          />
          Dynamic
        </label>
      </div>

      {qrType === "static" ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSubmit}
            className="rounded bg-[#0b69c7] px-4 py-2 text-[12px] font-medium text-white"
          >
            Submit
          </button>
        </div>
      ) : (
        <>
          <p className="mb-3 text-[13px] text-[#777]">
            Enter an amount to instantly generate your dynamic QR code
          </p>

          <label className="mb-2 block text-[12px] text-[#6a6a6a]">
            Amount to be collected
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="Enter the amount to be collected"
              className="h-[38px] w-full max-w-[260px] rounded border border-[#dddddd] bg-white px-3 text-[13px] text-[#444] outline-none"
            />

            <button
              type="button"
              onClick={onSubmit}
              disabled={isGenerating}
              className="rounded bg-[#0b69c7] px-4 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? "Generating..." : "Generate QR"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QrDetailsForm;
