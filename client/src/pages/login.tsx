import React from "react";
import { useAuth } from "@/components/UseAuth";
import LoginForm from "@/components/LoginForm";
import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import Profile from "./profile";
import Navigation from "@/components/Navigation";

function LoginPage() {
  const { authenticated, login } = useAuth();
  const [form, setForm] = useState("login");

  const handleLoginFormClick = () => {
    setForm("login");
  };

  const handleSignUpFormClick = () => {
    setForm("signup");
  };

  const handleLoginSuccess = () => {
    login();
    window.location.reload();
  };

  return (
    <div>
      <Navigation />
      {authenticated ? (
        <Profile />
      ) : (
        // Render the login form
        <Fragment>
          <section className="flex justify-center">
            <span
              id="main-home-container"
              className="w-1/4 h-[700px] mt-10 flex flex-col bg-white text-black bg-opacity-40 justify-between items-center p-5 rounded shadow-2xl"
            >
              <span className="flex flex-col items-center p-3">
                <h1 className="text-4xl font-bold mb-3">
                  Welcome to Dash Data
                </h1>
                <p>Please login or signup to continue</p>
              </span>

              {form === "login" ? (
                <LoginForm onSuccess={handleLoginSuccess} />
              ) : form === "signup" ? (
                <SignUpForm />
              ) : null}
              <div
                id="sign-btn-container"
                className="p-3 w-full h1/4 flex justify-center items-center "
              >
                {form === "signup" ? (
                  <>
                    <p>Already a member? &nbsp; &nbsp;</p>
                    <br />
                    <Button
                      className="font-bold py-2 px-4 rounded border-4 border-lime-500/75 bg-inherit hover:bg-lime-500"
                      onClick={handleLoginFormClick}
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <>
                    <p>Not a member? Sign up here &nbsp; &nbsp;</p>
                    <Button
                      className="font-bold py-2 px-4 rounded border-4 border-lime-500/75 bg-inherit hover:bg-lime-500 "
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
      )}
    </div>
  );
}

export default LoginPage;
