import React, { useEffect, useState, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { dataContext } from '../UserContext/UserContext';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates checking state
    const [loading, setLoading] = useState(true); // Loading state to wait for verification
    const location = useLocation();
    const { setUser } = useContext(dataContext);

    useEffect(() => {
        // const queryString = window.location.search;
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            // Exchange the code for user details
            exchangeCodeForToken(code);
        }
    }, [window.location.search]);
  
    const exchangeCodeForToken = async (code) => {
        try {
            const res = await axios.post(
                `/api/auth/github`,
                { code },
                { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );
            
            console.log('User Details:', res?.data?.user);
            localStorage.setItem("UserData", JSON.stringify(res?.data?.user))
            setUser(JSON.parse(localStorage.getItem('UserData')))
            // Handle user authentication (e.g., save user info in state/context)
            window.location.href='/home'
            setIsAuthenticated(true);
            // navigate('/'); // Redirect to your app's dashboard
        } catch (err) {
            console.error('GitHub Auth Error:', err);
            setIsAuthenticated(false); // If verification fails, set to false
            localStorage.removeItem('UserData'); // Removes any trace or instance of the current User Data in LocalStorage
            setUser(null);
        }
    };

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await axios.get('/api/authenticate', { withCredentials: true });
                console.log('Token valid:', res.data.isValid);
                console.log(res.data.user)
                localStorage.setItem('UserData', JSON.stringify(res.data.user));
                setUser(JSON.parse(localStorage.getItem('UserData')))
                setIsAuthenticated(res.data.isValid); // Update authentication state
            } catch (err) {
                console.error('Token verification error:', err.message);
                setIsAuthenticated(false); // If verification fails, set to false
                localStorage.removeItem('UserData'); // Removes any trace or instance of the current User Data in LocalStorage
                setUser(null);
            } finally {
                setLoading(false); // Mark loading as complete
            }
        };

        verifyToken();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while token is being verified
    }

    // If not authenticated, redirect to signup
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ path: location.pathname }} replace />;
};

export default ProtectedRoute;
