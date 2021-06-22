const mongoose = require('mongoose');
const db = require('./mongo.js');


const listSchema = new mongoose.Schema({
  product: Number,
  page: Number,
  count: Number,
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: String,
      recommend: Boolean,
      response: String,
      body: String,
      date: String,
      reviewer_name: String,
      helpfulness: Number,
      photos: [{
          id: Number,
          url: String
        },
        {
          id: Number,
          url: String
        },

      ]
    }
  ]
  ratings: {
    "1": Number,
    "2": Number,
    "3": Number,
    "4": Number
  },
  recommended: {
    recommend: Number

  },
  characteristics: {
    Size: {
      id: Number,
      value: String
    },
    Width: {
      id: Number,
      value: String
    },
    Comfort: {
      id: Number,
      value: String
    }
});
const Purchase = mongoose.model('Purchase', listSchema);