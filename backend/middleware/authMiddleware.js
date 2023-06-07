import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


const protect = asyncHandler (async (req, res, next) => {
    
    let token;

    token = req.cookies.jwt; // get token from the cookie

    // check if token exists
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode the token, decoded is an object. token is from the cookie
            
            req.user = await User.findById(decoded.userId).select('-password'); // req.user is the current user with userId. userId is there because, we generate token in function with userId as 'payload'. we are excluding the password from the user object by select option.

            next(); // go to the next middleware

        } catch (error) {
            res.status(401); // 401 means unauthorized
            throw new Error('Unauthorized access, invalid token');
        }
    }else{
        res.status(401); // 401 means unauthorized
        throw new Error('Unauthorized access, no token');
    }
});


export { protect };