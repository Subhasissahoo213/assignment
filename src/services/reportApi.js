const REPORT_BASE_URL =
  import.meta.env.VITE_REPORT_BASE_URL || "https://api-dev-stage.iserveu.online";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseJsonResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid server response format.");
  }
};

const handleErrorResponse = async (response) => {
  const payload = await parseJsonResponse(response).catch(() => ({}));

  const message =
    payload?.statusDescription ||
    payload?.message ||
    payload?.error ||
    `Request failed with status ${response.status}`;

  throw new Error(message);
};

export const submitTransactionReportQuery = async (payload) => {
  const response = await fetch(
    `${REPORT_BASE_URL}/idbi/sb/reports/querysubmit_user`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return parseJsonResponse(response);
};

export const getTransactionReportStatus = async (queryId) => {
  const response = await fetch(
    `${REPORT_BASE_URL}/idbi/sb/reports/get_report_status/${queryId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return parseJsonResponse(response);
};