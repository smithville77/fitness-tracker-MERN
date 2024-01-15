import { Inter } from 'next/font/google'
import Link from 'next/link'
import * as React from "react";
import { useState } from 'react';
import Navigation from '../components/Navigation';
import HomePage from '../components/Home'
import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';
import { Button } from 'react-bootstrap';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  return (
    <>
      <Navigation />
      <HomePage />
    </>
  )
}
