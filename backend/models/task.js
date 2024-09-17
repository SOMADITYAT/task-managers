const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task:String
})

const TaskModel = mongoose.model("Tasks", TaskSchema)
module.exports = TaskModel;