const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true }
});

const EventModel = mongoose.model("events", EventSchema);
module.exports = EventModel;
