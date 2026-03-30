function QrCard({
  title,
  merchantName,
  vpaId,
  imageSrc,
  amount,
  validityText,
  showAmount = false,
}) {
  return (
    <div className="flex flex-col items-center">
      {showAmount ? (
        <>
          <p className="text-[12px] text-[#444]">Amount to be Collected</p>
          <p className="mb-2 text-[24px] font-semibold text-[#e11d48]">₹ {amount}</p>
        </>
      ) : null}

      <div className="w-[190px] rounded-[12px] border border-[#dddddd] bg-white px-4 py-2 text-center shadow-sm">
        <p className="text-[11px] font-semibold uppercase text-[#333]">{merchantName}</p>
        <p className="mb-1 text-[16px] font-bold text-[#222]">{title}</p>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt="QR Code"
            className="mx-auto mt-2 h-[170px] w-[170px] object-contain"
          />
        ) : (
          <div className="mx-auto mt-2 flex h-[170px] w-[170px] items-center justify-center border border-dashed border-[#d9d9d9] text-[12px] text-[#999]">
            QR Preview
          </div>
        )}

        <p className="mt-2 break-all text-[9px] font-semibold text-[#444]">UPI ID: {vpaId}</p>

        <div className="mt-2 text-[18px] font-bold text-[#666]">BHIM UPI</div>
        <div className="mt-1 flex justify-center gap-3 text-[10px] text-[#666]">
          <span>CRED</span>
          <span>PhonePe</span>
          <span>GPay</span>
          <span>Paytm</span>
        </div>
      </div>

      {validityText ? (
        <p className="mt-2 text-[12px] font-medium text-[#e11d48]">{validityText}</p>
      ) : null}
    </div>
  );
}

export default QrCard;
