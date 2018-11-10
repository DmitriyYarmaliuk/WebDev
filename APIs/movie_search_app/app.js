var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res){
    console.log('req.query.search:', req)
    var query = req.query.search; // It is NOT req.body becuase this is a GET route and not a POST
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body) // Gives object form of the JSON string
            res.render("results", {data: data});
        }
    });
});



app.listen(3000, function(){
    console.log("Movie App has started!!!");
});