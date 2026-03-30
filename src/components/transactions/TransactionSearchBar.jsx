function TransactionSearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-[220px]">
      <input
        type="text"
        placeholder="Search here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[34px] w-full rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
      />
    </div>
  );
}

export default TransactionSearchBar;