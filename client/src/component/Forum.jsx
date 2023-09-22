import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Forum() {
  const userId = useSelector((state) => state.userData.id);
  const [comment, setComment] = useState('');
  const [data, setData] = useState([]); // Assuming you have data state for comments
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const notify1 = (info) => toast.success(info);
  const notify2 = (info) => toast.error(info);

  // Function to like a comment
  const likeComment = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/likeComment/${commentId}`,
        {},
        axiosConfig
      );
      const updatedData = data.map((comment) => {
        if (comment._id === response.data._id) {
          return response.data;
        } else {
          return comment;
        }
      });
      setData(updatedData);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  // Function to unlike a comment
  const unlikeComment = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/unlikeComment/${commentId}`,
        {},
        axiosConfig
      );
      const updatedData = data.map((comment) => {
        if (comment._id === response.data._id) {
          return response.data;
        } else {
          return comment;
        }
      });
      setData(updatedData);
    } catch (error) {
      console.error('Error unliking comment:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/comment',
        { comment },
        axiosConfig
      );
      console.log(response.data.message);
      notify1('Comment submitted successfully');
      setComment('');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  // Assuming you fetch and set 'data' somewhere in your component

  return (
    <div className="flex flex-col w-[25%] border-black gap-y-5 justify-center">
      <h1>Forum</h1>
      <input
        className="border-black"
        type="text"
        name="comment"
        placeholder="Comment"
        value={comment}
        onChange={onCommentChange}
      />

      {/* Render comments and like/unlike buttons */}
      {data.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <div className="ml-1 cursor-pointer">
            {comment.likes.includes(userId) ? (
              <span
                className="material-symbols-outlined text-red-400 bg-red-600"
                onClick={() => unlikeComment(comment._id)}
              >
                favorite
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => likeComment(comment._id)}
              >
                favorite
              </span>
            )}
            <p>{comment.likes.length} Likes</p>
          </div>
          <button onClick={() => showReplyForm(comment._id)}>Reply</button>
        </div>
      ))}
      {comment.showReplyForm && (
      <div className="ml-2">
        <input
          type="text"
          placeholder="Your reply"
          value={comment.replyText}
          onChange={(e) => onReplyTextChange(e, comment._id)}
        />
        <button onClick={() => submitReply(comment._id)}>Submit Reply</button>
      </div>
    )}


      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  );
}
