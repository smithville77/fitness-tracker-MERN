
import { Inter } from 'next/font/google'
import Link from 'next/link'
import * as React from "react";
import Navigation from '../components/Navigation';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navigation />
      <h1>RunApp</h1>
      <p>Welcome to the home page!</p>
      {/* <Link href="/login">Login</Link> */}
    </>
  
  )
}
