import React from 'react';
import './Homepage.css'
import { useNavigate } from 'react-router-dom';

const Homepage = ({setLoginUser}) => {

  const navigate = useNavigate();

  const handle=()=>{
    
      setLoginUser({});
      navigate("/login");
  }

  return (
    <div className='home'>
        <h2>Hello Homepage</h2>
        <div className='button' onClick={handle}>Logout</div>
    </div>
    
  )
}

export default Homepage