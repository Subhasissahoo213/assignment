const statusMap = {
  Pending: "bg-[#fff4e8] text-[#f59e0b]",
  Unresolved: "bg-[#ffe9ef] text-[#ff5b8a]",
  Resolved: "bg-[#eefbe7] text-[#6abf40]",
  Open: "bg-[#eefbe7] text-[#6abf40]",
  "In Progress": "bg-[#fff4e8] text-[#f59e0b]",
};

function SupportStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded px-2 py-1 text-[11px] font-medium ${
        statusMap[status] || "bg-[#eef6ff] text-[#1d7de3]"
      }`}
    >
      {status}
    </span>
  );
}

export default SupportStatusBadge;