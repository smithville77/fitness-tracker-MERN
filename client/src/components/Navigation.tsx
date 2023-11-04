import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from "../components/UseAuth";
import FitbitAuthButton from './FitBitAuthBtn';
import { useRouter } from 'next/router'; 
// import logo from './public/dashdata-high-resolution-logo.png'


function Navigation() {
  const { authenticated, logout, setAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("useEffect triggered");
    
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [authenticated, setAuthenticated]);

  
  

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="" id="navbar">
      <div className="container mx-auto flex justify-between items-center">
      <img
        src="/images/dashdata-high-resolution-logo.png"
        alt="dashData logo"
        style={{height: "80px"}}
        // className="text-white text-2xl font-bold"
      />

        <div className='flex container justify-end'>
        <Link className={`py-2 px-4 mx-2 rounded cursor-pointer ${router.pathname === '/createRun' ? 'active' : ''}`} href="/createRun">
            Create Run
          </Link>
          <Link className={`py-2 px-4 mx-2 rounded cursor-pointer ${router.pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
          <Link className={`py-2 px-4 mx-2 rounded cursor-pointer ${router.pathname === '/profile' ? 'active' : ''}`} href="/profile">
            Profile
          </Link>
          <Link className={`py-2 px-4 mx-2 rounded cursor-pointer ${router.pathname === '/runDisplayPage' ? 'active' : ''}`} href="/runDisplayPage">
            Run Data
          </Link>

        <FitbitAuthButton  />
        {authenticated ? (
          <a
            onClick={handleLogout}
            href="/"
            className="py-2 px-4 mx-2 rounded cursor-pointer"
          >
            Logout
          </a>
        ) : (

          <Link className={`py-2 px-4 mx-2 rounded cursor-pointer ${router.pathname === '/login' ? 'active' : ''}`} href="/login">
            Login
          </Link>
          
        )}
       </div> 
      </div>
    </nav>
  );
}

export default Navigation;
