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
            return res.status(503).json({
             status : 'fail',
                message : 'query error'
            });

        }

        //console.log(result);
        res.json({
            data : result,
            status: 'success',
            
        })
    })
});

//create
app.post('/branches', (req, res) =>{

    if(req.body.branchCode.length != 3) {
        return res.status(422).json({
            status : 'fail',
            message : 'invalid parameters'
        });
    }

    if(req.body.branchName.length < 5) {
        return res.status(422).json({
            status : 'fail',
            message : 'invalid parameters'
        });
    }

    // if(req.body.branchName.length != 3) {
    //     req.body.branchCode = null;
    // }
    
    const branchData = {
        BranchCode : req.body.branchCode || null, 
        BranchName: req.body.branchName || null
    };

    console.log(branchData);
    

    connection.query('INSERT INTO BranchMaster SET ?', branchData, function(err, result){
      if(err) {

        if(err.code == 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status : 'fail',
                message : ' duplicate value entered'
            });
        }

        if(err.code == 'ER_BAD_NULL_ERROR') {
            return res.status(422).json({
                status : 'fail',
                message : ' null value given'
            });
        }

          console.log(err);
          return res.status(503).json({
              status : 'fail',
              message : 'service not available'
          });
      }

      console.log(result);
      res.json({
              status : 'success',
              message : `${branchData.BranchName}saved sucessfully`
          });
    });
});


app.listen(3000, ()=>{
    console.log('listening to port:3000');
});