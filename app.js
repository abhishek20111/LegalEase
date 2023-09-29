const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./model/user.js')
require('./model/A_user.js')
require('./model/forum.js')
require('./model/Conversation.js')
require('./model/Message.js')
const router = require('./router/router.js');
const Conversation = require('./router/Conversation.js');
const dotenv = require('dotenv');
const path = require('path')

const app = express();//to create an instance of the Express application object.
dotenv.config() 
 
app.use(express.json())//`express.json()` is middleware provided by the Express framework for parsing incoming JSON data,  It is used to automatically parse incoming JSON payloads and make the resulting data available in the `request.body` object.
app.use(express.urlencoded({ extended: true }));///middleware provided by the Express framework for parsing incoming HTTP requests with URL-encoded payloads. This middleware is used to automatically parse incoming URL-encoded payloads and make the resulting data available in the `request.body` object


app.use(cors({ credentials: true }));
// app.use(cors({ origin: origin, credentials: true }));//provided by the `cors` package for enabling Cross-Origin Resource Sharing (CORS) in an Express app, CORS is a mechanism that allows a web page to make requests to a different domain 


const http = require('http');
const { Server } = require("socket.io");
// const server = http.createServer(app);

const port = process.env.PORT || 8080; 


mongoose.connect(`mongodb+srv://abhi:${process.env.DB_PASSWORD}@cluster0.isarath.mongodb.net/?retryWrites=true&w=majority`, { 
// mongoose.connect(`mongodb://localhost:27017`, {
    useNewUrlParser: true,//handle deprecation warnings from the MongoDB driver's default parser. It also provides better support for advanced connection string features like the `srv` protocol, which enables clients to discover MongoDB server instances via DNS records.
    useUnifiedTopology: true//new server discovery and monitoring engine .
})  
    .then(() => {  
        console.log("Successfully connect to MongoDB");
    })
    .catch(err => {
        console.error("Connection error", err.message);
    });


app.use('/', router);
app.use('/conversation', Conversation);

// Serving the frontent
app.use(express.static(path.join(__dirname, 'client', 'dist')))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))

})

const server =  app.listen(port, () => {
    console.log(`Server is running on port - ${port}`);
})

const io = new Server(server, {
    cors: {
        origin: "*", // Adjust the origin as needed
    },
});
 

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};


const sendMessageToUser = async ({ senderId, receiverId, text }) => {
    // console.log(text);
    const user = getUser(receiverId);

    if (user) {
        // User is online, send the message immediately
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    } else {
        // User is offline, wait for the user to come online
        await new Promise((resolve) => {
            io.once("connection", (socket) => {
                if (socket.id === receiverId) {
                    resolve(socket);
                }
            });
        });

        // User is now online, send the message
        const onlineUser = getUser(receiverId);
        if (onlineUser) {
            io.to(onlineUser.socketId).emit("getMessage", {
                senderId,
                text,
            });
        }
    }
};

io.on("connection", (socket) => {
    //when ceonnect
    // console.log( "a user connected.");
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        console.log("userId-- "+userId, socket.id);
        addUser(userId, socket.id);
        console.log(users);
        io.emit("getUsers", users); 
    });
    
 
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        sendMessageToUser({ senderId, receiverId, text });
    });
    

    //when disconnect 
    socket.on("disconnect", () => {
        // console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
