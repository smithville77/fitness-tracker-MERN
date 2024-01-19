import React, { Fragment } from 'react';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';
import { Button } from 'react-bootstrap';
import { useAuth } from './UseAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const { authenticated, login } = useAuth();
  const [form, setForm] = useState<'login' | 'signup'>('signup');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginFormClick = () => {
    setForm('login');
  };

  const handleSignUpFormClick = () => {
    setForm('signup');
  };

  return (
    <>
      <Fragment>
        <section className="flex justify-center">
          <span
            id="main-home-container"
            className="lg:w-1/2 xl:w-1/4 sm:w-1/2 h-fit mt-10 flex flex-col bg-white text-black bg-opacity-40 justify-between items-center p-5 rounded shadow-2xl"
          >
            <span className="flex flex-col items-center p-3">
              <h1 className="text-4xl font-bold mb-3">Welcome to Dash Data</h1>
              <p>Please login or signup to continue</p>
            </span>

            {form === 'login' ? (
              <LoginForm onSuccess={() => setLoading(false)} />
            ) : form === 'signup' ? (
              <SignUpForm />
            ) : null}
            <div
              id="sign-btn-container"
              className="p-3 w-full h1/4 flex justify-center items-center "
            >
              {form === 'signup' ? (
                <>
                  <p>Already a member? &nbsp; &nbsp;</p>
                  <br />
                  <Button
                    className="font-bold py-2 px-4 bg-inherit hover:text-lime-500"
                    onClick={handleLoginFormClick}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <p>Not a member? Sign up here &nbsp;</p>
                  <Button
                    className="font-bold py-2 px-4 bg-inherit hover:text-lime-500"
                    onClick={handleSignUpFormClick}
                  >
                    Signup
                  </Button>
                </>
              )}
            </div>
          </span>
        </section>
      </Fragment>
    </>
  );
};

export default HomePage;
