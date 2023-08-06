const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const passport = require('passport');
module.exports.get_admin_login = async (req, res) => {
  //Login form
  res.render("adminLogin", { message: "" });
};
/*
module.exports.admin_login = async (req, res) => {
  const { email, password } = req.body;
  const token = req.cookies.token;
  console.log("email", req.body);
  try {
    const admin_login = await prisma.admin.findUnique({
      where: { email },
    });
    if (!admin_login) {
      return res.send({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, admin_login.password);

    // if(!passwordMatch){
    //     return res.send({message:"Invalid password"})
    // }
    // res.send("admin");
    res.render("admin-dashboard");
  } catch (error) {
    console.log("Error during login", error);
    res.render("login", { message: "Internal server error" });
  }
};*/
module.exports.adminLogin = async (req, res) => {
  console.log('kkkkkn',req.body);
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("adminLogin", {email, password, message: "Please enter the correct details"});
  } else {
    passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/admin",
      failureFlash: true,
    })(req, res);
  }
};

module.exports.adminLogout = async (req, res) => {
  req.session.destroy()
  //req.logOut();
  res.redirect('/admin'); //redirecto login form(main route)
};
