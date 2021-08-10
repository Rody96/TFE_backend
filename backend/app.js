const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const path = require('path');
const session = require('express-session');

/////////////// HTTPS /////////////////
//app.use(express.static(__dirname + '/', { dotfiles: 'allow' }))
//const privateKey = fs.readFileSync('/etc/letsencrypt/live/rodrigue-projects.site/privkey.pem', 'utf8');
//const certificate = fs.readFileSync('/etc/letsencrypt/live/rodrigue-projects.site/cert.pem', 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/rodrigue-projects.site/chain.pem', 'utf8');
//const credentials = {
	//key: privateKey,
//	cert: certificate,
//	ca: ca
//};
//////////////////////////////////////

/////////////BODY PARSER/////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////////////////////

////////////////CORS//////////////////////////
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
///////////////// Passport ///////////////////////////

const passport = require('passport');
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
const modelUsers = require('./models/users.model');
require('./config/passport.config')(passport, modelUsers);
module.exports = passport;
//////////////////////////////////////////////////////


/////////////////// DB /////////////////////////////
const seq = require("./config/sequelize.config");
seq.sequelize.sync()
    .then(() => console.log("--\nDatabase synchronized\n--"))
    .catch((error) => console.log("An error occurred while Synchronization.\n", error));
////////////////////////////////////////////////////

/////////////////// ROUTES /////////////////////
const temperatureRoute =  require("./routes/temperature.routes")
const airQualityRoute = require("./routes/airQuality.routes")
const humidityRoute = require("./routes/humidity.routes");
const usersRoute = require("./routes/users.routes")

app.use("/temperature", temperatureRoute);
app.use("/airquality", airQualityRoute);
app.use("/humidity", humidityRoute);
app.use("/users", usersRoute);
////////////////////////////////////////////////

///////////////////// PORT //////////////////////////
// set port, listen for requests
//const httpServer = http.createServer(app);
/* const httpServer = http.createServer((req,res) => {

	res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});
	res.end();

});
const httpsServer = https.createServer(credentials, app);
httpServer.listen(80);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
}); */
//////////////////////////////////////////////////////


const PORT = process.env.PORT || '3000';
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});
//////////////////////////////////////////////////////

app.listen(PORT);
/////////////////////////////////////////////////////
