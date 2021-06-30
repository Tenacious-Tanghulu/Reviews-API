const express = require('express')
const app = express();
const model = require('../Server/model.js');



app.use(express.json());

app.get('/reviews', async (req, res) => {
  //console.log(req.query);
  const {product_id, page, count, sort} = req.query;
  const results = await model.getAll(product_id, page, count, sort)
  try {
    res.status(200).send(results)
  } catch(err) {
    res.status(404).send(err);
  }
  // model.getAll(product_id, page, count, sort, (err, data) => {
  //   if(err) {
  //     res.status(404).send(err);
  //   } else {
  //     res.status(200).send(data);
  //   }
  // })
})

app.get('/reviews/meta', (req, res) => {
  const {product_id} = req.query;
  model.getMeta(product_id, (err, data) => {
    if(err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(data);
    }
  })
})

app.post('/reviews', async (req, res) => {

  try {
    const results = await model.post(req.body);
    res.status(201).send(results);
  } catch(err) {
    res.status(404).send(err);
  }
})

app.put('/reviews/helpful', async (req, res) => {
  const {review_id} = req.query;

  try{
    const results = await model.putHelp(review_id);
    res.status(204).send(results);
  } catch(err) {
    res.sendStatus(404);
  }
})

app.put('/reviews/report', async (req, res) => {
  const {review_id} = req.query;
  try{
    const results = await model.report(review_id);
    res.status(204).send(results);
  } catch(err) {
    res.sendStatus(404);
  }
})



module.exports = app;


