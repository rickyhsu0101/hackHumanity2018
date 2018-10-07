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
  image:{
    type: String,
    default: null
  },
  desc:{
    type: String,
    defualt: "No Descriptions"
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