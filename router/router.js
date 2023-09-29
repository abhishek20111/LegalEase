const express = require('express')
const router = express.Router()

const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = mongoose.model('User_SIH')
const A_User = mongoose.model('A_User_SIH')
const Forum = mongoose.model('Forum_User_SIH')
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
        // console.log("updateUser:", updateUser);

        // Remove any email field from the req.body to avoid the unique index issue
        // delete req.body.email;

        // console.log("\n\n\n\n "+A_User.getIndexes()+"\n\n\n");
        const existingUser = await A_User.findOne({ ID: req.user._id });
        // console.log("existingUser ", existingUser);
        if (existingUser != null) {
            return res.status(200).send({ message: "User can't be modified now" });
        }
        // console.log("hello 1 "+JSON.stringify(req.body));

        // Create a new user in the A_User model
        const newUser = new A_User(req.body);
        await newUser.save();

        // console.log("newUser " + newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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

    const id = req.params.id;
    // console.log("getProfile id " + id);
    try {
        let responseData = {};

        const userData = await User.findOne({ _id: id })
        responseData.userData = userData;

 
        // console.log(!(responseData.userData.role === "User" || responseData.userData.role === "Mediater"));
        if (!(responseData.userData.role === "User" || responseData.userData.role === "Mediater" || responseData.userData.role === "Super Admin")) {
            const updatedUser = await A_User.findOne({ ID: id })
               .populate('review.Id', '-password')
                .exec();

            if (!updatedUser) {
                return res.status(404).json({ error: 'User Profile not found ' });
            }   
            responseData.updatedUser = updatedUser; 
        }
        
        // console.log("new data " + JSON.stringify(responseData));
        // console.log(responseData);
        res.status(200).json(responseData);
    } catch (error) {
        console.log("error" + error.message); // Log the error message for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/addDocument', authentication, async (req, res) => {
    const userId = req.user._id; // Get the user ID from the URL parameter
    const blockchainData = req.body; // Get blockchain data from the request body

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add blockchain data to the user's 'blockchain' array
        user.blockchain = blockchainData;

        // Save the updated user object
        const updatedUser = await user.save();

        res.json(updatedUser); // Respond with the updated user object
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/advanceProfile', async (req, res) => {
    console.log("advanceProfile");
    try {
        const A_Data = await A_User.find().populate('ID', '-password');
        // console.log("A_Data:", A_Data);
        res.status(200).json({ A_Data })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getAllUserProfile', authentication, async (req, res) => {
    console.log("getAllUserProfile");
    try {
        if (req.user.role != "Super Admin") {
            return res.status(404).json({ message: "You Are not Head" });
        }

        let responseData = {};

        // Fetch A_User_Data and populate the 'ID' field
        const A_User_Data = await A_User.find().populate({
            path: 'ID',
            select: '-password', // Exclude the password field
        });

        responseData.A_User_Data = A_User_Data;

        // Fetch N_User without populating
        const N_User = await User.find();
        responseData.N_User = N_User;

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/comment', authentication, async (req, res) => {
    console.log('comment');
    try {
        const { comment } = req.body;
        let check = await Forum.findOne({ ID: req.user._id });

        if (check !== null) {
            check.comment.push(comment);
        } else {
            // Create a new 'Forum' instance if no entry with the ID is found
            check = new Forum({ ID: req.user._id, comment: [comment] });
        }

        // Save the 'check' instance (either existing or newly created)
        await check.save();

        res.status(200).json({ message: 'Data saved to Database' });
    } catch (error) {
        console.error('Data is not saved', error);
        res.status(500).json({ error: 'Data is not saved to the database' });
    }
});


router.get('/getComment', authentication, async (req, res) => {
    console.log("getComment");
    try {
        const comment = await Forum
            .find()
            .populate('ID', 'name email')
            .populate('comment likes')
            .exec();
        console.log(comment);
        return res.status(200).json({ comment })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'data is not savong to database' });
    }
})


router.post('/changeRole/:userId', async (req, res) => {
    const userId = req.params.userId;
    const newRole = req.body.newRole; // Assuming you send the new role in the request body

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Set the new role
        user.role = newRole;
        await user.save();

        return res.status(200).json({ message: 'User role changed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/verifyUser/:id', async (req, res) => {
    console.log("VerifyUser " + req.params.id);
    const userId = req.params.id;

    try {
        const user = await A_User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the 'points' array exists, and if not, initialize it
        if (!user.points) {
            user.points = [{ point_curr: 0, profile_v: 0, externalPoint: 0 }];
        }

        // Set the verifyUser field to true
        user.verifyUser = true;

        if (user.points.length === 0) {
            // If it doesn't exist, create it with a default value of 0
            user.points.push({
                point_curr: 0,
                profile_v: 0,
                externalPoint: 0
            });
        }

        // Add 250 points to the profile_v field
        user.points[0].profile_v += 228;

        await user.save();

        return res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



router.put('/toggleAvailability', authentication, async (req, res) => {
    console.log("toggleAvailability");
    try {

        const userId = req.user._id; // Assuming you have a user ID in req.user.id
        const user = await A_User.findOne({ ID: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle the 'available' field
        user.avilable = !user.avilable;
        await user.save();

        return res
            .status(200)
            .json({ message: 'Availability toggled successfully', available: user.available });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
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


module.exports = router;