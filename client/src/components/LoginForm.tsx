import React, { useState } from 'react';
import axios from 'axios';



interface LoginFormProps {
  onSuccess: () => void; // Callback function to be called on successful login
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        
        const token = response.data.token;
        
        localStorage.setItem('token', token);
        console.log("Token:", token);
        // Update the authentication state here
        onSuccess(); // or call any function to update the state
        window.location.reload()
      }
    } catch (error) {
      console.log("The error is: " + error);
      // Handle errors here if needed
    }
  };
  


  return (
    <div className='flex justify-center'>
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
    
  );
};

export default LoginForm;
// interface LoginFormProps {
//   onSuccess: (username: string, password: string) => void; // Define other props if needed
// }





// // LoginForm.js
// import React, { useState } from "react";
// import { useAuth } from "@/components/UseAuth";

// const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
//   const { login } = useAuth(); // Get the login function from useAuth

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
  
//     // Call the login function from useAuth
//     login(username, password);

//     // After successful login, you can call onSuccess if needed
//     onSuccess(username, password);
//   };

//   return (
//     <div className='flex justify-center'>
//     <form className="w-full max-w-sm" onSubmit={handleSubmit}>
//       <div className="md:flex md:items-center mb-6">
//        <div className="md:w-1/3">
//          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
//            Username
//          </label>
//        </div>
//         <div className="md:w-2/3">
          
//          <input
//             className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             />
//         </div>
//       </div>
//       <div className="md:flex md:items-center mb-6">
//         <div className="md:w-1/3">
//           <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
//             Password
//           </label>
//         </div>
//         <div className="md:w-2/3">
//           <input
//               className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
//               id="inline-password"
//               type="password"
//               placeholder="******************"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//         </div>
//       </div>
//       <div className="md:flex md:items-center">
//         <div className="md:w-1/3"></div>
//         <div className="md:w-2/3">
//           <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
//             Login
//           </button>
//         </div>
//       </div>
//     </form>
//     </div>
//   );
// };

// export default LoginForm;
