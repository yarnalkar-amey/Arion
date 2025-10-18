import axiosInstance from "@/Utils/axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthCallback = () => {
  const { isLoaded, user } = useUser();
  const nevigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) return;

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in the auth callback: " + error);
      } finally {
        nevigate("/");
      }
    };

    syncUser();
  }, [isLoaded, nevigate, user]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300 text-lg">Signing you in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
