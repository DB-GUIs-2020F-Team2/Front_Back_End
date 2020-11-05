require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// mysql connection
var connection = mysql.createConnection({
  host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
});

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

// GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

///////////////////////////////// ORDERS ////////////////////////////////////////////
// GET
// get all
app.get('/orders', function (req, res) {
  connection.query('SELECT * FROM `team2`.`Orders`', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// get specific order
app.get('/order/', async (req, res) => {
  var OrderID = req.param("OrderID")
  connection.query('SELECT * FROM `team2`.`Orders` WHERE `Orders`.`OrderID` = ?', OrderID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// POST
// add a new order
app.post('/orders/', async (req, res) => {
  var OrderStatus = req.param("OrderStatus")
  var ApplyDate = req.param("ApplyDate")
  var ExpireDate = req.param("ExpireDate")
  var VendorID = req.param("VendorID")
  connection.query('INSERT INTO `team2`.`Orders` (`OrderStatus`, `ApplyDate`, `ExpireDate`, `VendorID`) VALUES (?, ?, ?, ?)',
   [OrderStatus, ApplyDate, ExpireDate, VendorID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Added order to the table.`);
    }
  });
});

// PUT
// updates an order status
app.put('/order/', async (req, res) =>{
  var OrderStatus = req.param("OrderStatus")
  var OrderID = req.param("OrderID")
  connection.query('UPDATE `team2`.`Orders` SET `OrderStatus` = ? WHERE `OrderID` = ?',
  [OrderStatus, OrderID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated order ${OrderID} with status ${OrderStatus}.`);
    }
  });
})

//DELETE
// deletes an order
app.delete('/order/', async (req, res) =>{
  var OrderID = req.param("OrderID")
  connection.query('DELETE FROM `team2`.`Orders` WHERE `OrderID` = ?',
  OrderID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted order ${OrderID}.`);
    }
  });
})

///////////////////////////// PRODUCT ////////////////////////////////////
// GET
// gets all products
app.get('/products', function (req, res) {
  connection.query('SELECT * FROM `team2`.`Product`', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// gets a specific product
app.get('/product/', function (req, res) {
  var ProductID = req.param("ProductID")
  connection.query('SELECT * FROM `team2`.`Product` WHERE `ProductID` = ?',
  ProductID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// POST
// add a new product
app.post('/products/', async (req, res) => {
  var ProductName = req.param("ProductName")
  var CurrentPrice = req.param("CurrentPrice")
  var DiscountPrice = req.param("DiscountPrice")
  var Details = req.param("Details")
  var IsDiscount = req.param("IsDiscount")
  connection.query('INSERT INTO `team2`.`Product` (`ProductName`, `CurrentPrice`, `DiscountPrice`, `Details`, `IsDiscount`) VALUES (?, ?, ?, ?, ?)',
   [ProductName, CurrentPrice, DiscountPrice, Details, IsDiscount], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Added product to the table.`);
    }
  });
});

// PUT
// updates if a product is discounted
app.put('/product/', async (req, res) =>{
  var IsDiscount = req.param("IsDiscount")
  var ProductID = req.param("ProductID")
  connection.query('UPDATE `team2`.`Product` SET `IsDiscount` = ? WHERE `ProductID` = ?',
  [IsDiscount, ProductID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated order ${ProductID} with discount = ${IsDiscount}.`);
    }
  });
})

//DELETE
// deletes a product
app.delete('/product/', async (req, res) =>{
  var ProductID = req.param("ProductID")
  connection.query('DELETE FROM `team2`.`Product` WHERE `ProductID` = ?',
  ProductID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted product ${ProductID}.`);
    }
  });
})


/////////////////////////////// ORDER_PRODUCT ////////////////////////////////////
// GET
// gets products associated with an order
app.get('/order_product/order/', async (req, res) =>{
  var OrderID = req.param("OrderID")
  connection.query('SELECT * FROM `team2`.`Order_Product` WHERE OrderID = ?',
  OrderID, function(err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
})

// gets orders associated with a product
app.get('/order_product/product/', async (req, res) =>{
  var ProductID = req.param("ProductID")
  connection.query('SELECT * FROM `team2`.`Order_Product` WHERE ProductID = ?',
  ProductID, function(err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
})

// POST
// adds an entry to the order_product table
app.post('/order_product/', async (req, res) => {
  var ProductID = req.param("ProductID")
  var OrderID = req.param("OrderID")
  var Amount = req.param("Amount")
  connection.query('INSERT INTO `team2`.`Order_Product` (`ProductID`, `OrderID`, `Amount`) VALUES (?, ?, ?)',
   [ProductID, OrderID, Amount], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Added product ${ProductID} to order ${OrderID} with amount ${Amount}.`);
    }
  });
});

// PUT
// updates amount
app.put('/order_product/', async (req, res) =>{
  var Order_ProductID = req.param("Order_ProductID")
  var Amount = req.param("Amount")
  connection.query('UPDATE `team2`.`Order_Product` SET `Amount` = ? WHERE `Order_ProductID` = ?',
  [Amount, Order_ProductID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated order ${Order_ProductID} with amount ${Amount}.`);
    }
  });
})

// DELETE
// deletes a product from an order
app.delete('/order_product/', async (req, res) =>{
  var Order_ProductID = req.param("Order_ProductID")
  connection.query('DELETE FROM `team2`.`Order_Product` WHERE `Order_ProductID` = ?',
  Order_ProductID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted ${Order_ProductID} from Order_Product table.`);
    }
  });
})

/////////////////////////////// PROJECT_ORDER ////////////////////////////////////
// GET
// gets orders associated with a project
app.get('/project_order/', async (req, res) =>{
  var ProjectID = req.param("ProjectID")
  connection.query('SELECT * FROM `team2`.`Project_Order` WHERE ProjectID = ?',
  ProjectID, function(err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
})

// POST
// adds an entry to the order_product table
app.post('/project_order/', async (req, res) => {
  var ProjectID = req.param("ProjectID")
  var OrderID = req.param("OrderID")
  connection.query('INSERT INTO `team2`.`Project_Order` (`ProjectID`, `OrderID`) VALUES (?, ?)',
   [ProjectID, OrderID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Added product order ${OrderID} to project ${ProjectID}.`);
    }
  });
});

// DELETE
// deletes an order from a project
app.delete('/project_order/', async (req, res) =>{
  var Project_OrderID = req.param("Project_OrderID")
  connection.query('DELETE FROM `team2`.`Project_Order` WHERE `Project_OrderID` = ?',
  Project_OrderID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted ${Project_OrderID} from table.`);
    }
  });
})

////////////////////////////////// VENDOR_PRODUCT /////////////////////////////////
// GET
// gets orders associated with a product
app.get('/vendor_product/', async (req, res) =>{
  var VendorID = req.param("VendorID")
  connection.query('SELECT * FROM `team2`.`Vendor_Product` WHERE VendorID = ?',
  VendorID, function(err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
})

// POST
// adds aproduct to a vendor
app.post('/vendor_product/', async (req, res) => {
  var VendorID = req.param("VendorID")
  var ProductID = req.param("ProductID")
  connection.query('INSERT INTO `team2`.`Vendor_Product` (`VendorID`, `ProductID`) VALUES (?, ?)',
   [VendorID, ProductID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Added product ${ProductID} to vendor ${VendorID}.`);
    }
  });
});

// DELETE
// deletes a product from a vendor
app.delete('/vendor_product/', async (req, res) =>{
  var Vendor_ProductID = req.param("Vendor_ProductID")
  connection.query('DELETE FROM `team2`.`Vendor_Product` WHERE `Vendor_ProductID` = ?',
  Vendor_ProductID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted ${Vendor_ProductID} from Vendor_Product table.`);
    }
  });
})

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
