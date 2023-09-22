import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; 

export default function Conversation({ conversation }) {

  const [userConveData, setUserConveData] = useState(null);
  const id = useSelector((state) => state.userData.id);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    if (!conversation || !conversation.members || conversation.members.length === 0) {
      return;
    }

    const friendId = conversation.members.find((m) => m !== id);

    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/getProfile/${friendId}`, axiosConfig);
        setUserConveData(res.data.userData); // Update userConveData with fetched data
        // console.log(res.data.userData); // Log the fetched user data
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [id, conversation]);


  
    return (
        <div>
            <div className='flex gap-x-6 '>
                <img
                    src={userConveData && userConveData.photo ? 
                        userConveData.photo
                        :
                         "data:image/png;base64,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"} alt=""
                    className='rounded-full h-12  object-fill w-12'
                />
                <h2 className='text-xl cursor-pointer  font-bold items-center flex'>{userConveData && userConveData.name || "Not Found"}</h2>
            </div>
        </div>
    )
}
