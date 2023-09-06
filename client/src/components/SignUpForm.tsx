import react, { useState } from 'react';
import axios from 'axios';

interface SignUpFormProps {
  onSuccess: () => void; // Callback function to be called on successful login
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {


  return (
    <h1>This is a signup form</h1>
  )
}

//needs to get data from login form fields and save them as state;
// create a handleSubmit function;
  // try {
    // response = await axios.post('http://localhost:3001/users/signup')
  //}

  // respond with success message "successful signup"
  // re route user to login page


