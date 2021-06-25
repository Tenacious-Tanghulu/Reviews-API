const { Client } = require('pg');
const { Pool } = require('pg');
const password = require('../config.js')

const pool = new Pool({
  host: 'localhost',
  user: 'evansding',
  database: 'products',
  password: `${password}`
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

pool
  .connect()
  .then(client => {
    return client
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })


// client.connect((err) => {
//   if(err) {
//     console.log('error');
//   } else {
//     console.log('connected to postgres!');
//   }
// })

module.exports = {
  db: pool
}
