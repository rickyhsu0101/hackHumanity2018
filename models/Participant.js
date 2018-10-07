const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ParticipantSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'events'
  }]
});
mongoose.model("participants", ParticipantSchema);