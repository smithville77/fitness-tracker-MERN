import react, { useState } from 'react';
import axios from 'axios';

interface SignUpFormProps {
  onSuccess: () => void; // Callback function to be called on successful login
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null)


    const handleSubmit =  async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        const response = await axios.post('http://localhost:3001/users/signup', {
        username,
        email,
        password,
        dateOfBirth,
        height,
        weight,
      });
      if (response.status === 200) {

      }

      } 
    }

  return (
    
    <div className='flex justify-center'>
    <h1>This is a signup form</h1>
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Username
          </label>
        </div>
        <div className="md:w-2/3">
          
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
            Password
          </label>
        </div>
        
        <div className="md:w-2/3">
          <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id="inline-password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
      </div>
{/* email */}
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
            Password
          </label>
        </div>
        
        <div className="md:w-2/3">
          <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id="inline-email"
              type="email"
              value={email}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
    </div>
  )
}

//needs to get data from login form fields and save them as state;
// create a handleSubmit function;
  // try {
    // response = await axios.post('http://localhost:3001/users/signup')
  //}

  // respond with success message "successful signup"
  // re route user to login page


