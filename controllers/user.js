import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const SignUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('req.body', req.body);
        if (!email || !password) return next(new ErrorHandler("Please fill all fields", 400));
        let user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("User doesnot exists", 400));
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password", success: false });
        setCookie(res, user, `Welcome back ${user.name}`, true, 200);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return next(new ErrorHandler("Please fill all fields", 400));
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400));
        let passwordHash = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: passwordHash });
        if (!user)  return next(new ErrorHandler("User not created", 400));
        setCookie(res, user, "User created", true, 201);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

export const getMyProfile = async (req, res) => {
    res.status(200).json({ success: true, message: "User profile fetched", user : req.user });
};

export const logoutUser = (req, res) => { 
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ,
    }).json({ message: "Logged out", success: true, user : req.user });
};