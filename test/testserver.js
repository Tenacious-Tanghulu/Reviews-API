const express = require('express')
const app = express();
const model = require('../Server/model.js');



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
  const {product_id} = req.query;
  model.getMeta(product_id, (err, data) => {
    if(err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(data);
    }
  })
})

app.post('/reviews', (req, res) => {
  model.post(req.body, (err, data) => {
    if(err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  })
   console.log('this is post request body', req.body);
})

app.put('/reviews/helpful', async (req, res) => {
  const {review_id} = req.query;
  try{
    const results = model.putHelp(review_id);
    res.sendStatus(204);
  } catch(err) {
    console.log(err);
    res.sendStatus(404);
  }
})

app.put('/reviews/report', async (req, res) => {
  const {review_id} = req.query;
  try{
    const results = await model.report(review_id);
    console.log(results);
    res.status(204).send(results);
  } catch(err) {
    console.log(err);
    res.sendStatus(404);
  }
})



module.exports = app;


