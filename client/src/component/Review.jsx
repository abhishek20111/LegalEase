import axios from 'axios';
import { FaStar } from "react-icons/fa";
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function Review(props) {
  const notify1 = (info) => toast.success(info);
  const navigate = useNavigate();
  const { idU } = useParams();
  console.log(idU)
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const initialData = {
    ID:`${idU}`,
    description: '',
    rating: '',
  };

  const [userData, setUserData] = useState(initialData);

  const handleInputs = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const handleSubmit = async () => {
    console.log(userData);
    try {
      const response = await axios.post(
        'http://localhost:8080/review', userData, axiosConfig);
        notify1(response.data.message)
        navigate('/');
        
      // if (response.status === 422 || !response) {
      //   console.log(response.error);
      // } else {
      // }
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className='flex flex-col w-[100vw] h-[100vh] bg-slate-100 ' >
      <div className='flex flex-col w-[40%] m-auto mt-[10%] bg-white'>
       <div className='flex flex-col m-auto mb-[5%]'>
        <input className='invisible'
          type="text"
          name="rating"
          id='rating'
          value={userData.rating}
          onChange={handleInputs}
          placeholder='rating'
        />

        <div>
        <p className=' flex m-auto ml-[44%] mb-3 font-serif'>Review</p>
          <div className='flex justify-center'>
            
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
                       setUserData({ ...userData, rating: currentRating }),
                    setRating(currentRating);
                     }}
                  />
                </label>
              );
            })}
        
          </div>
        </div>
        {/* <p className='mt-[5%] ml-[10%]'>It is awesome 😀</p> */}
        <textarea className='mt-7 font-semibold text-black h-[100px] w-[500px] p-2 bg-slate-100'
          rows={10} cols={5}
          name="description"
          id='description' // Corrected ID
          value={userData.description}
          onChange={handleInputs}
          placeholder='Description . . . '
        />
        <div className=' flex justify-start pl-0'> 
        <button className=' mt-10 shadow-blue-800 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSubmit}>Save</button>
        {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */}
  {/* Button
</button> */}
        </div>
        </div>
      </div>
    </div>
  );
}