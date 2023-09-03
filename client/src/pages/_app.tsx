import '@/styles/globals.css'
import type { AppProps } from 'next/app'


import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/UseAuth'; // Import the useAuth hook
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { authenticated } = useAuth(); // Use the useAuth hook

  // Redirect to the login page if not authenticated
  useEffect(() => {
    const currentPath = router.pathname;
    if (!authenticated && currentPath !== '/login') {
      router.push('/login');
    }
  }, [authenticated, router]);
  

  return <Component {...pageProps} />;
}

export default MyApp;


