import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const signInWithGoogle = async () => {
    if (!signIn) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback", // make sure these are configured in Clerk dashboard
      });
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="outline"
      className="w-full text-white border-zinc-200 h-11 cursor-pointer"
    >
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButton;
