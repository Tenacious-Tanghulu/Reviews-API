const client = require('./index.js');

module.exports = {
  get: (callback) => {
    client.query('SELECT * from review;', (err, res) => {
      if(err) {
        console.log('error');
      } else {
        console.log('this is response: ', res);
      }
    })
  }
}



// copy review(id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
//   ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;