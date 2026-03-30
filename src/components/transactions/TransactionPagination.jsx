function TransactionPagination({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-3 border-t border-[#efefef] px-4 py-3 text-[12px] text-[#666] md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <span>Row per page</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="h-[28px] rounded border border-[#dddddd] bg-white px-2 text-[12px] outline-none"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <span>Go to</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!value) return;
            if (value >= 1 && value <= totalPages) {
              setCurrentPage(value);
            }
          }}
          className="h-[28px] w-[44px] rounded border border-[#dddddd] px-2 text-[12px] outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="h-[28px] w-[28px] rounded border border-[#dddddd] text-[#666] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹
        </button>

        {pages.slice(0, 7).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`h-[28px] min-w-[28px] rounded border px-2 ${
              currentPage === page
                ? "border-[#1d7de3] bg-[#eef6ff] text-[#1d7de3]"
                : "border-[#dddddd] bg-white text-[#666]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="h-[28px] w-[28px] rounded border border-[#dddddd] text-[#666] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default TransactionPagination;