const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  name:{
    type: String,
    required: true
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'participants'
  }],
  openTime: {
    type: Date,
    required: true,
  },
  closeTime: {
    type: Date,
    default: null
  },
  tag: {
    type: String,
    required: true
  }
});
mongoose.model('events', EventSchema);