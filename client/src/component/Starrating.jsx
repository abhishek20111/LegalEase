import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

export default function Starrating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            
            <FaStar
              size={50}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
          </label>
        );
      })}
      <p className='mt-[70px] justify-start ml-[-240px]'>Your rating is {rating}</p>
    </div>
  );
}


