import React from 'react';
import './Home.css'
import UserCard from '../UserCard/UserCard';


const Home = () => {
    return (
        <div className='home'>
            <h1>Welcome to the Home Page</h1>
            <UserCard/>
        </div>
    )
  };
  
  export default Home;
  