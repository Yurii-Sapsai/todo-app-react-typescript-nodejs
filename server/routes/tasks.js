import express from 'express';

import {
    createTask,
    getAllTasks,
    updateTask,
    removeTask
} from '../controllers/tasks.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.patch('/:id', updateTask); 
router.delete('/:id', removeTask); 

export default router;