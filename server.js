
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var result = function(ipaddress,browserlanguage,software){

  this.ipaddress=ipaddress;
  this['language']=browserlanguage;
  this.software=software;
};


app.get('/api/whoami', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress;

  var lan=(req.headers["accept-language"]).substr(0,5);
  var os= req.headers["user-agent"];
  os=os.substr(os.indexOf("(",0)+1,os.indexOf("\)",0)-os.indexOf("(",0)-1);

  var sendResult=new result(ip,lan,os);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(sendResult));
  

});
app.get('/', function (req, res) {
  res.send("<p>Please go to - - <code>https://mysterious-eyrie-34965.herokuapp.com/api/whoami</code></h1><br><br><br> <b> Source code is available at https://github.com/ChaituVR/Request-Header-Parser</b>");
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
