const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const EventModel = require('./Models/Event');

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017')

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// Get all events
app.get('/events', (req, res) => {
    EventModel.find()
    .then(events => res.json(events))
    .catch(err => res.status(500).json(err));
});

// Add a new event
app.post('/events', (req, res) => {
    const { title, start, end } = req.body;
    EventModel.create({ title, start, end })
    .then(event => res.json(event))
    .catch(err => res.status(500).json(err));
});

// Update an event
app.put('/events/:id', (req, res) => {
    const { id } = req.params;
    const { title, start, end } = req.body;
    EventModel.findByIdAndUpdate(id, { title, start, end }, { new: true })
    .then(event => res.json(event))
    .catch(err => res.status(500).json(err));
});

// Delete an event
app.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    EventModel.findByIdAndDelete(id)
    .then(result => res.json({ message: 'Event deleted successfully' }))
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
    console.log("Server is running")
})