import jwt from 'jsonwebtoken';


const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, { // set cookie with response.cookie in the browser with the token and the name is 'jwt'. res comes from the response of userController.js
        httpOnly: true, // cookie cannot be accessed by client side script
        secure: process.env.NODE_ENV !== 'development', // true if in production mode or false if in development mode
        sameSite: 'strict', // cookie cannot be accessed by cross-site requests
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days same as jwt token expires. maxAge converted to expires in milliseconds
    })
}


export default generateToken;