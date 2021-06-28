const model = require('./model.js');
const _ = require('underscore');



module.exports = {
  sort: (id, page, count, sort, res, photo) => {
    //returns an object with the mentioned query restrictions
    //console.log('photo in sorter', photo)
    count = JSON.parse(count);
    var initial = 1;
    var allReviews = [];
    var book = {};

    //add photo property into review object
    res.rows.map((data) => {
      data.photos = photo;
    })

    if(sort === 'newest') {
      allReviews = _.sortBy(res.rows, "date").reverse();
    } else if(sort === 'helpfulness') {
      allReviews = _.sortBy(res.rows, "helpfulness").reverse();
    } else {
      //this doesnt work, need to ask about how to write algo
      allReviews = _.sortBy(_.sortBy(res.rows, "date").reverse(), "helpfulness").reverse();
    }

    console.log(allReviews);

    var presentedReviews = []; //this contains the page with the reviews
    for(var i = 0; i < count; i++) {
      if(allReviews[i] !== undefined) {
        presentedReviews.push(allReviews[i]);
      }
    }

    if(count < allReviews.length) {
      //adds extra space on end of length to allow for not-perfect multiples of pages
      var mod = allReviews.length % count;
      //check page we are on
      var current = 1;
      //console.log('length: ', allReviews.length, 'count', count);
      //console.log('mod: ', allReviews.length + mod + 1);
      for(var j = 0; j < allReviews.length + mod + 1; j += count) {
        var index = j + count;

        var currentPage = allReviews.slice(j, index);

        book[current] = currentPage;
        current += 1;
      }

      //console.log('book: ', book);
    }

    var result = {
      'product': id,
      'page': page,
      'count': count,
      'results': book[page] || presentedReviews

    };

    return result;


  },

  sortMeta: (res) => {
    //final output
    var result = {};

    //current id
    var id = '';

    //ratings object
    var ratings = {};

    //characteristics object
    var characteristics = {};

    //count to divide ratings by
    var count = {};
    var charId = {};


    res.rows.map((data) => {
      //iterate through data and format it correctly
      id = data.id_product;
      ratings[data.score] = (ratings[data.score] ?? 0) + 1;
      var number = JSON.parse(data.score);
      characteristics[data.description] = (ratings[data.score] ?? 0) + number;
      //keep track of how many times a data has been here
      count[data.description + ' count'] = (ratings[data.score] ?? 0) + 1;
      charId[data.description] = data.id_characteristics;
    });

    for(var keys in characteristics) {
      //get the average of a particular description by dividing itself by its key + count
      characteristics[keys]  = characteristics[keys] / count[keys + ' count'];
    }

    for(var keys in characteristics) {
      characteristics[keys] = {
        "id": charId[keys],
        "value": JSON.stringify(characteristics[keys])
      }
    }


    //make everything  a string for some reason they want that
    for(var keys in ratings) {
      ratings[keys] = JSON.stringify(ratings[keys]);
    }

    result = {
      "product_id": JSON.stringify(id),
      "ratings": ratings,
      "characteristics": characteristics
    }


    return result;
  }


}