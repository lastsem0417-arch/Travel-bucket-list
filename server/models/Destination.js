const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema(
{
  // ⭐ Place Name
  name: {
    type: String,
    required: true,
    trim: true
  },

  // ⭐ Owner (logged in user)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // ⭐ Country
  country: {
    type: String,
    required: true,
    trim: true
  },

  // ⭐ Description
  description: {
    type: String,
    default: ""
  },

  // ⭐ Image
  imageUrl: {
    type: String,
    default: ""
  },

  // ⭐ Trip Type
  tripType: {
    type: String,
    default: "Adventure"
  },

  // ⭐ Priority
  priority: {
    type: String,
    enum: ["High","Medium","Low"],
    default: "Medium"
  },

  // ⭐ Budget
  estimatedBudget: {
    type: Number,
    default: 0
  },

  // ⭐ Visited Status
  isVisited: {
    type: Boolean,
    default: false
  },

  // ⭐ Date visited
  dateVisited: {
    type: Date,
    default: null
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("Destination", DestinationSchema);