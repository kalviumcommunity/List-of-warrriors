import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Form() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Warrior: "",
        BirthYear: "",
        DeathYear: "",
        State: "",
        FamousBattle: "",
        Image: "",
        created_by: sessionStorage.getItem('username')
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('https://list-of-warrriors.onrender.com/add', formData);
            console.log(res.data); 
            navigate('/');
        } catch (error) {

            console.log('error',error)
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData((prevInfo) => ({
            ...prevInfo,
            [name]: newValue,
        }));
    };

    return (
        <div className='container'>
            <div className='content'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Warrior :
                        <br />
                        <input
                            type='text'
                            name='Warrior'
                            value={formData.Warrior}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Birth Year :
                        <br />
                        <input
                            type='number'
                            name='BirthYear'
                            value={formData.BirthYear}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Death Year :
                        <br />
                        <input
                            type='number'
                            name='DeathYear'
                            value={formData.DeathYear}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        State :
                        <br />
                        <input
                            type='text'
                            name='State'
                            value={formData.State}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Famous Battle :
                        <br />
                        <input
                            type='text'
                            name='FamousBattle'
                            value={formData.FamousBattle}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Image :
                        <br />
                        <input
                            type='text'
                            name='Image'
                            value={formData.Image}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button type='submit' className='submit' onSubmit={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Form;
