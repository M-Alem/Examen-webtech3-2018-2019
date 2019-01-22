const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://root:pwroot1@ds247439.mlab.com:47439/examen', (err, database) => {
  if (err) return console.log(err)
  db = database.db('examen')
  app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Show the add examen form
app.get('/add', (req, res) => {
  res.render('add.ejs', {})
})

// Add an examen to the db
app.post('/add', (req, res) => {
 db.collection('inhaal').insertOne(req.body, (err, result) => {
  if (err) return console.log(err)
    res.redirect('/list')
 })
})

// Redirect to list
app.get('/', (req, res) => {
  res.redirect('/list')
})

// List all inhaalexamens
app.get('/list', (req, res) => {
 db.collection('inhaal').find().toArray((err, result) => {
   if (err) return console.log(err)
   res.render('list.ejs', { inhaal: result })
 })
})

