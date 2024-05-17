import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';


function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password.length < 6) {
        setSignupError("Password should be more than 5 characters");
        return;
      }

      const response = await axios.post(`https://list-of-warrriors.onrender.com/Signup`, { username, password });
      if (response.status === 200) {
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('signupSuccess', 'Signup successful'); 
        sessionStorage.setItem('username',username);
        navigate("/");
      } else {
        setSignupError('Signup failed');
      }
    } catch (err) {
      console.error(err);
      setSignupError('An error occurred during the signup');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          type="text" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <br></br>

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <br></br>
        {signupError && <p className="error">{signupError}</p>}

        <button type="submit" className="button">SIGNUP</button>
      </form>
    </div>
  );
}

export default Signup;
