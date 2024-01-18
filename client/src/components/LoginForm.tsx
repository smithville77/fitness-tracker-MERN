import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true); // Set loading to true on form submission
      const response = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("Token:", token);
        onSuccess();
        router.push("/profile");
      }
    } catch (error) {
      console.log("The error is: " + error);
      // Handle errors here if needed
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  return (
    <div className="flex justify-center">
      {loading ? (
        // Render loading spinner here
        <div className="spinner">Loading...</div>
      ) : (
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-lime-500"
                id="inline-full-name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-lime-500"
                id="inline-password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-lime-500 hover:bg-lime-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded shadow-xl"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
