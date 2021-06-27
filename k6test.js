import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {

  let max = 1000011;

  let product_id = Math.floor(Math.random() * max) || 1;


  let res = http.get(`http://localhost:3000/reviews?product_id=${product_id}`);

  check(res, {
    'status was 200': (res) => res.status == 200,
    'response duration < 500 ms' : (res) => res.timings.duration < 250
  });

  sleep(1);
}