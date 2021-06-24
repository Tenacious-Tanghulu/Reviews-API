const express = require('express')
const app = express()
const port = 3000

app.get('/reviews', (req, res) => {
  res.send('Here are the reviews!')
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