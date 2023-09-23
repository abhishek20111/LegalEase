const express = require('express')
const router = express.Router()
/////////new added

const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = mongoose.model('User_SIH')

const A_User = mongoose.model('A_User_SIH')
const Forum = mongoose.model('forums')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const authentication = require('../middleware/middleware')


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post("/register", async (req, res) => {
  console.log("register");
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.send({ error: "Fill Complete details" })
  }
  console.log(name + " " + email + " " + password);

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    const response = await User.create({
      name,
      email,
      password: encryptedPassword
    });
    return res.json({ success: "User Registered Successfully" });
    // res.send({ status: "Data Save Succesfully" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/loginUser", async (req, res) => {
  console.log("login");
  const { email, password } = req.body;

  console.log(email + " " + password);

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    console.log(user);
    const token = jwt.sign({ email: user.email, role: user.role, name: user.name, id: user._id }, process.env.JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", message: "Login Successfully", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Authentication" });
})



router.post('/updateProfile', authentication, async (req, res) => {
  console.log("updateProfile");
  // console.log(req.body);
  try {
    // Find the user in the User model and update their role to "Admin"
    console.log("User ID:", req.user._id);

    const updateUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { role: "Admin" } },
      { new: true }
    );
    console.log("updateUser:", updateUser);

    // Remove any email field from the req.body to avoid the unique index issue
    // delete req.body.email;

    // console.log("\n\n\n\n "+A_User.getIndexes()+"\n\n\n");
    const existingUser = await A_User.findOne({ ID: req.user._id });
    console.log("existingUser ", existingUser);
    if (existingUser != null) {
      return res.status(200).send({ message: "User can't be modified now" });
    }
    // console.log("hello 1 "+JSON.stringify(req.body));

    // Create a new user in the A_User model
    const newUser = new A_User(req.body);
    await newUser.save();

    console.log("newUser " + newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/saveCommentForum', authentication, async (req, res) => {
  
  try {
    // Create a new ForumUserSIH document based on the schema
    const newData = new Forum({
      ID: req.user._id,
      comment: req.body.comment
    });

    const savedData = await newData.save();
   
    res.status(201).json({ message: "Post Uploaded successfully!", savedData }); // Respond with the saved data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving data.' });
  }
});

router.get('/getForum', authentication, async (req, res) => {
  console.log("getForum");
  try {
    // Use await to wait for the query to resolve
    const newData = await Forum.find()
      .populate({
        path: 'ID',
        select: 'name email _id photo', // Specify the fields you want to include
        model: 'User_SIH',
      })
      .exec();
      
    console.log(newData);
    res.status(201).json({ newData }); // Respond with the saved data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving data.' });
  }
});



router.post('/updatePro', authentication, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID:", userId);
    const update = await User.findByIdAndUpdate(
      userId,
      { role: "Admin" },
      { new: true }
    );
    const existingUser = await A_User.findOne({ ID: req.user._id });

    if (existingUser) {
      // User with the provided ID already exists, return "data can't be modified"
      return res.status(400).json({ message: "Data can't be modified" });
    }

    // Create a new user document using the data from the frontend
    const newUser = new A_User({
      ID: req.body.ID,
      uid: req.body.uid,
      phone_no: req.body.phone_no,
      title: req.body.title,
      position: req.body.position,
      description: req.body.description,
      avilable: req.body.avilable,
      tag: req.body.tag,
      address: req.body.address,
      T_rating: req.body.T_rating,
      points: req.body.point_complete ? [{ point_complete: req.body.point_complete }] : [],
    });

    // Save the new user to the database
    await newUser.save();

    console.log('newUser ', JSON.parse(JSON.stringify(newUser)));

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.post('/updateProfilePic', authentication, async (req, res) => {
  console.log("updateProfilePic");
  try {
    const { url } = req.body;
    console.log(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id }, // Use email to identify the user
      { $set: { photo: url } },
      { new: true }
    ).then((respose) => {
      res.status(200).json({ respose, message: "Profile Pic Updated Successfully.." });
    }).catch((err) => {
      return res.status(404).json({ error: 'User not found' });
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/getProfile/:id', authentication, async (req, res) => {

  console.log("getProfile");

  const id = req.params.id;
  // console.log("id "+id);
  try {
    let responseData = {};
    if (req.user.role === "Admin") {

      const updatedUser = await A_User.findOne({ ID: id });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      responseData.updatedUser = updatedUser;
    }
    const userData = await User.findOne({ _id: id })
    responseData.userData = userData;
    // console.log("new data "+JSON.stringify(responseData));
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error.message); // Log the error message for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/comment', authentication, async (req, res) => {
  try {
    // Get the comment from the request body
    const { comment } = req.body;

    // Create a new comment and save it to the database
    const newComment = new Forum({
      comment,
      likes: [], // Initialize likes as an empty array
      ID: req.user._id, // Assuming you have a user ID in req.user after authentication
    });

    const savedComment = await newComment.save();

    res.json(savedComment);
  } catch (error) {
    console.error('Error saving comment to the database:', error);
    res.status(500).json({ error: 'Data is not saved to the database' });
  }
});



router.post('/likeComment/:commentId', authentication, async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment by ID
    const comment = await Forum.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user has already liked the comment
    const userLiked = comment.likes.includes(req.user._id);

    if (userLiked) {
      return res.status(400).json({ error: 'You have already liked this comment' });
    }

    // Add the user's ID to the comment's likes array
    comment.likes.push(req.user._id);

    // Save the updated comment
    const updatedComment = await comment.save();

    return res.json(updatedComment);
  } catch (error) {
    console.error('Error liking comment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/unlikeComment/:commentId', authentication, async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment by ID
    const comment = await Forum.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user has already liked the comment
    const userLiked = comment.likes.includes(req.user._id);

    if (!userLiked) {
      return res.status(400).json({ error: 'You have not liked this comment' });
    }

    // Remove the user's ID from the comment's likes array
    comment.likes = comment.likes.filter((userId) => userId !== req.user._id);

    // Save the updated comment
    const updatedComment = await comment.save();

    return res.json(updatedComment);
  } catch (error) {
    console.error('Error unliking comment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to post a reply to a comment
router.post('/comment/reply/:commentId', authentication, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { replyText } = req.body;

    // Find the comment by ID
    const comment = await Forum.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Create a new reply and add it to the comment's reply array
    const newReply = {
      text: replyText,
      user: req.user._id,
    };

    comment.comment.reply.push(newReply); // Assuming your schema structure is nested

    // Save the updated comment
    const updatedComment = await comment.save();

    return res.json(updatedComment);
  } catch (error) {
    console.error('Error saving reply to the comment:', error);
    return res.status(500).json({ error: 'Data is not saved to the database' });
  }
});


router.post('/review', authentication, async (req, res) => {
  const { ID, rating, description } = req.body;

  if (!ID || !rating || !description) {
    return res.status(422).json({ error: "Please fill in all the required details." });
  }

  console.log(ID + " " + rating + " " + description);

  try {
    // Find the user by their _id and update the review array
    const updatedUser = await A_User.findOneAndUpdate(
      { ID },
      {
        $push: {
          review: {
            Id: req.user._id,
            name: req.user.name,
            rating,
            description,
          },
        },
      },
      { new: true }
    );
    updatedUser.save()
    if (updatedUser) {
      res.status(201).json({ message: 'Review added successfully', user: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/advanceProfile', async (req, res) => {
  console.log("advanceProfile");
  try {
    const A_Data = await A_User.find().populate('ID', '-password');
    console.log("A_Data:", A_Data);
    res.status(200).json({ A_Data })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/user/:id", async (req, res) => {
  try {
    const users = await A_User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;

