const { Client } = require('pg');
const { Pool } = require('pg');
const password = require('../config.js')

const client = new Client({
  user: 'evansding',
  host: `${password.ip}`,
  database: 'products',
  password: `${password.password}`,
  port: 5432
});


client.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected to postgres!');
  }
})

module.exports = {
  db: client
}
