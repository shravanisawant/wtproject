var express = require("express");
var bodyParser = require("body-parser");
var path = require('path')
var fs = require('fs')
var app = express();
const port = 7770;
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended : true})
app.use(express.static(__dirname))
/*
1. fill db details
2. table name - Complaint
3. colms - Cid,Uid,Ctitle,Cdescription,Cstatus,Je. 
Same names are used in Je.html for displaying in table as temp[i].Cid etc.
Take care of that as well if the names change
4. change JUNIOR_ENGG with the session variable
5. Je.html must be inside a folder names 'views'.
*/

//defining a template engine where #items# will be replaced with JSON.stringify of items list
app.engine('html', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    var rendered = content.toString().replace('#items#' ,JSON.stringify(options.items))
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'html') // register the template engine


var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : ''
});
connection.connect(function(err){
  if(err) throw err;
    console.log('Connected');
})


app.get('/',function(req,res){
	connection.query("SELECT * FROM Complaint WHERE Je='"+JUNIOR_ENGG+"';" , function(err,rows,fields){
		if(err) throw err
		res.render('Je.html', {items:rows})
	})
})

app.listen(port,()=> console.log(`Connected at port ${port}`))

app.get('/route', function (req, res) {
	console.log(req);
  let id = req.query.ipt;
  console.log(id);
  var sql = "UPDATE Complaint SET Cstatus = 'Resolved' WHERE Cid =" +id+";"; 
  connection.query(sql, function (err,result) {
      if (err) throw err;
      console.log("success");
      connection.query("SELECT * FROM Complaint WHERE Je='"+JUNIOR_ENGG+"';" , function(err,rows,fields){
		if(err) throw err
		res.render('Je.html', {items:rows})
	})
   })
})