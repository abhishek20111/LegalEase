import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forum() {
    const Id = useSelector((state) => state.userData.id);
    const notify1 = (info) => toast.success(info);


    const [userData, setUserData] = useState({ comment: "" });
    const [commentData, setCommentData] = useState([]);
    const { comment } = userData;
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };


    const onValueChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("comment"+userData.comment);
            const res = await axios.post('http://localhost:8080/comment', userData, axiosConfig);
            console.log(res.data.message);
            notify1(res.data.message)
            refresh()
        } catch (error) {
            console.error('Data is not savwd', error);
        }
    };

    const getAllComment = async () => {
        try {
            const res = await axios.get('http://localhost:8080/getComment', axiosConfig);
            // console.log(res.data.comment);
            setCommentData(res.data.comment)
            // console.log(commentData);
        } catch (error) {
            console.error('Data is not savwd', error);
        }
    }

    const refresh = () => {
        getAllComment()
    }
    useEffect(() => {
        refresh();
    }, [])

    return (
        <div className='flex flex-col w-[25%] border-black gap-y-5 justify-center'>
            <h1>Forum</h1>
            <div className='w-100vw'>
                <div className='w-[70%] text-xl'>
                    {commentData && commentData.map((data) => (
                        <div key={data._id}>
                            {/* {console.log(data)} */}
                            <h3 className='text-amber-700'>{data.ID.name}</h3>

                            {data.comment && data.comment.map((newcomment, index) => (
                                <div key={index}>{newcomment}</div>
                            ))}

                        </div>
                    ))}
                </div>

            </div>
            <input
                className='border-black'
                type='text'
                name='comment' placeholder='comment'
                value={comment}
                onChange={(e) => onValueChange(e)}
            />
            {/* <input
        type='text'
        name='reply' placeholder='reply'
        value={reply}
        onChange={(e) => onValueChange(e)}
      /> */}


            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    );
}