const express = require('express')
const router = express.Router()

const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Conversation = mongoose.model('Conversation')
const Message = mongoose.model('Message')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const authentication = require('../middleware/middleware')

router.post("/", authentication, async (req, res) => {
    console.log("conversation/");
    
    const newConversation = new Conversation({
        members: [req.user._id.toString(), req.body.receiverId],
    });
 
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:userId", authentication, async (req, res) => {
    console.log("conversation/id " +req.params.userId);
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        console.log(conversation);
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/find/:firstUserId/:secondUserId", authentication, async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/message/", async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get

router.get("/message/:conversationId", async (req, res) => {
    console.log("message get id "+req.params.conversationId);
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;