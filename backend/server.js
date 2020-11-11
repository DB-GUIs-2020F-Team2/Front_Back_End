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


// POST /reset
app.post('/reset', (req, res) => {
  connection.query('drop table if exists test_table', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table test_table");
  });
  res.status(200).send('created the table');
});

// POST /multplynumber
app.post('/multplynumber', (req, res) => {
  console.log(req.body.product);

  connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added ${req.body.product} to the table!`);
    }
  });
});

// GET /checkdb
app.get('/values', (req, res) => {
  connection.query('SELECT * FROM `team2`.`User`', function (err, rows, fields) {
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
app.get('/ContractProducts', (req, res)=>{
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
app.get('/ContractProduct/', async(req, res)=>{
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
app.get('/ContractProductC/', async(req, res)=>{
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
app.get('/ContractProductP/', async(req, res)=>{
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
app.post('/ContractProducts/', async(req, res)=>{
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
app.put('/ContractProduct/', async(req, res)=>{
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
app.delete('/ContractProduct/', async(req, res)=>{
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
app.delete('/ContractProductC/', async(req, res)=>{
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
//////////Project_Contractor abriviated to PC/////
//GET
//get all bids
app.get('/PC', (req, res)=>{
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
app.get('/PC/', async(req, res)=>{
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
app.get('/PCC/', async(req, res)=>{
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
app.get('/PCP/', async(req, res)=>{
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

app.post('/PC/', async(req, res)=>{
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
app.put('/PCP/', async(req, res)=>{
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
app.put('/PCC/', async(req, res)=>{
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
app.delete('/PC/', async(req, res)=>{
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
app.delete('/PCC/', async(req, res)=>{
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
app.delete('/PCP/', async(req, res)=>{
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

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});