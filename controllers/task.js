const Task = require('../models/task');


const createTask = async (req, res, next) => {
    try{
        const createdTask = await  Task.create(req.body);
        res.status(200).json({msg: 'Task created successfuly', data: createdTask._id});
    }catch(err){
        console.log(err)
        res.status(400).json({msg: 'Something went wrong.'});
    }
};

const taskList = async (req, res, next) => {
    try{
        var roles = [];
        if(req.user.role == 'Manager'){
            roles = ['Manager', 'Team Lead', 'Employee'];
        }

        if(req.user.role == 'Team Lead'){
            roles = ['Team Lead', 'Employee'];
        }

        if(req.user.role == 'Employee'){
            roles = ['Employee'];
        }

        const taskData = await Task.aggregate([
            {
                $lookup: {
                    from: 'users', 
                    localField: 'assignTo',
                    foreignField: '_id',
                    as: 'assignTo'
                }
            },
            { $unwind: '$assignTo' },
            { $match: { 'assignTo.role': { $in: roles } } }
        ]);

        res.status(200).json({msg: 'Success', data: taskData});
    }catch(err){
        console.log(err)
        res.status(400).json({msg: 'Something went wrong.'});
    }
};

const updateTask = async (req, res, next) => {
    try{
        const  newObj = {
            title: req.body.title,
            description: req.body.description,
            assignTo: req.body.assignTo,
            status: req.body.status
        }
        const updatedTask = await Task.findByIdAndUpdate(req.body._id, newObj, {new: true});
        res.status(200).json({msg: 'Task update successfully', data: updatedTask});
    }catch(err){
        console.log(err)
        res.status(400).json({msg: 'Something went wrong.'});
    }
};

const deleteTask = async (req, res, next) => {
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: 'Task delete successfully'});
    }catch(err){
        console.log(err)
        res.status(400).json({msg: 'Something went wrong.'});
    }
}

module.exports = {
    createTask,
    taskList,
    updateTask,
    deleteTask
};