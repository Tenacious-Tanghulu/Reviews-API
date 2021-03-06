import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '10s', target: 1000 },
    { duration: '1s', target: 1000 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {

  let max = 1000011;

  let product_id = Math.floor(Math.random() * max) || 1;


  let res = http.get(`http://localhost:3000/reviews?product_id=${product_id}`);


  check(res, {
    'status was 200': (res) => res.status == 200,
    'response duration < 250 ms' : (res) => res.timings.duration < 250
  });



  sleep(1);
}