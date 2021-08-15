const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const path = require('path');
const session = require('express-session');

/////////////// CORS /////////////////
const corsConfig = {
    credentials: true,
    origin: true,
  };
  app.use(cors(corsConfig));
//////////////////////////////////////

///////////////// Passport ///////////////////////////
//const passport = require('passport');
//app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//const modelUsers = require('./models/users.model');
//require('./config/passport.config')(passport, modelUsers);
//module.exports = passport;
//////////////////////////////////////////////////////

/////////////BODY PARSER/////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////////////////////

/////////////////// DB /////////////////////////////
//const seq = require("./config/sequelize.config");
const db = require("./models");
const Role = db.role;
db.sequelize.sync().then(() => {
    console.log("--\nDatabase synchronized\n--");
    //initial();
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
  res.json({ message: "TFE API" });
});
//////////////////////////////////////////////////////

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

 function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
} 