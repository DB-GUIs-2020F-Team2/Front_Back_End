require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// mysql connection
var connection = mysql.createPool({
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
// connection.connect(function (err) {
//   if (err)
//     logger.error("Cannot connect to DB!");
//   logger.info("Connected to the DB!");
// });

// GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

///////////////////////////////// USERS ////////////////////////////////////////////
// GET user list
app.get('/getUser', (req, res) => {
  connection.query('SELECT * FROM User;', function (err, rows, fields) {
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


// Verify the User's username and password
app.get('/verifyUser', (req, res) => {
  connection.query('SELECT * FROM User WHERE UserName = ? AND HashPass = ? AND UserType = ? UNION SELECT 0,"NULL","NULL","NULL","NULL","NULL","NULL" WHERE NOT EXISTS (SELECT * FROM User WHERE UserName = ? AND HashPass = ? AND UserType = ?);', [req.body.UserName, req.body.HashPass, req.body.UserType, req.body.UserName, req.body.HashPass, req.body.UserType], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
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


// Insert a new User with all the information it needs
app.post('/registerUser', (req, res) => {
  connection.query('INSERT INTO User (UserName, HashPass, ContactInfo, InformationVis, Email, UserType) VALUES (?, ?, ?, ?, ?, ?);', [req.body.UserName, req.body.HashPass, req.body.ContactInfo, req.body.InformationVis, req.body.Email, req.body.UserType], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
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


app.get('/getProjects', (req, res) => {
  connection.query('SELECT * FROM Project;', function (err, rows, fields) {
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


///////////////////////////////// PROJECTS ////////////////////////////////////////////
// Find a project based on the manager id
app.get('/getProject/:id', (req, res) => {
  connection.query('SELECT Project.ProjectID, Project.ProjectName, Project.ApplyDate, Project.ExpireDate, Project.ProjectStatus, Project.ProjectType FROM Project INNER JOIN User ON Project.ManagerID = User.UserID WHERE Project.ManagerID = ?', [req.params.id], function (err, rows, fields) {
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


// Insert a new Project
app.post('/postProject', (req, res) => {
  connection.query('INSERT INTO Project (ProjectName, ApplyDate, ExpireDate, ProjectStatus, ProjectType, ManagerID) VALUES (?, ?, ?, ?, ?, ?);', [req.body.ProjectName, req.body.ApplyDate, req.body.ExpireDate, req.body.ProjectStatus, req.body.ProjectType, req.body.ManagerID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
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


// Change the expire date of a project
app.put('/changeDueDate', (req, res) => {
  connection.query('UPDATE Project SET ExpireDate = ? WHERE ProjectID = ?;', [req.body.ExpireDate, req.body.ProjectID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
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



// Delete a Project
app.delete('/deleteProject/:id', (req, res) => {
  connection.query('DELETE FROM Project WHERE ProjectID = ?', [req.params.id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
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

///////////////////////////////// NOTIFICATIONS ////////////////////////////////////////////
// Get a notification based on UserID
app.get('/getNotification/:id', (req, res) => {
  connection.query('SELECT * FROM NotificationBox WHERE ? = UserID', [req.params.id], function (err, rows, fields) {
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


// Insert a new notification
app.post('/postNotification', (req, res) => {
  connection.query('INSERT INTO NotificationBox (UserID, NotificationMessage) VALUES (?, ?);', [req.body.UserID, req.body.NotificationMessage], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
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

// Delete a notification based on NotificationID
app.delete('/deleteNotification/:id', (req, res) => {
  connection.query('DELETE FROM NotificationBox WHERE NotificationID = ?', [req.params.id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
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

// get order with products
app.get('/orders_full', function (req, res) {
  connection.query('SELECT * FROM Orders INNER JOIN Order_Product ON Order_Product.OrderID = Orders.OrderID INNER JOIN Product ON Order_Product.ProductID = Product.ProductID;',
  function (err, rows, fields) {
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

// get order with products

app.get('/orders_full/', async (req, res) => {
  var OrderID = req.param("OrderID");
  connection.query('SELECT * FROM Orders INNER JOIN Order_Product ON Order_Product.OrderID = Orders.OrderID INNER JOIN Product ON Order_Product.ProductID = Product.ProductID WHERE Orders.OrderID = ?',
  req.params.id, function (err, rows, fields) {
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

//get order with products for specific vendor
app.get('/orders_full/vendor/', async (req, res) => {
  var VendorID = req.param("VendorID");
  connection.query('SELECT * FROM Orders INNER JOIN Order_Product ON Order_Product.OrderID = Orders.OrderID INNER JOIN Product ON Order_Product.ProductID = Product.ProductID WHERE Orders.VendorID = ?',
   VendorID, function (err, rows, fields) {
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


// get orders from given date
app.get('/orders_full/date/:ExpireDate', async (req, res) => {
  connection.query(`SELECT * FROM Orders INNER JOIN Order_Product ON Order_Product.OrderID = Orders.OrderID INNER JOIN Product ON Order_Product.ProductID = Product.ProductID WHERE Orders.ExpireDate = ?`,
   [req.params.ExpireDate], function (err, rows, fields) {
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

// get orders before a given date
app.get('/orders_full/before/:ExpireDate', async (req, res) => {
  connection.query(`SELECT * FROM Orders INNER JOIN Order_Product ON Order_Product.OrderID = Orders.OrderID INNER JOIN Product ON Order_Product.ProductID = Product.ProductID WHERE datediff(Orders.ExpireDate, ?) > 0;`,
   [req.params.ExpireDate], function (err, rows, fields) {
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
app.get('/product/:id', function (req, res) {
  //var ProductID = req.param("ProductID")
  connection.query('SELECT * FROM `team2`.`Product` WHERE `ProductID` = ?',
  [req.params.id], function (err, rows, fields) {
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
//////////Biding/////
//for distingusishing api calls ie multiple gets which have the root of /bid/ nothing is added for using the primary key, a 1 is added for ContractorID and a 2 is added for contractID
//GET
//get all bids
app.get('/bids', (req, res)=>{
  connection.query('SELECT * FROM `team2`.`Bidding`', function (err, rows, fields) {
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
//get specific Bid
app.get('/bid/', async(req, res)=>{
  var BiddingID= req.param("BiddingID");
  connection.query('SELECT * FROM `team2`.`Bidding` WHERE `BiddingID` = ?', BiddingID, function (err, rows, fields) {
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
//get all Bids with specific contractor
app.get('/bid1/', async(req, res)=>{
  var ContractorID= req.param("ContractorID");
  connection.query('SELECT * FROM `team2`.`Bidding` WHERE `ContractorID` = ?', ContractorID, function (err, rows, fields) {
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
//all bid for specifc contract
app.get('/bid2/', async(req, res)=>{
  var ContractID= req.param("ContractID");
  connection.query('SELECT * FROM `team2`.`Bidding` WHERE `ContractID` = ?', ContractID, function (err, rows, fields) {
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
//POST 

app.post('/bids/', async(req, res)=>{
  var ContractorID= req.param("ContractorID")
  var BiddingPrice= req.param("BiddingPrice")
  var ContractID= req.param("ContractID")
  connection.query('INSERT INTO `team2`.`Bidding`  (`ContractorID`,`BiddingPrice`,`ContractID`) VALUES (?, ?, ?)',[ContractorID, BiddingPrice, ContractID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } 
    else{
      res.status(200).send('Added bid to the table');
    }
  });
});

//Put
app.put('/bid/', async(req, res)=>{
  var BiddingID= req.param("BiddingID")
  var BiddingPrice= req.param("BiddingPrice")
  
  connection.query("UPDATE team2.Bidding SET BiddingPrice = ? WHERE BiddingID= ?" ,[BiddingPrice, BiddingID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } 
    else{
      res.status(200).send(`Updated bid ${BiddingID} with new price ${BiddingPrice}.`);
    }
  });
});
//Delete
app.delete('/bid/', async(req, res)=>{
  var BiddingID= req.param("BiddingID")


  connection.query("DELETE From team2.Bidding WHERE BiddingID= ?" , BiddingID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted bid ${BiddingID} .`);
    }
  });
});
//delete with contractID
app.delete('/bid2/', async(req, res)=>{
  var ContractID= req.param("ContractID")


  connection.query("DELETE From team2.Bidding WHERE ContractID= ?" , ContractID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted all bids with ContractID ${ContractID} .`);
    }
  });
});
//delete with ContractorID
app.delete('/bid1/', async(req, res)=>{
  var ContractorID= req.param("ContractorID")


  connection.query("DELETE From team2.Bidding WHERE ContractorID= ?" , ContractorID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted all bids with ContractorID ${ContractorID} .`);
    }
  });
});

//////////Contract/////
//use initals of table entries excluding word ID and no Primary Key
//GET
//get all bids
app.get('/contracts', (req, res)=>{
  connection.query('SELECT * FROM `team2`.`Contract`', function (err, rows, fields) {
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
//get specific contract
app.get('/contract/', async(req, res)=>{
  var ContractID= req.param("ContractID");
  connection.query('SELECT * FROM `team2`.`Contract` WHERE `ContractID` = ?', ContractID, function (err, rows, fields) {
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
//get all contracts with specific contractor
app.get('/contractC/', async(req, res)=>{
  var ContractorID= req.param("ContractorID");
  connection.query('SELECT * FROM `team2`.`Contract` WHERE `ContractorID` = ?', ContractorID, function (err, rows, fields) {
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
//get all contracts which have a specifced value for is paid
app.get('/contractIP/', async(req, res)=>{
  var IsPaid= req.param("IsPaid");
  connection.query('SELECT * FROM `team2`.`Contract` WHERE `IsPaid` = ?', IsPaid, function (err, rows, fields) {
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
//get contract based on BestBiddingID
app.get('/contractBB/', async(req, res)=>{
  var BestBiddingID= req.param("BestBiddingID");
  connection.query('SELECT * FROM `team2`.`Contract` WHERE `BestBiddingID` = ?', BestBiddingID, function (err, rows, fields) {
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
//POST
//this is not working
app.post('/contracts/', async(req, res)=>{
  var ContactDetails= req.param("ContractDetails")
  var BestBiddingID= req.param("BestBiddingID")
  var ContractorID= req.param("ContractorID")
  var IsPaid= req.param("IsPaid")
  var ContractStatus= req.param("ContractStatus")
  connection.query('INSERT INTO `team2`.`Contract`  (`ContractDetails`,`BestBiddingID`,`ContractorID`,`IsPaid`,`ContractStatus`) VALUES (?, ?, ?, ?, ?)',[ContractDetails, BestBiddingID, ContractorID, IsPaid, ContractStatus], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send('Added contract to the table');
    }
  });
});

//Put
app.put('/contractBB/', async(req, res)=>{
  var ContractID= req.param("ContractID")
  var BestBiddingID= req.param("BestBiddingID")

  connection.query("UPDATE team2.Contract SET BestBiddingID = ? WHERE ContractID= ?" ,[BestBiddingID, ContractID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated contract Best bidding.`);
    }
  });
});
app.put('/contractCS/', async(req, res)=>{
  var ContractID= req.param("ContractID")
  var ContactStatus= req.param("ContractStatus")

  connection.query("UPDATE team2.Contract SET ContractStatus = ? WHERE ContractID= ?" ,[ContractStatus, ContractID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated Contract Status.`);
    }
  });
});
app.put('/contractIP/', async(req, res)=>{
  var ContractID= req.param("ContractID")
  var IsPaid= req.param("IsPaid")

  connection.query("UPDATE team2.Contract SET IsPaid = ? WHERE ContractID= ?" ,[IsPaid, ContractID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated Contract Paid boolean.`);
    }
  });
});
app.put('/contractC/', async(req, res)=>{
  var ContractID= req.param("ContractID")
  var ContractorID= req.param("ContractorID")

  connection.query("UPDATE team2.Contract SET ContractorID = ? WHERE ContractID= ?" ,[ContractorID, ContractID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated Contract ${ContractID} to have contractor with ID ${ContractorID}.`);
    }
  });
});
//Delete
app.delete('/contract/', async(req, res)=>{
  var ContractID= req.param("ContractID")


  connection.query("DELETE From team2.Contract WHERE ContractID= ?" , ContractID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted Contract ${ContractID} .`);
    }
  });
});

//////////ContractProduct/////
//distigushing api calls nothing for Primary key Contract_ProductID, C for using ContractID, P for using ProductID
//GET
//get all Contract Product lists
app.get('/contract_products', (req, res)=>{
  connection.query('SELECT * FROM `team2`.`Contract_Product`', function (err, rows, fields) {
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
app.get('/contract_product/', async(req, res)=>{
  var Contract_ProductID= req.param("Contract_ProductID");
  connection.query('SELECT * FROM `team2`.`Contract_Product` WHERE `Contract_ProductID` = ?', Contract_ProductID, function (err, rows, fields) {
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
//get all products for a specific Contract
app.get('/contract_productC/', async(req, res)=>{
  var ContractID= req.param("ContractID");
  connection.query('SELECT * FROM `team2`.`Contract_Product` WHERE `ContractID` = ?', ContractID, function (err, rows, fields) {
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
//get all contracts for a specific product
app.get('/contract_productP/', async(req, res)=>{
  var ProductID= req.param("ProductID");
  connection.query('SELECT * FROM `team2`.`Contract_Product` WHERE `ProductID` = ?', ProductID, function (err, rows, fields) {
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
//POST
//this is not working
app.post('/contract_products/', async(req, res)=>{
  var ContractID= req.param("ContractID")
  var ProductCount = req.param("ProductCount")
  var ProductID= req.param("ProductID")
  connection.query('INSERT INTO `team2`.`Contract_Product`  (`ContractID`,`ProductCount`,`ProductID`) VALUES (?, ?, ?)',[ContractID, ProductCount, ProductID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send('Added to Contract Product Table');
    }
  });
});

//Put
app.put('/contract_product/', async(req, res)=>{
  var Contract_ProductID= req.param("Contract_ProductID")
  var ProductCount= req.param("ProductCount")

  connection.query("UPDATE team2.Contract_Product SET ProductCount = ? WHERE Contract_ProductID= ?" ,[ProductCount, Contract_ProductID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated Contact Product Pairing ${Contract_ProductID} with new product count ${ProductCount}.`);
    }
  });
});
//Delete
app.delete('/contract_product/', async(req, res)=>{
  var Contract_ProductID= req.param("Contract_ProductID")


  connection.query("DELETE From team2.Contract_Product WHERE Contract_ProductID= ?" , Contract_ProductID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted Contract_Product entry with ID ${Contract_ProductID}.`);
    }
  });
});
app.delete('/contract_productC/', async(req, res)=>{
  var ContractID= req.param("ContractID")


  connection.query("DELETE From team2.Contract_Product WHERE ContractID= ?" , ContractID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted all Contract_Product entries with Contract ID ${Contract_ProductID}.`);
    }
  });
});
//////////Project_Contractor /////
//GET
//get all bids
app.get('/project_contractors', (req, res)=>{
  connection.query('SELECT * FROM `team2`.`Project_Contractor`', function (err, rows, fields) {
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
//primary key
app.get('/project_contractor/', async(req, res)=>{
  var Project_ContractorID= req.param("Project_ContractorID");
  connection.query('SELECT * FROM `team2`.`Project_Contractor` WHERE `Project_ContractorID` = ?', Project_ContractorID, function (err, rows, fields) {
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
//all projects with a specific contractor
app.get('/project_contractorC/', async(req, res)=>{
  var ContractorID= req.param("ContractorID");
  connection.query('SELECT * FROM `team2`.`Project_Contractor` WHERE `ContractorID` = ?', ContractorID, function (err, rows, fields) {
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
//all contractors for a specific project ID
app.get('/project_contractorsP/', async(req, res)=>{
  var ProjectID= req.param("ProjectID");
  connection.query('SELECT * FROM `team2`.`Project_Contractor` WHERE `ProjectID` = ?', ProjectID, function (err, rows, fields) {
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

//POST

app.post('/project_contractors/', async(req, res)=>{
  var ProjectID = req.param("ProjectID")
  var ContractorID= req.param("ContractorID")


  connection.query('INSERT INTO `team2`.`Project_Contractor`  (`ProjectID`,`ContractorID`) VALUES (?, ?)',[ProjectID, ContractorID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send('Added to Project Contractor pair to Table');
    }
  });
});

//Put Not really sure if these will ever be used
//update projectID
app.put('/project_contractorP/', async(req, res)=>{
  var Project_ContractorID= req.param("Project_ContractorID")
  var ProjectID= req.param("ProjectID")

  connection.query("UPDATE team2.Project_Contractor SET ProjectID = ? WHERE Project_ContractorID= ?" ,[ProjectID, Project_ContractorID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated Project_Contractor.`);
    }
  });
});
//update projectID
app.put('/project_contractorC/', async(req, res)=>{
  var Project_ContractorID= req.param("Project_ContractorID")
  var ContractorID= req.param("ContractorID")

  connection.query("UPDATE team2.Project_Contractor SET ContractorID = ? WHERE Project_ContractorID= ?" ,[ContractorID, Project_ContractorID], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "Put MySQL error"
      })
    }
    else{
      res.status(200).send(`Updated Project_Contractor`);
    }
  });
});
//Delete
app.delete('/project_contractor/', async(req, res)=>{
  var Project_ContractorID= req.param("Project_ContractorID")


  connection.query("DELETE From team2.Project_Contractor WHERE Project_ContractorID= ?" , Project_ContractorID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted Project_Contractor entry with ID ${Project_ContractorID}.`);
    }
  });
});
//delete all entries with specific contractor use case if a contractor no longer is working
app.delete('/project_contractorC/', async(req, res)=>{
  var ContractorID= req.param("ContractorID")


  connection.query("DELETE From team2.Project_Contractor WHERE ContractorID= ?" , ContractorID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted all Project_Contractor entrys with ContractorID ${ContractorID}.`);
    }
  });
});
app.delete('/project_contractorP/', async(req, res)=>{
  var ProjectID= req.param("ProjectID")


  connection.query("DELETE From team2.Project_Contractor WHERE ProjectID= ?" , ProjectID, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).send(`Deleted all Project_Contractor entries with Project ID ${ProjectID}.`);
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