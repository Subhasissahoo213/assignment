import QrCard from "./QrCard";

function QrPreviewPanel({
  qrType,
  imageSrc,
  merchantName,
  vpaId,
  amount,
  onDownload,
  showDownloadButton,
}) {
  return (
    <div className="rounded border border-[#e8e8e8] bg-white p-4">
      <div className="flex min-h-[310px] flex-col items-center justify-center">
        {qrType === "static" ? (
          <>
            <p className="mb-4 text-[12px] font-medium text-[#333]">Select The Type of QR</p>
            <QrCard
              title="Scan & Pay"
              merchantName={merchantName}
              vpaId={vpaId}
              imageSrc={imageSrc}
            />

            {showDownloadButton ? (
              <button
                type="button"
                onClick={onDownload}
                className="mt-5 rounded bg-[#0b69c7] px-4 py-2 text-[12px] font-medium text-white"
              >
                Download QR
              </button>
            ) : null}
          </>
        ) : (
          <QrCard
            title="Scan & Pay"
            merchantName={merchantName}
            vpaId={vpaId}
            imageSrc={imageSrc}
            amount={amount}
            showAmount
            validityText="Valid till 1:29"
          />
        )}
      </div>
    </div>
  );
}

export default QrPreviewPanel;
