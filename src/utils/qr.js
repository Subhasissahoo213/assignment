export const buildDynamicQrString = ({ baseQrString, amount }) => {
  if (!baseQrString) {
    throw new Error("Base QR string not found.");
  }

  if (!amount) {
    throw new Error("Amount is required.");
  }

  const parsedAmount = String(amount).trim();

  if (!parsedAmount || Number(parsedAmount) <= 0) {
    throw new Error("Please enter a valid amount.");
  }

  const separator = baseQrString.includes("?") ? "&" : "?";

  if (/[?&]am=/.test(baseQrString)) {
    return baseQrString.replace(/([?&]am=)[^&]*/i, `$1${encodeURIComponent(parsedAmount)}`);
  }

  return `${baseQrString}${separator}am=${encodeURIComponent(parsedAmount)}`;
};

export const getBase64ImageSrc = (base64Image) => {
  if (!base64Image) return "";
  return `data:image/png;base64,${base64Image}`;
};

export const downloadBase64Image = (base64Image, fileName = "qr-code.png") => {
  const link = document.createElement("a");
  link.href = getBase64ImageSrc(base64Image);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};