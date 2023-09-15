const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
/*Passport JS*/
const verifyCallback = async (username, password, done) => {
  try {
    const empUser = await prisma.employee.findUnique({
      where: { username },
    });
    //console.log('helloEPM',empUser);
    if (!empUser) {
      return done(null, false);
    }
    empUser.loginType = "empLogin";
    return done(null, empUser);
    /*
    const passwordMatch = await bcrypt.compare(password, empUser.password);
    if(passwordMatch){
      return done(null,empUser);
    }else{
      return done(null,false);
    }*/
  } catch (error) {
    console.log("Error during login", error);
    return done(null, false);
  }
};
const loginCheckUser = (passport) => {
  const strategy = new LocalStrategy(
    { usernameField: "username" },
    verifyCallback
  );
  passport.use('user-local',strategy);

  passport.serializeUser((empUser, done) => {
    // console.log("inside serialize");
    done(null, empUser);
  });

  passport.deserializeUser(async function (user, done) {
    console.log('deserializeUser'+ user.id);
    const id = user.id;
    const empUser = await prisma.employee.findUnique({
      where: { id },
    });
    done(null, empUser);
  });
};
module.exports = loginCheckUser;
