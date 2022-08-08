import TaskSchema from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const task = new TaskSchema({
            task: req.body.task
        })

        const savedTask = await task.save();
        res.json(savedTask);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to create task',
        })
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskSchema.find();
        res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to read tasks',
        })
    }
}

export const updateTask = async (req, res) => {
    try {

        const taskId = req.params.id;
        const updatedTask = await TaskSchema.findByIdAndUpdate(taskId, req.body, { new: true });
        res.json(updatedTask);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to update task',
        })
    }
}

export const removeTask = async (req, res) => {
    try {

        const taskId = req.params.id;
        await TaskSchema.findByIdAndDelete(taskId);
        res.json('Task deleted');

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to update task',
        })
    }
}