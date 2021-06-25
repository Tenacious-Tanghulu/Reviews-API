const model = require('./model.js');
const _ = require('underscore');



module.exports = {
  sort: (id, page, count, sort, res) => {
    //returns an object with the mentioned query restrictions
    count = JSON.parse(count);
    var initial = 1;
    var allReviews = [];
    var book = {};

    if(sort === 'newest') {
      allReviews = _.sortBy(res.rows, "date").reverse();
    } else if(sort === 'helpfulness') {
      allReviews = _.sortBy(res.rows, "helpfulness").reverse();
    } else {
      //this doesnt work, need to ask about
      allReviews = _.sortBy(_.sortBy(res.rows, "date").reverse(), "helpfulness").reverse();
    }


    var presentedReviews = []; //this contains the page with the reviews
    for(var i = 0; i < count; i++) {
      if(allReviews[i] !== undefined) {
        presentedReviews.push(allReviews[i]);
      }
    }

    if(count < allReviews.length) {
      //check page we are on
      var mod = allReviews.length % count;
      var current = 1;
      //console.log('length: ', allReviews.length, 'count', count);
      console.log('mod: ', allReviews.length + mod + 1);
      for(var j = 0; j < allReviews.length + mod + 1; j += count) {
        var index = j + count;

        var currentPage = allReviews.slice(j, index);

        console.log('one page', index);
        book[current] = currentPage;
        current += 1;
      }

      console.log('book: ', book);
    }




    //console.log('this is sorted reviews', presentedReviews);

    var result = {
      'product': id,
      'page': page,
      'count': count,
      'results': book[page] || presentedReviews
    };

    return result;


  }


}