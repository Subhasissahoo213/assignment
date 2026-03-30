import { secureGet, securePost } from "./api";

const normalizeLanguageValue = (value) => {
  if (!value) return "";
  return String(value).trim().toUpperCase();
};

const normalizeLanguageLabel = (value) => {
  if (!value) return "";
  const lower = String(value).trim().toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const extractLanguageList = (response) => {
  const possibleLists = [
    response?.data,
    response?.languages,
    response?.language_list,
    response?.result,
    response,
  ];

  const list = possibleLists.find((item) => Array.isArray(item)) || [];

  return list
    .map((item) => {
      if (typeof item === "string") {
        return {
          label: normalizeLanguageLabel(item),
          value: normalizeLanguageValue(item),
        };
      }

      const rawValue =
        item?.value || item?.language || item?.lang || item?.name || item?.label;

      if (!rawValue) return null;

      return {
        label: normalizeLanguageLabel(rawValue),
        value: normalizeLanguageValue(rawValue),
      };
    })
    .filter(Boolean);
};

const extractCurrentLanguage = (response) => {
  const rawValue =
    response?.current_language ||
    response?.language ||
    response?.data?.current_language ||
    response?.data?.language ||
    response?.result?.current_language ||
    response?.result?.language ||
    "";

  return {
    label: normalizeLanguageLabel(rawValue),
    value: normalizeLanguageValue(rawValue),
  };
};

export const fetchAvailableLanguages = async () => {
  const response = await secureGet("/idbi/isu_soundbox/lang/fetch_language");
  return extractLanguageList(response);
};

export const fetchCurrentLanguage = async (serialNumber) => {
  if (!serialNumber) {
    throw new Error("Serial number is required to fetch current language.");
  }

  const response = await secureGet(
    `/idbi/isu_soundbox/user_api/current_language/${serialNumber}`
  );

  return extractCurrentLanguage(response);
};

export const updateLanguage = async ({ tid, update_language }) => {
  if (!tid) {
    throw new Error("Serial number is required to update language.");
  }

  return securePost("/idbi/isu_soundbox/lang/update_language", {
    tid,
    update_language: normalizeLanguageValue(update_language),
  });
};