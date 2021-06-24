const { Client } = require('pg');

const client = new Client({
  user: 'evansding',
  database: 'backup',
  password: 'password'
});

client.connect((err) => {
  if(err) {
    console.log('error');
  } else {
    console.log('connected to postgres!');
  }
})
