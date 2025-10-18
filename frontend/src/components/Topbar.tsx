import { Link } from "react-router";
import logo from "../assets/ChatGPT Image Oct 16, 2025, 09_08_13 AM.png";
import { LayoutDashboardIcon } from "lucide-react";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import SignInOAuthButton from "../components/SignInOAuthButton";
import { Button } from "./ui/button";


const Topbar = () => {
  const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 backdrop-blur-md z-10">
      <div className="flex items-center gap-2 hover:scale-[1.1] transition-all duration-300">
        <Link to="/">
             <img src={logo} alt="Arion logo" className="size-[4rem]" />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4">
        {
            isAdmin && (
                <Link to="/admin" className="flex items-center gap-1">
                    <LayoutDashboardIcon className="size-4 mr-2"/>
                    Admin Dashboard
                </Link>
            )
        }
        <SignedOut>
            <SignInOAuthButton/>
        </SignedOut>

        <SignedIn>
            <SignOutButton>
              <Button variant="secondary" className="">Logout</Button>
            </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default Topbar;
