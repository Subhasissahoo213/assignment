import { SUPPORT_STATUS_OPTIONS } from "../../utils/support";

function SupportFilters({
  startDate,
  endDate,
  status,
  search,
  onStartDateChange,
  onEndDateChange,
  onStatusChange,
  onSearchChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <>
      <div className="rounded border border-[#e8e8e8] bg-white p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="h-[34px] min-w-[140px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="h-[34px] min-w-[140px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Ticket Status</label>
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="h-[34px] min-w-[150px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            >
              <option value="">Select Ticket Status</option>
              {SUPPORT_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded bg-[#0b69c7] px-4 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <div className="rounded border border-[#e8e8e8] bg-white p-4">
        <input
          type="text"
          placeholder="Enter Username"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-[34px] w-full max-w-[220px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
        />
      </div>
    </>
  );
}

export default SupportFilters;