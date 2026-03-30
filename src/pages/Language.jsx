import LanguageForm from "../components/language/LanguageForm";
import LanguageHeader from "../components/language/LanguageHeader";
import Spinner from "../components/common/Spinner";
import StatusModal from "../components/common/StatusModal";
import { useLanguageUpdate } from "../hooks/useLanguageUpdate";
import { storage } from "../utils/storage";

function Language() {
  const selectedProfile = storage.getSelectedProfile();

  const vpaId = selectedProfile?.vpa_id || "";
  const serialNumber = selectedProfile?.serial_number || "";

  const {
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
  } = useLanguageUpdate({
    vpaId,
    serialNumber,
  });

  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#f5f5f5] px-4 py-5 md:px-6">
      <LanguageHeader />

      {isLoading ? (
        <Spinner />
      ) : (
        <LanguageForm
          vpaId={vpaId}
          serialNumber={serialNumber}
          currentLanguage={currentLanguage}
          selectedLanguage={selectedLanguage}
          languages={languages}
          error={error}
          isUpdating={isUpdating}
          isUpdateDisabled={isUpdateDisabled}
          onSelectLanguage={setSelectedLanguage}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
        />
      )}

      <StatusModal
        open={Boolean(successMessage)}
        title="Language update request"
        message="Initiated Successfully"
        onClose={() => setSuccessMessage("")}
      />
    </div>
  );
}

export default Language;