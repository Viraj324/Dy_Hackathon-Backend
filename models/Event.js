// const mongoose = require("mongoose");

// const EventSchema = new mongoose.Schema({
//     start: Date,
//     end: Date,
//     title: String
// });

// const Event = mongoose.model("Event", EventSchema);

// module.exports = Event;

// models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
