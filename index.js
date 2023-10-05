var express = require('express')

var clients = require('./data/clients.json')
var products = require('./data/products.json')
var sales = require('./data/sales.json')

var app = express()
var port = 3000

app.get('/clients', function(req, res) {
    res.send(clients.list)
  })
app.get('/products', function(req, res) {
    res.send(products.list)
  })
app.get('/sales', function(req, res) {
    res.send(sales.list)
  })

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})