const { Client } = require('pg');

const client = new Client({
  user: 'evansding',
  database: 'products',
  password: 'password'
});

client.connect((err) => {
  if(err) {
    console.log('error');
  } else {
    console.log('connected to postgres!');
  }
})
client.query('SELECT * from review;', (err, res) => {
  if(err) {
    console.log('error');
  } else {
    console.log('this is response: ', res);
  }
})