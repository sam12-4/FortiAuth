import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAutheticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Please Login First", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET )
    if (!decoded) {
        return res.status(401).json({ message: "please login first", success: false });
    }
    req.user = await User.findById(decoded._id);
    next();
};