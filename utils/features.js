import jwt from "jsonwebtoken";


export const setCookie = (res, user, message, success, statusCode =200) => {
    
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);  
    let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ,
    }).json({ message: message, success : success })
};