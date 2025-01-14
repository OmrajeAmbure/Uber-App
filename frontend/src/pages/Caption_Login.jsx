import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Caption_Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CaptionData, setCaptionData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptionData({
            email: email,
            password: password,
        });
        console.log(CaptionData.email)
        setEmail('');
        setPassword('');
        console.log('User Data:', CaptionData); // Optional: Log user data to check
    };
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-36"
                    src="./img/Caption_logo.webp"
                    alt="Uber Driver Logo"
                />
                <form onSubmit={submitHandler} className='mt-3'>
                    <h3 className="text-xl mb-2">What is our Caption's Email</h3>
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
                    join a Fleet?{''}
                    <Link className="text-blue-600" to="/Caption_Signup">
                        Register as a Caption
                    </Link>
                </p>
            </div>
            <div>
                <Link
                    to='/login'
                    type="button" // Use button type as "button" for non-form actions
                    className="bg-[#f9ba31] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
                >
                    Sign In as User
                </Link>
            </div>
        </div>
    );
}

export default Caption_Login