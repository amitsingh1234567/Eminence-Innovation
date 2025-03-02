const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const {verifyToken} = require('../middleware/index');


router.post('/create_task', verifyToken, taskController.createTask);

router.get('/task_list', verifyToken, taskController.taskList);

router.patch('/update_task', verifyToken, taskController.updateTask);

router.delete('/delete_task/:id', verifyToken, taskController.deleteTask);

module.exports = router;