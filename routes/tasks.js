import express from 'express';
import { isAutheticated } from '../middlewares/Auth.js';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/tasks.js';

const router = express.Router();

router.get("/all",isAutheticated, getAllTasks)
router.post("/create-task",isAutheticated, createTask);
router.route("/:taskId").patch( isAutheticated,updateTask).delete(isAutheticated,deleteTask);


export default router;