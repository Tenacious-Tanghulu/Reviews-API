const client = require('./index.js');
const sorter = require('./sorter.js');



// client.db.query(`SELECT score FROM characteristic_review INNER JOIN characteristic_review ON id_Characteristics = (select id_characteristics from characteristics where id_product = 1)`)

module.exports = {
  getAll: (id, page = 1, count = 5, sort = 'newest', callback) => {
    console.log('info in model', id)
    client.db.query(`SELECT * from review where id_product=${id}`, (err, res) => {
      if(err) {
        callback(err);
      } else {
        //applies queries to response and sorts it
        var response = sorter.sort(id, page, count, sort, res)

        callback(null, response);
      }
    })
  },

  getMeta: (id, callback) => {

    const metaquery1 = `SELECT characteristics.id_product, characteristic_review.score, characteristic_review.id_characteristics, characteristics.description FROM characteristics, characteristic_review WHERE characteristics.id_product = ${id} AND characteristic_review.id_characteristics = characteristics.id_characteristics;`

    client.db.query(`${metaquery1}`, (err, res) => {
      if(err) {
        callback(err);
      } else {
        var response = sorter.sortMeta(res);
        callback(response);
      }
    })
  },

  post: (info, callback) => {

    const {product_id, rating, summary, recommend, body, name, email, photo, characteristics, photos} = info;
    console.log(product_id, rating, summary, recommend, body, name, email);
    const metaquery = `INSERT INTO Review (
      id_product, rating, summary, recommend, body, reviewer_name, reviewer_email, reported, helpfulness, response, date) VALUES (${product_id}, ${rating}, '${summary}', ${recommend}, '${body}', '${name}', '${email}', ${false}, ${0}, 'this is a response', NOW()) RETURNING Review_id;`;

    const innerquery = `INSERT INTO Characteristic_Review (Review_id, Score, id_Chracteristics) VALUES (${res.rows[0].review_id}, ) VALUES ()`

      //need to change helpfullness to be able to be null

    client.db.query(`${metaquery}`, (err, res) => {
      if(err) {
        console.log(err);
        callback(err);
      } else {
        // console.log('success!', res.rows[0]);
        // callback(null, res.rows[0]);
        client.db.query(`INSERT INTO Photos (Review_id, url) VALUES (${res.rows[0].review_id}, '${photos[0]}');`, (err, res1) => {
          if(err) {
            console.log(err);
            callback(err);
          } else {
            console.log('success!');
            callback(null, res, res1);
          }
        })
      }
    })
  }
}

// INSERT INTO Review (
//   id_product, rating, summary, recommend, body, reviewer_name, reviewer_email, reported, helpfulness, response, date) VALUES (5, 1, 'ddknlnfdsfdf', false, 'Dolorem ut facere nemo doloremque corporis illum sit. Officia fuga in deserunt numquam illum in sed ut. Cupiditate cum et rerum dolore. Sed qui et. Sit aliquam eveniet sunt placeat natus.' , 'evansding', 'dinger@something.com', false, 7, 'this is a response', NOW());



//module.exports.getMeta(25167, console.log);




// copy review(id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
//   ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;