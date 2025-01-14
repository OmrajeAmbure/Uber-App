import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import User_Login from './pages/User_Login';
import User_Signup from './pages/User_Signup';
import Caption_Signup from './pages/Caption_Signup';
import Caption_Login from './pages/Caption_Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<User_Login />} />
        <Route path="/signup" element={< User_Signup />} />
        <Route path="/caption_signup" element={< Caption_Signup />} />
        <Route path="/caption_login" element={< Caption_Login />} />
      </Routes>
    </div>
  );
}

export default App;
