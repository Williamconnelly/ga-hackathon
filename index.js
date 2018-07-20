require("dotenv").config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get("/api", (req, res) => {
    request("https://data.kingcounty.gov/resource/tzui-ygc5.json?city=Seattle", 
    (err, response, body) => {
        if (err) {
            console.log(err)
        } else {
            var result = JSON.parse(body)
            res.json(result)
        }
    })
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;