const client = require('./index.js');
const sorter = require('./sorter.js');

const metaquery1 = `SELECT characteristics.id_product, characteristic_review.score, characteristic_review.id_characteristics, characteristics.description FROM characteristics, characteristic_review WHERE characteristics.id_product = 1 AND characteristic_review.id_characteristics = characteristics.id_characteristics;`

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


    client.db.query(`${metaquery1}`, (err, res) => {
      if(err) {
        callback(err);
      } else {
        var response = sorter.sortMeta(res);
        callback(response);
      }
    })

    // client.db.query(`select * from characteristics where id_product = ${id}`, (err, res) => {
    //   if(err) {
    //     callback(err);
    //   } else {
    //     var charArray = sorter.sortMeta(res);
    //     //console.log(charArray);
    //     for(var i = 0; i < charArray.length; i++) {
    //       //console.log('this is charArray in outside', charArray[i]);
    //       var description = charArray[i].description;
    //       //console.log(description);
    //       client.db.query(`select * from characteristic_review where id_characteristics = ${charArray[i].id_characteristics}`, (err, res1) => {
    //         if(err) {
    //           callback(err);
    //         } else {
    //           callback(res.rows[i]);
    //         }
    //       })

    //     }
    //   }

    // })


  },

  post: () => {

  }
}





module.exports.getMeta(1, console.log);




// copy review(id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
//   ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;