const fs = require('fs');
const path = require('path');
const stream = require('stream');
const _ = require('underscore');
// const counter = require('./counter');

var dataDir = path.join(__dirname, 'reviews.csv');

// copy review(id_Review, id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
//   ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;

  copy product(id_product) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;




module.exports = {

  readAll: (callback) => {
    //probably have to use a transform function in callback while its iterating through
    var output;
    const readStream = fs.createReadStream(dataDir);
    readStream.on('data', function(data) {
      var string = data.toString();
      console.log(readStream.readable, string);
      //this outputs the entire file as a string in a stream
    })

    readStream.on('end', function() {
      console.log('finished');
    })
  }


}


module.exports.readAll(console.log);