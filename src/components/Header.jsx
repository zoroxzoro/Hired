import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false); // Fixed spelling
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch();
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to="/post-job">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/myjobs"
                  />
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/savejob"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Link>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
