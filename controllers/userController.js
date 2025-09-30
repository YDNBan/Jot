const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res)=>{
    try {
        const { username, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        let errors = [];

        if(existingEmail){errors.push("Email is already in use")};
        if(existingUsername){errors.push("Username is already taken")};

        if(errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const newUser = new User({ username, email, password});
        await newUser.save();
        return res.json({ message: "Account created succesfully!"});
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Server error"});
    }
}

exports.login = async (req, res)=> {
    try {
        const username = req.body.username;
        const user = await User.findOne({username: username});
        if (!user){ // Verify if user exist
            return res.status(400).json({ message: "User not found, please verify your information."})
        }
        if(!(await user.comparePassword(req.body.password))) // If password matches
        {
            return res.status(400).json({ message: "Incorrect password"});
        }

        // Token creation
        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            {expiresIn: '1h' }
        );

        // Atp we have verified the user exist, has the right password, and we created them a token so they can navigate the app
        // Send back a response that verifies their success and hands them their token
        return res.json({
            message: `Welcome Back, ${user.username}!`,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                message: "THIS USER OBJECT IS FOR TESTING ONLY"
            }
        });

    } catch(err) {
        return res.status(500).json({ message: "server error"});
    }
}