const mongoose = require("mongoose");

const showSeatSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
    required: true,
    index: true
  },

  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true
  },

  seatNumber: {
    type: String,
    required: true
  },

  row: {
    type: String
  },

  status: {
    type: String,
    enum: ["AVAILABLE", "LOCKED", "BOOKED"],
    default: "AVAILABLE",
    index: true
  },

  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    default: null
  },

  lockedAt: {
    type: Date
  },

  expiresAt: {
    type: Date,
    index: true
  }

}, { timestamps: true });

// prevent duplicate seat for same show
showSeatSchema.index({ showId: 1, seatId: 1 }, { unique: true });

module.exports = mongoose.model("ShowSeat", showSeatSchema);