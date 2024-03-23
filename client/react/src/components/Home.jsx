import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URI = `https://list-of-warrriors.onrender.com/get`;

function Home() {
  const [warriorData, setWarriorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWarriorData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check login status
    const loginStatus = sessionStorage.getItem('login');
    setIsLoggedIn(!!loginStatus);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://list-of-warrriors.onrender.com/delete/${id}`);

      setWarriorData(prevState => prevState.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Error deleting data. Please try again.");
    }
  };

  return (
    <div className="home-content">

      
      <div className="nav">

      <div className='form'>
        {isLoggedIn ? (
          <>
            

            <button className='login' onClick={() => {
              sessionStorage.removeItem('login');
              setIsLoggedIn(false);
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login">
              <button className='login'>Login</button>
            </Link>
            <Link to="/Sign-up">
              <button className='signup'>Signup</button>
            </Link>
          </>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

        <h1>LIST OF WARRIORS</h1>
        <input
          className="search-bar"
          type="text"
          placeholder="  Enter the warrior name"
        />

        <Link to="/form">
              <button className="form-btn">Add Entity</button>
        </Link>

        

      </div>
      

      <div className="container">
        {warriorData.map((warrior) => (
          <div key={warrior._id} className="card">
            <div className="image">
              <img src={warrior.Image} alt="" />
            </div>
            <div className="info">
              <h2>
                <strong className="f">{warrior.Warrior}</strong>
              </h2>
              <ul>
                <li>Birth year: {warrior.BirthYear}</li>
                <li>Death year: {warrior.DeathYear}</li>
                <li>State: {warrior.State}</li>
                <li>Famous battle: {warrior.FamousBattle}</li>
              </ul>
              <div className="btns">
                <Link to={`/update/${warrior._id}`}>
                  <button className="update">Update</button>
                </Link>
                <button className="delete" onClick={() => deleteItem(warrior._id)}>
                  Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
