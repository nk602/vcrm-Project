const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization
const cookieParser = require('cookie-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
// Configure Sessions Middleware
app.use(cookieParser());
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configure Middleware
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
// passport.use(prisma.admin.createStrategy());

// // To use with sessions
// passport.serializeUser(prisma.admin.serializeUser());
// passport.deserializeUser(prisma.admin.deserializeUser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//routes
app.use("/", require("./routes"));
app.get("/", (req, res) => {
  res.send("vsrm prject apis is running");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
