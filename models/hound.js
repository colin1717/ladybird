var mongoose = require('mongoose');

var houndsSchema = {
  userId: String,
  url: String,
  search_term: String,
  updated_at: { type: Date, default: Date.now }
}

var Hound = mongoose.model("Hound", houndsSchema);
module.exports = Hound;
