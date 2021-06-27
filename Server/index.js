const { Client } = require('pg');
const { Pool } = require('pg');
const password = require('../config.js')

const client = new Client({
  host: 'localhost',
  user: 'evansding',
  database: 'products',
  port: 5432,
  password: `${password}`
});


client.connect((err) => {
  if(err) {
    console.log('error');
  } else {
    console.log('connected to postgres!');
  }
})

module.exports = {
  db: client
}
