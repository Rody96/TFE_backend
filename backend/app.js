const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const path = require('path');


/////////////// HTTPS ////////////////////////////////////////
app.use(express.static(__dirname + '/', { dotfiles: 'allow' }))
const privateKey = fs.readFileSync('/etc/letsencrypt/live/rodrigue-projects.site/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/rodrigue-projects.site/cert.pem', 'utf8');  
const ca = fs.readFileSync('/etc/letsencrypt/live/rodrigue-projects.site/chain.pem', 'utf8');
const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca
};
/////////////////////////////////////////////////////////////

/////////////// CORS /////////////////
const corsConfig = {
    credentials: true,
    origin: true,
  };
  app.use(cors(corsConfig));
//////////////////////////////////////

/////////////BODY PARSER/////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////////////////////

/////////////////// DB /////////////////////////////
const db = require("./models");
const Role = db.role;
db.sequelize.sync().then(() => {
    console.log("--\nDatabase synchronized\n--");
  })
  .catch((error) => console.log("An error occurred while Synchronization.\n", error));
////////////////////////////////////////////////////

/////////////////// ROUTES /////////////////////
const temperatureRoute =  require("./routes/temperature.routes")
const airQualityRoute = require("./routes/airQuality.routes")
const humidityRoute = require("./routes/humidity.routes");
const fanRoute = require("./routes/fan.routes");
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.use("/temperature", temperatureRoute);
app.use("/airquality", airQualityRoute);
app.use("/humidity", humidityRoute);
app.use("/fan", fanRoute);
////////////////////////////////////////////////

///////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

///////////////////// PORT //////////////////////////
const httpServer = http.createServer((req,res) => {

  res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});
  res.end();

});
const httpsServer = https.createServer(credentials, app);
httpServer.listen(80);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
//////////////////////////////////////////////////////