import asyncHandler from 'express-async-handler';

// @desc    Auth user/set token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User Authenticated' });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Register user' });
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