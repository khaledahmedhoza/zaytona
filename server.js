const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views')) 

//var db = require('./db')
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

// Connect to Mongo on start
MongoClient.connect('mongodb://localhost:27017/zaytona', function(err,db) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {


    app.get('/', (request, response) => { 
    var collection = db.collection('stock') 
    collection.find().toArray(function(err, docs) {
        response.render('home', {stock: docs})
    })
    })

    app.get('/orders', (request, response) => { 
    var collection = db.collection('order') 
    collection.find().toArray(function(err, docs) {
        response.render('order', {order: docs})
    })
    })

    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})

