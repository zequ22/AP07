var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');

var clients = require('./data/clients.json')
var products = require('./data/products.json')
var sales = require('./data/sales.json')

var app = express()
var port = 3000

app.use(bodyParser.json())

//////////////////// CLIENTES ////////////////////
//OBTENER
app.get('/clients', function(req, res) {
    res.send(clients.list)
})
//ALTA
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
//BAJA
app.delete('/clients/:id', function(req, res) {
    var clientId = req.params.id;

    var clientIndex = clients.list.findIndex(client => parseInt(client.id) === parseInt(clientId));

    if (clientIndex !== -1) {
        clients.list.splice(clientIndex, 1);
        fs.writeFile('./data/clients.json', JSON.stringify(clients, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los cambios en clients.json');
            } else {
                res.status(204).send(`Cliente eliminado`);
            }
        });
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});
//MODIFICAR
app.put('/clients/:id', function(req, res) {
    var clientId = req.params.id;
    var updatedClient = req.body;

    var clientIndex = clients.list.findIndex(client => parseInt(client.id) === parseInt(clientId));

    if (clientIndex !== -1) {
        clients.list[clientIndex] = updatedClient;
        fs.writeFile('./data/clients.json', JSON.stringify(clients, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los cambios en clients.json');
            } else {
                console.log(`Cliente con ID ${clientId} actualizado y cambios guardados en clients.json`);
                res.status(200).send(updatedClient);
            }
        });
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

//////////////////// PRODUCTOS ////////////////////
//OBTENER
app.get('/products', function(req, res) {
    res.send(products.list)
})
//ALTA
app.post('/products', function(req, res) {
    var newProduct = req.body;
    products.list.push(newProduct);
    fs.writeFile('./data/products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al guardar los cambios en products.json');
        } else {
            console.log('Producto agregado y cambios guardados en products.json');
            res.status(201).send(newProduct);
        }
    });
  })
//BAJA
app.delete('/products/:id', function(req, res) {
    var productId = req.params.id;

    var productIndex = products.list.findIndex(product => parseInt(product.id) === parseInt(productId));

    if (productIndex !== -1) {
        products.list.splice(productIndex, 1);
        fs.writeFile('./data/products.json', JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los cambios en products.json');
            } else {
                res.status(204).send(`Producto eliminado`);
            }
        });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});
//MODIFICAR
app.put('/products/:id', function(req, res) {
    var productId = req.params.id;
    var updatedProduct = req.body;

    var productIndex = products.list.findIndex(product => parseInt(product.id) === parseInt(productId));

    if (productIndex !== -1) {
        products.list[productIndex] = updatedProduct;
        fs.writeFile('./data/products.json', JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los cambios en products.json');
            } else {
                console.log(`Producto con ID ${productId} actualizado y cambios guardados en products.json`);
                res.status(200).send(updatedProduct);
            }
        });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

//////////////////// VENTAS ////////////////////
//OBTENER
app.get('/sales', function(req, res) {
    res.send(sales.list)
})
//ALTA
app.post('/sales', function(req, res) {
    var newSale = req.body;
    sales.list.push(newSale);
    fs.writeFile('./data/sales.json', JSON.stringify(sales, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al guardar los cambios en sales.json');
        } else {
            console.log('Producto agregado y cambios guardados en sales.json');
            res.status(201).send(newSale);
        }
    });
  })
//BAJA
app.delete('/sales/:id', function(req, res) {
    var saleId = req.params.id;

    var saleIndex = sales.list.findIndex(sale => parseInt(sale.id) === parseInt(saleId));

    if (saleIndex !== -1) {
        sales.list.splice(saleIndex, 1);
        fs.writeFile('./data/sales.json', JSON.stringify(sales, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los cambios en sales.json');
            } else {
                res.status(204).send(`Venta eliminada`);
            }
        });
    } else {
        res.status(404).send('Venta no encontrada');
    }
});
//MODIFICAR
app.put('/sales/:id', function(req, res) {
    var saleId = req.params.id;
    var updatedSale = req.body;

    var saleIndex = sales.list.findIndex(sale => parseInt(sale.id) === parseInt(saleId));

    if (saleIndex !== -1) {
        sales.list[saleIndex] = updatedSale;
        fs.writeFile('./data/sales.json', JSON.stringify(sales, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al guardar los cambios en sales.json');
            } else {
                console.log(`Venta con ID ${clientId} actualizado y cambios guardados en sales.json`);
                res.status(200).send(updatedSale);
            }
        });
    } else {
        res.status(404).send('Venta no encontrado');
    }
});

app.listen(port, function() {
    console.log(`Example app listening on port ${port}`)
})