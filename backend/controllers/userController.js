import asyncHandler from 'express-async-handler';

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    res.status(401)
    throw new Error('Something went wrong with authentication');
    res.status(200).json({ message: 'User Authenticated' });
});

export { authUser };