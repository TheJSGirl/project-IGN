const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const path = require('path');

const app = express();

// middlewares 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, appID, empID, version, token");
  res.header("Access-Control-Allow-Methods", "GET, POST,HEAD, OPTIONS,PUT, PATCH, DELETE");
  next();
});

// use body parser to parse form data
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pinku',
  database : 'ignou'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected to the database ignou');
});

//read
app.get('/branches', (req, res) => {
    
    connection.query('SELECT * FROM BranchMaster', (err, result, fields) => {
        if(err) {
            console.log(err);
            return res.json({
                status : 'fail',
                message : 'query error'
            });

        }

        //console.log(result);
        res.json({
            data : result,
            status: 'sucess',
            
        })
    })
});

//create
app.post('/branches', (req, res) =>{
    
    const branchData = {
        BranchCode : req.body.branchCode, 
        BranchName: req.body.branchName 
    };
    

    connection.query('INSERT INTO BranchMaster SET ?', branchData, function(err, result){
      if(err) {
          console.log(err);
          return res.json({
              status : 'fail',
              message : 'service not available'
          });
      }

      console.log(result);
      res.json({
              status : 'sucess',
              message : `${branchData.BranchName}saved sucessfully`
          });
    });
});


app.listen(3000, ()=>{
    console.log('listening to port:3000');
});