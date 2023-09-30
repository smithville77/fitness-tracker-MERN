import { Inter } from 'next/font/google'
import Link from 'next/link'
import * as React from "react";
import { useState } from 'react';
import Navigation from '../components/Navigation';
import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';
import { Button } from 'react-bootstrap';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [form, setForm] = useState("");

  const handleLoginFormClick = () => {
    setForm("login");
  }

  const handleSignUpFormClick = () => {
    setForm("signup");
  }

  return (
    <>
      <Navigation />
      <h1>RunApp</h1>
      <p>Welcome to the home page!</p>
      {/* <Link href="/login">Login</Link> */}
      <Button onClick={handleLoginFormClick}>Login</Button>
      <Button onClick={handleSignUpFormClick}>Signup</Button>
      {form === "login" ? <LoginForm /> : form === "signup" ? <SignUpForm /> : null}
    </>
  )
}
