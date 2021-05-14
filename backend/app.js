const express = require("express");
const app = express();

require('dotenv').config();
const session = require('express-session');

/////////////// CORS /////////////////
//////////////////////////////////////

///////////////// Passport ///////////////////////////

const passport = require('passport');
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
const modelUsers = require('./models/users.model');
require('./config/passport.config')(passport, modelUsers);
module.exports = passport;
//////////////////////////////////////////////////////

/////////////BODY PARSER/////////////////////////////////////////////////
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////////////////////

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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});
/////////////////////////////////////////////////////