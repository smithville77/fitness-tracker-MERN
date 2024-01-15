import React, { Fragment } from "react";
import { Inter } from "next/font/google";
import { useState } from "react";
import Navigation from "../components/Navigation";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { Button } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

interface HomePageProps {
  
}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const [form, setForm] = useState("");

  const handleLoginFormClick = () => {
    setForm("login");
  };

  const handleSignUpFormClick = () => {
    setForm("signup");
  };

  return (
    <Fragment>
      <section className="flex justify-center">
      <span
        id="main-home-container"
        className="w-3/4 h-[100vh] flex flex-col text-white justify-center items-center"
      >
        <h1>RunApp</h1>
        <p>Welcome to the home page!</p>
        <Button onClick={handleLoginFormClick}>Login</Button>
        <Button onClick={handleSignUpFormClick}>Signup</Button>
        {form === "login" ? (
          <LoginForm />
        ) : form === "signup" ? (
          <SignUpForm />
        ) : null}
      </span>
      </section>
      
    </Fragment>
  );
};

export default HomePage;


// Image by <a href="https://www.freepik.com/free-photo/abstract-gradient-neon-lights_22893786.htm#query=neon%20gradient&position=3&from_view=keyword&track=ais&uuid=98a6f8da-e6d4-4801-baf9-bcf6c5c116c6">Freepik</a>