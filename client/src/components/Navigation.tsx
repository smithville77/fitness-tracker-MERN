import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../components/UseAuth";
import FitbitAuthButton from "./FitBitAuthBtn";
import { useRouter } from "next/router";

function Navigation() {
  const { authenticated, logout, setAuthenticated } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!authenticated) {
  //     router.push('/');
  //   }
  // }, [authenticated, router]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setAuthenticated(!!token);
  // }, [setAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="top-0 sticky z-30" id="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex container justify-end">
          <Link
            className={`py-2 px-4 mx-2 rounded cursor-pointer ${
              router.pathname === "/profile" ? "active" : ""
            }`}
            href="/profile"
          >
            Profile
          </Link>
          <Link
            className={`py-2 px-4 mx-2 rounded cursor-pointer ${
              router.pathname === "/runDisplayPage" ? "active" : ""
            }`}
            href="/runDisplayPage"
          >
            Run Data
          </Link>
          <FitbitAuthButton />
          {authenticated ? (
            <a
              onClick={handleLogout}
              href="/"
              className="py-2 px-4 mx-2 rounded cursor-pointer"
            >
              Logout
            </a>
          ) : (
            <Link
              className={`py-2 px-4 mx-2 rounded cursor-pointer ${
                router.pathname === "/login" ? "active" : ""
              }`}
              href="/"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
