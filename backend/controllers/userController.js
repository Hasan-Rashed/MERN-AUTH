import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user/set token / or login user
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    // get email and password from the body
    const { email, password } = req.body;

    // find user by email in the database
    const user = await User.findOne({ email });

    // check if user exists. we are checking passwords in the User model.
    if(user) {
        generateToken(res, user._id); // set cookie with response.cookie in the browser with the token and the name is 'jwt'. res and user._id goes to generateToken.js

        res.status(201).json({ // 201 means something was created
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(401); // 401 means unauthorized
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // find user by email in the database
    const userExists = await User.findOne({ email });
    
    // check if user exists
    if(userExists) {
        res.status(400); // bad request or client error
        throw new Error('User already exists');
    }

    // create user in the database 
    const user = await User.create({ 
        name, 
        email, 
        password 
    });

    // check if user was created
    if(user) {
        generateToken(res, user._id); // set cookie with response.cookie in the browser with the token and the name is 'jwt'. res and user._id goes to generateToken.js

        res.status(201).json({ // 201 means something was created
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400); // bad request or client error
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logout user' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User profile' });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'update user profile' });
});



export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};