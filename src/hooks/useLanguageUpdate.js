import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAvailableLanguages,
  fetchCurrentLanguage,
  updateLanguage,
} from "../services/languageApi";

export const useLanguageUpdate = ({ vpaId, serialNumber }) => {
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState({
    label: "",
    value: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadPageData = useCallback(async () => {
    if (!serialNumber) {
      setError("Serial number not found.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const [languageList, current] = await Promise.all([
        fetchAvailableLanguages(),
        fetchCurrentLanguage(serialNumber),
      ]);

      setLanguages(languageList);
      setCurrentLanguage(current);
      setSelectedLanguage(current?.value || "");
    } catch (err) {
      setError(err.message || "Unable to load language details.");
    } finally {
      setIsLoading(false);
    }
  }, [serialNumber]);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  const isUpdateDisabled = useMemo(() => {
    return (
      isLoading ||
      isUpdating ||
      !selectedLanguage ||
      selectedLanguage === currentLanguage.value
    );
  }, [isLoading, isUpdating, selectedLanguage, currentLanguage.value]);

  const handleCancel = useCallback(() => {
    setSelectedLanguage(currentLanguage.value || "");
    setError("");
  }, [currentLanguage.value]);

  const handleUpdate = useCallback(async () => {
    try {
      setIsUpdating(true);
      setError("");

      await updateLanguage({
        tid: serialNumber,
        update_language: selectedLanguage,
      });

      const updatedCurrentLanguage =
        languages.find((item) => item.value === selectedLanguage) ||
        currentLanguage;

      setCurrentLanguage(updatedCurrentLanguage);
      setSelectedLanguage(updatedCurrentLanguage.value);
      setSuccessMessage("Language update request initiated successfully");
    } catch (err) {
      setError(err.message || "Unable to update language.");
    } finally {
      setIsUpdating(false);
    }
  }, [serialNumber, selectedLanguage, languages, currentLanguage]);

  return {
    vpaId,
    serialNumber,
    languages,
    currentLanguage,
    selectedLanguage,
    isLoading,
    isUpdating,
    error,
    successMessage,
    isUpdateDisabled,
    setSelectedLanguage,
    setSuccessMessage,
    handleCancel,
    handleUpdate,
    reload: loadPageData,
  };
};