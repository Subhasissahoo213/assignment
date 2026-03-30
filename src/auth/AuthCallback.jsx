import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authConfig } from "./authConfig";
import { fetchByMobileNumber } from "../services/userApi";
import { storage } from "../utils/storage";

function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const processLogin = async () => {
      try {
        setError("");

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const returnedState = params.get("state");
        const savedState = localStorage.getItem("auth_state");
        const codeVerifier = localStorage.getItem("code_verifier");
        const loginMobileNumber = storage.getLoginMobileNumber();

        if (!code) {
          throw new Error("Authorization code not found.");
        }

        if (!returnedState || returnedState !== savedState) {
          throw new Error("Invalid auth state. Please login again.");
        }

        if (!codeVerifier) {
          throw new Error("Missing code verifier. Please login again.");
        }

        if (!loginMobileNumber) {
          throw new Error("Missing login mobile number. Please login again.");
        }

        const tokenResponse = await fetch(authConfig.tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: authConfig.clientId,
            code,
            redirect_uri: authConfig.redirectUri,
            code_verifier: codeVerifier,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok || !tokenData.access_token) {
          throw new Error(tokenData.error_description || "Login failed.");
        }

        storage.setToken(tokenData.access_token);
        storage.clearAuthArtifacts();

        const fetchByIdResponse = await fetchByMobileNumber(loginMobileNumber);
        const fetchedProfiles = Array.isArray(fetchByIdResponse?.data)
          ? fetchByIdResponse.data
          : [];

        if (fetchedProfiles.length === 0) {
          throw new Error("No VPA records found for this mobile number.");
        }

        storage.setProfileList(fetchedProfiles);

        if (fetchedProfiles.length === 1) {
          storage.setSelectedProfile(fetchedProfiles[0]);
        }

        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError(err.message || "Unable to complete login flow.");
      }
    };

    processLogin();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md">
        <h1 className="text-lg font-semibold text-[#2d2d2d]">Signing you in</h1>

        {!error ? (
          <p className="mt-3 text-sm text-[#666666]">
            Completing authentication and loading dashboard...
          </p>
        ) : (
          <div className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthCallback;