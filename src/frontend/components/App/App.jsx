import React from "react";
import Content from "../Content/Content";
import Signup from "../Signup/SignUp";
import './App.css';
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import About from "../About/About";
import Contact from "../Contact/Contact";
import ResetPassword from "../ResetPassword/ResetPassword";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const App = () => {
    const location = useLocation();
    const token = useParams();
    return (
        <div className='App'>
           <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path={`/reset-password/:token`} element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<div>Page not found</div>} />
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