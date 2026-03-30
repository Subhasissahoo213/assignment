function TransactionFilterCard({
  filterType,
  monthlyRange,
  startDate,
  endDate,
  onFilterTypeChange,
  onMonthlyRangeChange,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="rounded border border-[#e8e8e8] bg-white p-4">
      <p className="mb-4 text-[12px] text-[#8a8a8a]">Select a Report Filter</p>

      <div className="mb-4 flex flex-wrap items-center gap-5 text-[12px] text-[#444]">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="report_filter"
            checked={filterType === "today"}
            onChange={() => onFilterTypeChange("today")}
          />
          Today
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="report_filter"
            checked={filterType === "monthly"}
            onChange={() => onFilterTypeChange("monthly")}
          />
          Monthly
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="report_filter"
            checked={filterType === "range"}
            onChange={() => onFilterTypeChange("range")}
          />
          Custom Range
        </label>
      </div>

      {filterType === "monthly" ? (
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-2 block text-[12px] text-[#666]">Monthly</label>
            <select
              value={monthlyRange}
              onChange={(e) => onMonthlyRangeChange(e.target.value)}
              className="h-[34px] min-w-[140px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            >
              <option value="1">Last 1 Month Report</option>
              <option value="3">Last 3 Month Report</option>
              <option value="6">Last 6 Month Report</option>
              <option value="12">Last 12 Month Report</option>
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
      ) : null}

      {filterType === "range" ? (
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

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded bg-[#0b69c7] px-4 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : null}

      {filterType === "today" ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded bg-[#0b69c7] px-4 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TransactionFilterCard;