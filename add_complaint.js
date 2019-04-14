//This module is to be included under user login.
// Take u_id (user id) for login session and add into sql query below to merge it
//table columns are: c_id, u_id, c_title, c_description, c_status, c_je_id

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var urlencodedParser = bodyParser.urlencoded({extended : false})

app.get('/',function(req,res){
  res.sendFile('index.html', {root: __dirname})
  
})

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cms'
});

connection.connect(function(err){
  if(err) throw err;
    console.log('Connected');
})

app.post('/addcomplaint', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
    var title = req.body.title;
    var desc = req.body.description;
    console.log(title + desc);
  var sql = "insert into complaint (c_title, c_description, c_status) values ('" + title + "','" + desc + "','registered') ";
  connection.query(sql, function (err,result) {
      if (err) throw err;
      else
        console.log("success");

      
   })

  res.send('Complaint added sucessfully')
  console.log(req.body);
})


app.listen(8080);