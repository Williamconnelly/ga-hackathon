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
    res.render('index', {fakeData: fakeData});
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

var fakeData = {
    city: "Seattle",
    ecycle: "FALSE",
    geolocation_address: "8105 Fifth Ave. S.",
    geolocation_zip: "98108",
    hours: "Thurs-Sat: 9:30am - 4:30pm",
    location: "8105 Fifth Ave. S. WA 98108",
    mail_in_allowed: "FALSE",
    material_handled: "Button Batteries",
    phone: "(206) 296-4692",
    pickup_allowed: "FALSE",
    property_type: "Business, Residents",
    provider_address: "8105 Fifth Ave. S.",
    provider_name: "City of Seattle South Hazardous Waste Facility",
    provider_url: "http://www.lhwmp.org/home/HHW/disposal-locations.aspx#south",
    providerid: "401",
    restrictions: "Business waste amounts and types are restricted",
    service_description: "Accepts button batteries, which are recycled by the Rechargeable Battery Recycling Corporation.",
    tibn: "FALSE",
    zip: "98108"
    }

app.get("/api/fake", (req, res) => {
    res.render("index", {fakeData})
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;