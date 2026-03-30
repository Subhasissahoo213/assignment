export const SUPPORT_STATUS_OPTIONS = [
  { label: "Pending", value: "Pending" },
  { label: "Unresolved", value: "Unresolved" },
  { label: "Resolved", value: "Resolved" },
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
];

export const SUPPORT_REASON_OPTIONS = [
  { label: "Transaction Related", value: "Transaction Related" },
  { label: "Settlement Issue", value: "Settlement Issue" },
  { label: "Refund Related", value: "Refund Related" },
  { label: "QR Issue", value: "QR Issue" },
  { label: "Language Update Issue", value: "Language Update Issue" },
  { label: "Other", value: "Other" },
];

export const formatSupportDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatSupportShortDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};