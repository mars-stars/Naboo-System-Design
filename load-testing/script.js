import http from 'k6/http';
import { sleep } from 'k6';



export let options = {
  // stages: [
  //   { duration: "30s", target: 100 },
  //   { duration: "30s", target: 200 },
  //   { duration: "30s", target: 500 },
  //   { duration: "30s", target: 1000 },
  // ]

  vus: 1000,
  duration: '30s'

}


export default function () {
  // http.get('http://localhost:3000/products');

  // http.get('http://localhost:3000/products/999913');

  http.get('http://localhost:3000/products/999913/styles');

  // http.get('http://localhost:3000/products/999913/related');

  sleep(1);
};

