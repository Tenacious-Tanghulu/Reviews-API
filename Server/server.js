const express = require('express')
const app = express()
const port = 3000;
const model = require('./model.js');


app.use(express.json());

app.get('/reviews', (req, res) => {
  //console.log(req.query);
  const {product_id, page, count, sort} = req.query;
  model.getAll(product_id, page, count, sort, (err, data) => {
    if(err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  })
})

app.get('/reviews/meta', (req, res) => {
  res.send('Here is the metadata!')
})

app.post('/reviews', (req, res) => {
  res.send('Posting reviews!')
})

app.post('/reviews/report', (req, res) => {
  res.send('reporting reviews!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})