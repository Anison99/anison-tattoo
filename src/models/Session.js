const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionDate: { type: String, required: true },
  sessionTime: { type: String, required: true },
  messageToTattooArtist: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
