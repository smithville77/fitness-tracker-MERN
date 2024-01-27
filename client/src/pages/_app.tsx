// import '@/styles/globals.css'
import '@/styles/globalsTwo.css'
import type { AppProps } from 'next/app'



import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/UseAuth'; // Import the useAuth hook
// import '../styles/globals.css';
import '../styles/globalsTwo.css';

function MyApp({ Component, pageProps }) {


  return <Component {...pageProps} />;
}

export default MyApp;


