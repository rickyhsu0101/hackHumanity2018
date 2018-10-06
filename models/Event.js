const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  registered: {

  },
  park: {
    type: Schema.Types.ObjectId,
    ref: 'parks'
  },
  openTime: {
    type: Date,
    required: true,
  },
  closeTime: {
    type: Date,
    default: Date.now
  }
});
mongoose.model('events', EventSchema);