const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require('./models/task')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.0.1:27017/test')

app.post('/add' , (req ,res) => {
  const task = req.body.task;
  TaskModel.create({
    task:task
  }).then(result => res.json(result))
  .catch(err => console.log(err)
  )
})

app.listen(3001, () => {
   console.log("Server is Running");
   
})