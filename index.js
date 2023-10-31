var express = require('express')
var bodyParser = require('body-parser') // Para analizar los datos del cuerpo de la solicitud
var fs = require('fs'); // Módulo File System

var clients = require('./data/clients.json')
var products = require('./data/products.json')
var sales = require('./data/sales.json')

var app = express()
var port = 3000

app.use(bodyParser.json()) // Middleware para analizar JSON en el cuerpo de la solicitud

app.get('/clients', function(req, res) {
    res.send(clients.list)
})
app.post('/clients', function(req, res) {
  var newClient = req.body;
  clients.list.push(newClient);
  fs.writeFile('./data/clients.json', JSON.stringify(clients, null, 2), (err) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error al guardar los cambios en clients.json');
      } else {
          console.log('Cliente agregado y cambios guardados en clients.json');
          res.status(201).send(newClient);
      }
  });
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