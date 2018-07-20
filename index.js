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
    res.render("home");
});

fakeData = 
{
  city: "Seattle",
  dropoff_allowed: "TRUE",
  ecycle: "TRUE",
  fee: "Free",
  geolocation: {
  type: "Point",
  coordinates: [
  -122.33422,
  47.55335
  ]
  },
  geolocation_address: "5511 1st Ave S",
  geolocation_city: "Seattle",
  geolocation_zip: "98108",
  hours: "Mon-Fri: 9am - 5pm Sat: 11am - 5pm Pick Up Service by Appointment",
  location: "5511 1st Ave S WA 98108",
  mail_in_allowed: "FALSE",
  mapping_location: {
  type: "Point",
  coordinates: [
  -122.33422,
  47.55335
  ]
  },
  mapping_location_address: "5511 1st Ave S",
  mapping_location_city: "Seattle",
  mapping_location_zip: "98108",
  material_handled: "Cell Phones, Smart Phones, Mobile Devices",
  phone: "(206) 957-2682",
  pickup_allowed: "TRUE",
  property_type: "Business, Residents",
  provider_address: "5511 1st Ave S",
  provider_name: "3RTechnology, LLC",
  provider_url: "http://www.3rtechnology.com",
  providerid: "309",
  restrictions: "Pick-ups are limited to businesses customers. Call for more information.",
  service_description: "Accepts cell phones, batteries, PDAs, and accessories for recycling.",
  tibn: "TRUE",
  zip: "98108"
  }

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

app.get("/address", (req, res) => {
  res.render("address/new")
})

app.get('/results', function(req, res) {
  res.render('results/show');
});

app.get("/recycle-site", (req, res) => {
  res.render("centers/center", {center: fakeData})
})

app.get("/form", (req, res) => {
  res.render('address/new');
});

app.get("/index", (req, res) => {
  res.render("categories/index")
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
