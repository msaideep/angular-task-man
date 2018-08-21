var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Task Name cannot be empty!'] },
    description: { type: String, required: [true, 'Task Description cannot be empty!'] },
    type: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Task Type cannot be empty!'] },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'LOW' },
    assignedUserId:{type: mongoose.Schema.Types.ObjectId },
    createdUserId: {type: mongoose.Schema.Types.ObjectId, required: [true, 'Created User Id cannot be empty!'] },
    updatedUserId: {type: mongoose.Schema.Types.ObjectId }
});

module.exports = Task = mongoose.model('Task', taskSchema);