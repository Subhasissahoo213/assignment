import { securePost } from "./api";

export const convertQrToBase64 = async (qrString) => {
  if (!qrString) {
    throw new Error("QR string is required.");
  }

  return securePost(
    "/idbi/merchant/qr_convert_to_base64",
    { qrString },
    { requestDataKey: "RequestData" }
  );
};