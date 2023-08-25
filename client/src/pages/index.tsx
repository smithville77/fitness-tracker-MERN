import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h1>RunApp</h1>
      <button><Link href="/login">Login</Link></button>
    </>
  
  )
}
