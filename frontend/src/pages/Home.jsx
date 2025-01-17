import React from 'react'
import { Link } from 'react-router-dom';
export const Home = () => {
    return (
        <div>
            <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover h-screen  w-full flex justify-between flex-col">
                <img className='w-28' src="./public/img/logo.png" alt="" />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
                    <Link to={'/login'} className='inline-block w-full bg-black text-white py-3 rounded mt-6 text-center'>Continue</Link>
                </div>
            </div>
        </div>
    );
};
