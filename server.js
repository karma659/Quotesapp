console.log('May node be with you')

const express = require('express');

const bodyParser= require('body-parser')
const app = express();
app.use(bodyParser.json())
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')
app.use(express.static('public'))
/*
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
  })
 
 

  app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
  })

  app.post('/quotes', (req, res) => {
    console.log(req.body)
})

*/
  var connectionString='mongodb+srv://akash:akash@cluster0.byn7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {

    console.log('Connected to Database')
    const db = client.db('galaxy-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }))
   
      app.get('/', function(req, res) {
     
      db.collection('quotes').find().toArray()
    .then(results => {
      console.log(results)
       res.render('index.ejs', {quotes: results})
    })
    .catch(error => console.error(error))
      })
    

      app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
          .then(results => {
            res.render('index.ejs', { quotes: results })
          })
          .catch(error => console.error(error))
      })






     app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
      console.log(result)
    })
    .catch(error => console.error(error))
})

app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        res.json('Success')
       })
      .catch(error => console.error(error))
  })


  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
         { name: req.body.name }
        )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted Darth Vadar's quote`)
      })
      .catch(error => console.error(error))
  })





   app.listen(3000, function() {
    console.log('listening on 3000')
  })

  }) 
  .catch(console.error)