const io = require("socket.io")(8082, {
    cors: {
        origin: "http://localhost:5173",
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
    console.log("a user connected.");
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        console.log("userId-- "+userId, socket.id);
        addUser(userId, socket.id);
        console.log(users);
        io.emit("getUsers", users); 
    });
    
 
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        // const user = getUser(receiverId);
        // console.log("user "+ senderId, receiverId, text);
        // io.to(user.socketId).emit("getMessage", {
        //     senderId,
        //     text,
        // });
        sendMessageToUser({ senderId, receiverId, text });
    });
    

    //when disconnect 
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});