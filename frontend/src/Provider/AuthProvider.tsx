import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type {ReactNode} from "react"
import axiosInstance from "@/Utils/axios";
import { Loader } from "lucide-react";

interface AuthProviderProps {
  children: ReactNode;
}

// Update Axios default Authorization header
const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded || !userId) return; // wait until Clerk session is ready

    const authInit = async () => {
      setLoading(true);
      try {
        // Get JWT token from Clerk
        const token = await getToken();
        updateApiToken(token);

        // Call backend to sync user (upsert)
        if (user) {
          await axiosInstance.post("/auth/callback", {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          });
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
        updateApiToken(null);
      } finally {
        setLoading(false);
      }
    };

    authInit();
  }, [getToken, isLoaded, userId, user]);

  // Show loader while waiting for Clerk session / token
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // Once loaded, render children
  return <>{children}</>;
};

export default AuthProvider;
