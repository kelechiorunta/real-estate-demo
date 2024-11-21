import React from "react";
import Content from "../Content/Content";
import Signup from "../Signup/SignUp";
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import About from "../About/About";
import Contact from "../Contact/Contact";

const App = () => {
    const location = useLocation();
    return (
        <div className='App'>
           <Routes location={location} key={location.pathname}>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Content />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>
                {/* <Route path="/" element={<Content />} /> */}
           </Routes>
        </div>
    );
};

export default App;