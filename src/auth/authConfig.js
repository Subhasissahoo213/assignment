export const authConfig = {
  issuer:
    import.meta.env.VITE_AUTH_ISSUER ||
    "https://idbi-auth-stage.isupay.in/application/o/idbi/",
  authorizationEndpoint:
    import.meta.env.VITE_AUTHORIZATION_ENDPOINT ||
    "https://idbi-auth-stage.isupay.in/application/o/authorize/",
  tokenEndpoint:
    import.meta.env.VITE_TOKEN_ENDPOINT ||
    "https://idbi-auth-stage.isupay.in/application/o/token/",
  clientId: import.meta.env.VITE_CLIENT_ID || "",
  redirectUri:
    import.meta.env.VITE_REDIRECT_URI || "http://localhost:5173/redirected",
  scopes: [
    "openid",
    "profile",
    "email",
    "offline_access",
    "authorities",
    "privileges",
    "user_name",
    "created",
    "adminName",
    "bankCode",
    "goauthentik.io/api",
  ],
};