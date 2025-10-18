import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/Utils/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthCallback = () => {
  const {isLoaded, user} = useUser();
  const nevigate = useNavigate();

  useEffect(() => {
    const syncUser = async() => {
      try {
        if(!isLoaded || !user) return;

        await axiosInstance.post("/auth/callback",{
          id:user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })

      } catch (error) {
        console.log("Error in the auth callback: " + error);
      }finally {
        nevigate("/");
      }
    }

    syncUser();
  },[isLoaded, nevigate, user]);
  
  return <div className="h-screen w-screen bg-black flex items-center justify-center">
    <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-700">
      <CardContent className="flex flex-col item items-center gap-4 pt-6">
        <Loader className="size-6 text-[var(--color-arion-mid)] animate-spin"/>
        <h3 className="text-xl font-bold">Logging You In</h3>
        <p className="text-sm">Redirecting...</p>
      </CardContent>
    </Card>
  </div>;
};

export default AuthCallback;
