import { useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom'

function signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            fullName: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password
        });
        alert(`User registered successfully: ${firstName} ${lastName}, Email: ${email}`);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-24"
                    src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
                    alt="Uber Logo"
                />
                <form onSubmit={submitHandler}>
                    <h3 className="text-base mb-2">What is Your Name</h3>
                    <div className='flex gap-3 mb-5'>
                        <input
                            type="text"
                            placeholder="First Name"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
                        />
                    </div>
                    <h3 className="text-base mb-2">What is Your Email</h3>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                    />
                    <h3 className="text-base mb-2">Enter Your Password</h3>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                    />
                    <button
                        type="submit"
                        className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center">
                    Already have a Account ?{' '}
                    <Link className="text-blue-600" to="/login">
                        Login Here
                    </Link>
                </p>
            </div>
            <div>
                <p className=' text-[15px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means,</p>
            </div>
        </div>
    );
}

export default signup