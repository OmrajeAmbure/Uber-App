import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function User_Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    setEmail('');
    setPassword('');
    console.log('User Data:', userData); // Optional: Log user data to check
  };

  return (
    <div className="p-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-24"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler} className='mt-3'>
          <h3 className="text-xl mb-2">What is Your Email</h3>
          <input
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />
          <h3 className="text-xl mb-2">Enter Your Password</h3>
          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          New Here?{' '}
          <Link className="text-blue-600" to="/signup">
            Create New Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to='/caption_login'
          type="button" // Use button type as "button" for non-form actions
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Sign In as Captain
        </Link>
      </div>
    </div>
  );
}

export default User_Login;
