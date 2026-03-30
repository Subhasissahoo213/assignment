import { encryptResponse, decryptRequest } from "../utils/crypto";
import { storage } from "../utils/storage";

const BASE_URL =
  import.meta.env.VITE_AUTH_BASE_URL || "https://auth-dev-stage.iserveu.online";
const PASS_KEY = import.meta.env.VITE_PASS_KEY || "";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const buildHeaders = (extraHeaders = {}) => {
  const token = storage.getToken();

  return {
    ...DEFAULT_HEADERS,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(PASS_KEY ? { pass_key: PASS_KEY } : {}),
    ...extraHeaders,
  };
};

const tryParseJson = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const parseResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    try {
      const decrypted = decryptRequest(text);
      return tryParseJson(decrypted);
    } catch {
      throw new Error("Invalid server response format.");
    }
  }

  if (parsed?.RequestData && typeof parsed.RequestData === "string") {
    try {
      const decrypted = decryptRequest(parsed.RequestData);
      return tryParseJson(decrypted);
    } catch {
      return parsed;
    }
  }

  if (parsed?.ResponseData && typeof parsed.ResponseData === "string") {
    try {
      const decrypted = decryptRequest(parsed.ResponseData);
      return tryParseJson(decrypted);
    } catch {
      return parsed;
    }
  }

  if (parsed?.data && typeof parsed.data === "string") {
    try {
      const decrypted = decryptRequest(parsed.data);
      return tryParseJson(decrypted);
    } catch {
      return parsed;
    }
  }

  if (parsed?.response && typeof parsed.response === "string") {
    try {
      const decrypted = decryptRequest(parsed.response);
      return tryParseJson(decrypted);
    } catch {
      return parsed;
    }
  }

  return parsed;
};

const handleHttpError = async (response) => {
  let errorPayload = {};

  try {
    errorPayload = await parseResponse(response);
  } catch {
    errorPayload = {};
  }

  const message =
    errorPayload?.message ||
    errorPayload?.error ||
    errorPayload?.detail ||
    `Request failed with status ${response.status}`;

  throw new Error(message);
};

export const secureGet = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    ...options,
    headers: buildHeaders(options.headers),
  });

  if (!response.ok) {
    await handleHttpError(response);
  }

  return parseResponse(response);
};

export const securePost = async (endpoint, payload = {}, options = {}) => {
  const encryptedPayload = encryptResponse(JSON.stringify(payload));
  const requestDataKey = options.requestDataKey || "RequestData";

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    ...options,
    headers: buildHeaders(options.headers),
    body: JSON.stringify({
      [requestDataKey]: encryptedPayload,
    }),
  });

  if (!response.ok) {
    await handleHttpError(response);
  }

  return parseResponse(response);
};