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
    //console.log(adminUser);
    if(!adminUser){
      return done(null,false);
    }
    adminUser.loginType = "adminLogin";
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
  passport.use('admin-local',strategy);

  passport.serializeUser((adminUser,done)=>{
    // console.log("inside serialize");
    done(null,adminUser)
  });

  passport.deserializeUser( async function(user,done){
    console.log('deserializeUser'+ user.id);
    const id = user.id;
    if (user.userType === 'adminLogin') {
    const adminUser = await prisma.admin.findUnique({
      where: { id },
    });
    done(null, adminUser);   
  } else if (user.userType === 'empLogin') {
    const empUser = await prisma.employee.findUnique({
      where: { id },
    });
    done(null, empUser);  
  } else {
    done(new Error('Invalid user type'));
  }
  });
};
module.exports = loginCheck;
