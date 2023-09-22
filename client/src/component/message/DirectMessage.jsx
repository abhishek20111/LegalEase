import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


export default function DirectMessage({ messages, owner, conversationId }) {

    function timeAgo(timestamp) {
        const now = new Date();
        const date = new Date(timestamp);
        const timeDifference = now - date;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return days + " day" + (days > 1 ? "s" : "") + (hours % 24 > 0 ? ` ${hours % 24} hour${hours % 24 > 1 ? "s" : ""}` : "") + " ago";
        } else if (hours > 0) {
            return hours + " hour" + (hours > 1 ? "s" : "") + (minutes % 60 > 0 ? ` ${minutes % 60} minute${minutes % 60 > 1 ? "s" : ""}` : "") + " ago";
        } else if (minutes > 0) {
            return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
        } else {
            return seconds + " second" + (seconds > 1 ? "s" : "") + " ago";
        }
    }


    const [userMessageData, setUserMessageData] = useState(null);
    const [userData, setUserData] = useState(null);
    const id = useSelector((state) => state.userData.id);
    const [isLoading, setIsLoading] = useState(true);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    useEffect(() => {
        if (owner) {
            console.log(owner );
            // Fetch user data for the owner
            const getUserData = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/getProfile/${id}`, axiosConfig);
                    setUserData(res.data);
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                }
            };
            getUserData();
        } else {
            // Fetch user data for the other person in the conversation
            const getOtherUserData = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/getProfile/${conversationId}`, axiosConfig);
                    setUserMessageData(res.data.userData);
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                }
            };
            getOtherUserData();
        }
    }, [id, conversationId, owner]);

    // console.log(userMessageData);
    // console.log(userData);
    return (
        <div className='w-full pt-4'>
            {/* {console.log(messages)} */}
            <div className='p-4'>
                <div className={owner ? "flex justify-end" : "flex justify-start"}>
                    <div className='flex flex-col'>
                        <div className='flex gap-x-3  '>
                            <img
                                src={owner ? (userData ? userData.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOQrsCCWqA6shS-OhiErj_Yw5G4vJsbLKJZimtNjDng&s") : (userMessageData ? userMessageData.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOQrsCCWqA6shS-OhiErj_Yw5G4vJsbLKJZimtNjDng&s")}
                                alt=""
                                className='rounded-full h-12 object-cover w-12'
                            />
                            <span className={owner ? 'p-3 bg-gray-300 rounded-2xl text-gray-900 font-semibold'
                                : 'p-3 bg-blue-500 rounded-2xl text-gray-200 font-semibold'}>
                                {messages.text}
                            </span>
                        </div>
                        <div className={owner ? 'mt-2 text-sm text-gray-800 flex justify-end' : 'mt-2 text-sm text-gray-800'}>
                            {timeAgo(messages.createdAt)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
