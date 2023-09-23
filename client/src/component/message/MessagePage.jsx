import React, { useEffect, useRef, useState } from 'react'
import DirectMessage from './DirectMessage'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Conversation from './Conversation';
import io from 'socket.io-client'

export default function MessagePage() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  const USER_TYPE = {
    PUBLIC: "Public User",
    USER: "User",
    MEDIATER: "Mediater",
    ADMIN: "Admin",
    SUPER_ADMIN: "Super Admin",
  };

  const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
  const name = useSelector((state) => state.userData.name)
  const email = useSelector((state) => state.userData.email)
  const id = useSelector((state) => state.userData.id)
  const notify1 = (info) => toast.success(info);
  const notify2 = (info) => toast.error(info);
  const navigate = useNavigate()
  const scrollRef = useRef();
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [friends, setFriends] = useState([]);



  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };



  useEffect(() => {
    socket.current = io("ws://localhost:8082");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
      
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", id);
    socket.current.on("getUsers", (users) => {
      console.log("users1 "+JSON.stringify(users));
      setOnlineUsers(
        conversations.filter((f) => f.members((m)=> m!=id) )
      );
      // console.log(onlineFriends);
    });
  }, [id]);


  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);



  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8080/conversation/" + id, axiosConfig);
        setConversations(res.data);
        console.log(JSON.stringify(conversations));
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      console.log(currentChat);
      try {
        const res = await axios.get(`http://localhost:8080/conversation/message/${currentChat._id}`, axiosConfig);
        setMessages(res.data);
        console.log("messages");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== id
    );
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newMessage,
    });
    console.log(id, receiverId, newMessage);
    try {
      const res = await axios.post("http://localhost:8080/conversation/message", message, axiosConfig);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


useEffect(() => {
  // Extract unique friend IDs from conversations
  const friendIds = conversations.map((conversation) =>
      conversation.members.find((memberId) => memberId !== id)
    )
    .filter((friendId, index, self) => {
      // Filter out duplicate IDs and your own ID
      return (
        friendId !== id && index === self.indexOf(friendId)
      );
    });

    // friendIds.filter((f)=>onlineFriends)
    console.log("onlineFriends "+onlineFriends);
    // friendIds = onlineFriends

  // Fetch profile data for each friend
  const fetchFriendProfiles = async () => {
    const friendProfiles = [];

    for (const friendId of onlineFriends) {
      try {
        const res = await axios.get(
          `http://localhost:8080/getProfile/${friendId}`,
          axiosConfig
        );
        friendProfiles.push(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    console.log(friendProfiles);
    setFriends(friendProfiles);
    console.log(friends);
  };

  if (friendIds.length > 0) {
    fetchFriendProfiles();
  }
}, [conversations, id, setFriends]);


  useEffect(() => {
    // console.log(friends);
    // console.log(onlineUsers);
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f.userData._id)));
  }, [friends, onlineUsers]);


console.log("data "+ JSON.stringify(friends));
// console.log(friends);
  return (
    <div className='w-[100vw] h-[100vh] flex gap-x-12'>

      {/* seaction one  */}
      <div className='w-[25%] ml-3'>
        <input type="text" className='bg-opacity-5 p-2 pl-3  w-full border-b-2 border-gray-300' placeholder='Search for Friend..' />

        <div className='flex flex-col gap-y-12 my-8'>
          {
            conversations.map((c, ind) => (
              <div key={ind} className='flex gap-x-6 '>
                {console.log(conversations)}
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} />
                </div>
              </div>
            ))
          }
        </div>
      </div>


      {/* second two - chat */}
      <div className='min-w-[42%] max-w-[45%] ml-3 '>
        {
          currentChat ?
            <div className='h-[97vh]'>
              <div className='h-[80vh] overflow-hidden hover:overflow-auto'>

                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef} className=''>

                    <DirectMessage messages={m} owner={m.sender === id}
                      conversationId={conversations.find((conversation) => conversation.members.find((memberId) => memberId !== id))?.members.find((memberId) => memberId !== id)} />
                  </div>
                ))}
              </div>


              <div className='absolute bottom-0 flex pt-3 min-w-[42%] max-w-[45%] justify-between '>
                <textarea name=""
                  className='border-gray-300 border-2 rounded w-[90%] p-3'
                  placeholder='Write Something..'
                  id="" cols="30" rows="2"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                >
                </textarea>
                <button
                  onClick={handleSubmit}
                  className='m-auto ml-5 h-12 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                >Send</button>
              </div>
            </div>
            :
            <span className='p-3 text-5xl font-semibold my-[30%] text-center text-gray-300 flex'>
              Open Converstation to start chat.
            </span>}

      </div>

      {/* third section online */}
      {/* <div className='w-[25%]  ml-3 pt-7'>
        <div className='gap-y-3 flex flex-col h-[90vh] overflow-hidden hover:overflow-auto'>


          {
            onlineFriends.map((o, ind) => (
              <>
                <div key={ind} className='flex gap-x-6 justify-start'>
                  <span className="relative flex ">
                    <img
                      src={onlineFriends.userName &&  "data:image/jpeg;base64,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"} alt=""
                      className='rounded-full h-12 object-cover'
                    />
                    <span class="animate-ping h-3 w-3 absolute inline-flex  rounded-full bg-green-400 opacity-75"></span>
                    <span class="absolute inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <h2 className='text-xl font-bold items-center flex'>dfdsf</h2>
                </div>
              </>
            ))
          }
          

        </div>
      </div> */}

    </div>
  )
}
