import axios from 'axios';
import { FaStar } from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Review() {
    const navigate = useNavigate();

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const initialData = {
        description: '',
        rating: '',
    };

    const [userData, setUserData] = useState(initialData);

    const handleInputs = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/review',userData,axiosConfig 
            );

            const data = response.data;
            console.log(data);

            if (data.status === 422 || !data) {
                console.log(data.error);
            } else {
                navigate('/profile');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };

    return (
        <div className='flex flex-col gap-y-4 text-black border-black w-[20%]'>

            <input
                type="text"
                name="description"
                id='description' // Corrected ID
                value={userData.description}
                onChange={handleInputs}
                placeholder='Description'
            />
            <input
                type="text"
                name="rating"
                id='rating'
                value={userData.rating}
                onChange={handleInputs}
                placeholder='rating'
            />

            <div>
                <div className='flex'>
                    {[...Array(5)].map((_, index) => {
                        const currentRating = index + 1;
                        return (
                            <label key={index}>

                                <FaStar
                                    size={40}
                                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                />
                                <input
                                    type="radio"
                                    name="rating"
                                    className='hidden'
                                    value={currentRating}
                                    onClick={() => {
                                        setUserData({ ...userData, rating: currentRating });
                                    }}
                                />
                            </label>
                        );
                    })}
                   
                </div>
            </div>
            <button className='justify-start pl-4' onClick={handleSubmit}>Save</button>
        </div>
    );
}