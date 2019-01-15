const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
let db = {}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/todos', (req, res) => {
  res.json(db)
})

app.put('/todos', (req, res) => {
  db = req.body
  res.json(db)
})

app.listen(port, () => console.log(`started at ${port}`))
