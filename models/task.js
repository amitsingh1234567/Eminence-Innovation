const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;