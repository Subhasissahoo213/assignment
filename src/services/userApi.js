import { securePost } from "./api";

export const fetchByMobileNumber = async (mobileNumber) => {
  if (!mobileNumber) {
    throw new Error("Mobile number is required to fetch user details.");
  }

  return securePost("/idbi/fetch/fetchById", {
    mobile_number: mobileNumber,
  });
};