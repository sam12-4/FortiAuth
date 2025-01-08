import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return next(new ErrorHandler("Title and description are required", 400));
        const task = await Task.create({
            title,
            description,
            User: req.user._id,
        });
        if (!task) return next(new ErrorHandler("Task not created", 400));
        res.status(201).json({ message: "Task created successfully", success: true });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

export const getAllTasks = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.user._id)) return next(new ErrorHandler("Invalid user ID", 400));
        const task = await Task.find({ User: req.user._id });
        if (!task) return next(new ErrorHandler("No task found", 404));
        return res.status(200).json({ success: true, task });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};


import mongoose from 'mongoose';

export const updateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(taskId)) return next(new ErrorHandler("Invalid task ID", 400));
        const task = await Task.findOne({ _id: taskId, User: req.user._id });
        if (!task) return next(new ErrorHandler("Task not found", 404));
        task.isCompleted = !task.isCompleted;
        await task.save();
        return res.status(200).json({ success: true, message: "Task updated successfully", task });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(taskId)) return next(new ErrorHandler("Invalid task ID", 400));
        const task = await Task.findOne({ _id: taskId, User: req.user._id });
        if (!task) return next(new ErrorHandler("Task not found", 404));
        return res.status(200).json({ success: true, message: "Task updated successfully", task });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};