import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 20 },
    { duration: '30s', target: 100 },
    { duration: '20s', target: 0 },
  ],
};


export default function () {

  let max = 1000011;

  let product_id = Math.floor(Math.random() * max) || 1;

  let url = 'http://localhost:3000/reviews/';
  let request = {
      "product_id": product_id,
      "rating": 1,
      "summary": "this is a summmary",
      "recommend": false,
      "body": "Dolorem ut facere nemo doloremque corporis illum sit. Officia fuga in deserunt numquam illum in sed ut. Cupiditate cum et rerum dolore. Sed qui et. Sit aliquam eveniet sunt placeat natus.",
      "name" : "evansding",
      "email": "dinger@something.com",
      "photos": [],
       "characteristics": { "84504": 4, "84505": 3, "84506": 3, "84507": 3 }
  };

  let params = {
    body: {
      'Content-Type': 'application/json',
    },
  };

  let post = http.post(url, request, params);

  check(post, {
    'status was 201': (r) => r.status == 201,
    'response duration < 250 ms' : (r) => r.timings.duration < 250
  });


  sleep(1);

}