// src/pages/auth/SSOCallback.jsx
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function SSOCallback() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      {/* Clerk handles the OAuth token exchange */}
      <AuthenticateWithRedirectCallback />

      {/* Your loader or custom UI */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300 text-lg">Signing you in...</p>
      </div>
    </div>
  );
}
