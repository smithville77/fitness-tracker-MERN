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
  const [form, setForm] = useState("signup");

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
        className="w-1/4 h-[700px] mt-10 flex flex-col bg-white text-black bg-opacity-40 justify-between items-center p-5 rounded shadow-2xl"
      >
        <span className="flex flex-col items-center p-3">
          <h1 className="text-4xl font-bold mb-3">Welcome to Dash Data</h1>
          <p>Please login or signup to continue</p>
        </span>
        


        
        {form === "login" ? (
          <LoginForm />
        ) : form === "signup" ? (
          <SignUpForm />
        ) : null}
        <div id="sign-btn-container" className="p-3 w-full h1/4 flex justify-center items-center ">
          
          {form === "signup" ? (
            <>
            <p>Already a member? &nbsp; &nbsp;</p>
            <br />
          <Button className="font-bold py-2 px-4 rounded border-4 border-lime-500/75 bg-inherit hover:bg-lime-500" onClick={handleLoginFormClick}>Login</Button>
            </>
          ) : ( 
          <>
          <p>Not a member? Sign up here &nbsp; &nbsp;</p>
          <Button className="font-bold py-2 px-4 rounded border-4 border-lime-500/75 bg-inherit hover:bg-lime-500 " onClick={handleSignUpFormClick}>Signup</Button>
          </>
          )}
          
        </div>
        
      </span>
      </section>
      
    </Fragment>
  );
};

export default HomePage;


// Image by <a href="https://www.freepik.com/free-photo/abstract-gradient-neon-lights_22893786.htm#query=neon%20gradient&position=3&from_view=keyword&track=ais&uuid=98a6f8da-e6d4-4801-baf9-bcf6c5c116c6">Freepik</a>