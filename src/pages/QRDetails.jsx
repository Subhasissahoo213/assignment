import { useEffect, useMemo, useState } from "react";
import QrDetailsForm from "../components/qr/QrDetailsForm";
import QrPreviewPanel from "../components/qr/QrPreviewPanel";
import Spinner from "../components/common/Spinner";
import StatusModal from "../components/common/StatusModal";
import { convertQrToBase64 } from "../services/qrApi";
import { buildDynamicQrString, downloadBase64Image, getBase64ImageSrc } from "../utils/qr";
import { storage } from "../utils/storage";

function QRDetails() {
  const selectedProfile = storage.getSelectedProfile();

  const [qrType, setQrType] = useState("static");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const merchantName = useMemo(
    () => selectedProfile?.merchant_name || "Merchant",
    [selectedProfile]
  );

  const vpaId = useMemo(() => selectedProfile?.vpa_id || "-", [selectedProfile]);
  const baseQrString = useMemo(() => selectedProfile?.qr_string || "", [selectedProfile]);
  const imageSrc = useMemo(() => getBase64ImageSrc(base64Image), [base64Image]);

  useEffect(() => {
    const loadStaticQr = async () => {
      if (!baseQrString) {
        setError("QR string not available for selected profile.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await convertQrToBase64(baseQrString);
        const image = response?.base64Image || response?.data?.base64Image || "";

        if (!image) {
          throw new Error("Unable to generate QR image.");
        }

        setBase64Image(image);
      } catch (err) {
        setError(err.message || "Unable to load QR image.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStaticQr();
  }, [baseQrString]);

  const handleTypeChange = async (type) => {
    setQrType(type);
    setError("");

    if (type === "static") {
      setAmount("");
      setShowSuccessModal(false);

      if (!base64Image && baseQrString) {
        try {
          setIsLoading(true);
          const response = await convertQrToBase64(baseQrString);
          const image = response?.base64Image || response?.data?.base64Image || "";
          setBase64Image(image);
        } catch (err) {
          setError(err.message || "Unable to load static QR.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setError("");

      if (qrType === "static") {
        if (!base64Image && baseQrString) {
          setIsGenerating(true);
          const response = await convertQrToBase64(baseQrString);
          const image = response?.base64Image || response?.data?.base64Image || "";
          setBase64Image(image);
        }
        return;
      }

      const dynamicQrString = buildDynamicQrString({
        baseQrString,
        amount,
      });

      setIsGenerating(true);
      const response = await convertQrToBase64(dynamicQrString);
      const image = response?.base64Image || response?.data?.base64Image || "";

      if (!image) {
        throw new Error("Unable to generate dynamic QR image.");
      }

      setBase64Image(image);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || "Unable to generate QR.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!base64Image) return;
    downloadBase64Image(base64Image, `static-qr-${vpaId}.png`);
  };

  return (
    <div>
      <h1 className="mb-4 text-[28px] font-semibold text-[#1f1f1f]">QR Details</h1>

      <div className="space-y-4">
        <QrDetailsForm
          qrType={qrType}
          amount={amount}
          onTypeChange={handleTypeChange}
          onAmountChange={setAmount}
          onSubmit={handleSubmit}
          isGenerating={isGenerating}
        />

        {error ? (
          <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded border border-[#e8e8e8] bg-white p-4">
            <Spinner />
          </div>
        ) : (
          <QrPreviewPanel
            qrType={qrType}
            imageSrc={imageSrc}
            merchantName={merchantName}
            vpaId={vpaId}
            amount={amount}
            onDownload={handleDownload}
            showDownloadButton={qrType === "static" && Boolean(base64Image)}
          />
        )}
      </div>

      <StatusModal
        open={showSuccessModal}
        title="Payment Successful!"
        message="Your transaction has been completed successfully."
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default QRDetails;
