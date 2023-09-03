import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from "@/components/UseAuth";

function Navigation() {
  const { authenticated, logout, setAuthenticated } = useAuth();

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [setAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Run Tracker</div>
        <div className='flex container justify-end'>
        <Link className="bg-green-500 hover:bg-red-600 text-white py-2 px-4 mx-2 rounded cursor-pointer " href="/createRun">Create Run</Link>
        <Link className="bg-green-500 hover:bg-red-600 text-white py-2 px-4 mx-2 rounded cursor-pointer" href="/">Home</Link>
        {authenticated ? (
          <a
            onClick={handleLogout}
            href="/"
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mx-2 rounded cursor-pointer"
          >
            Logout
          </a>
        ) : (
          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mx-2 rounded"
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
