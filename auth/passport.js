const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;
/*Passport JS*/
const verifyCallback= async (email,password,done)=>{
  try { 
    const adminUser = await prisma.admin.findUnique({
      where: { email },
    });
    console.log(adminUser);
    if(!adminUser){
      return done(null,false);
    }
    return done(null,adminUser);
    /*
    const passwordMatch = await bcrypt.compare(password, adminUser.password);
    if(passwordMatch){
      return done(null,adminUser);
    }else{
      return done(null,false);
    }*/
  } catch (error) {
    console.log("Error during login", error);
    return done(null,false);
  }

}
const loginCheck = passport => {
  const strategy=new LocalStrategy({ usernameField: "email" },verifyCallback);
  passport.use(strategy);

  passport.serializeUser((adminUser,done)=>{
    // console.log("inside serialize");
    done(null,adminUser.id)
  });

  passport.deserializeUser( async function(userId,done){
    // console.log('deserializeUser'+ userId);
    const id = userId;
    const adminUser = await prisma.admin.findUnique({
      where: { id },
    });
    done(null, adminUser);   
   
  });
};
module.exports = loginCheck;
