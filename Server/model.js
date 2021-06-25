const client = require('./index.js');
const sorter = require('./sorter.js');

module.exports = {
  getAll: (id, page = 1, count = 5, sort = 'newest', callback) => {
    console.log('info in model', id)
    client.db.query(`SELECT review.* from review where id_product=${id}`, (err, res) => {
      if(err) {
        callback(err);
      } else {
        //applies queries to response and sorts it
        //sorter.sort(id, page, count, sort, res)

        callback(null, res);
      }
    })
  },

  post: () => {

  }
}





//module.exports.getAll(console.log);




// copy review(id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
//   ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;