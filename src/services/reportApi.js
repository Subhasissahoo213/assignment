const REPORT_BASE_URL =
  import.meta.env.VITE_REPORT_BASE_URL || "https://api-dev-stage.iserveu.online";

// Mandatory Passkey provided in your initial prompt
const PASS_KEY = "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    // Adding the mandatory IDBI Pass_key
    "Pass_key": PASS_KEY, 
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseJsonResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    const data = JSON.parse(text);
    
    /** 
     * Optimization: If this is the status response, 
     * clean the signed_url (as docs showed trailing commas/spaces)
     */
    if (data?.data?.signed_url) {
      data.data.signed_url = data.data.signed_url.trim().split(',')[0];
    }
    
    return data;
  } catch {
    throw new Error("Invalid server response format.");
  }
};

const handleErrorResponse = async (response) => {
  const payload = await parseJsonResponse(response).catch(() => ({}));

  // Match the error field names from your documentation (statusDescription)
  const message =
    payload?.statusDescription ||
    payload?.message ||
    payload?.error ||
    `Request failed with status ${response.status}`;

  throw new Error(message);
};

/**
 * 1. Submit Query for Transaction Reports
 * @param {Object} payload { startDate, endDate, vpa_id, mode }
 */
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

/**
 * 2. Get status and download link for a submitted query
 * @param {string} queryId 
 */
export const getTransactionReportStatus = async (queryId) => {
  // Ensure queryId is passed as a path parameter per IDBI docs
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