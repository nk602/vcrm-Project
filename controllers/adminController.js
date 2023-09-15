const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { validationResult } = require("express-validator");
module.exports.get_admin_login = async (req, res) => {
  const errors = validationResult(req);

  // Check if there are any validation errors
  /* if (!errors.isEmpty()) {
    return res.render("adminLogin", {
      message: "Validation errors occurred.",
      errors: errors.array()
    });
  } */
  //Login form
  //   if (req.isAuthenticated()) {
  //     return res.redirect("/admin/dashboard/");
  //   }
  res.render("adminLogin", { message: "" });
};
// module.exports.adminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   // const token = req.cookies.token;
//   console.log("email", req.body);
//   try {
//     const admin_login = await prisma.admin.findUnique({
//       where: { email},
//     });
//     const passwordMatch = await bcrypt.compare(password, admin_login.password);
//     if (!passwordMatch) {
//       // Password doesn't match
//       return res.render("adminLogin", { message: "Invalid email or password" });
//     }
//      res.render("admin-dashboard");
//   } catch (error) {
//     console.log("Error during login", error);
//     res.render("adminLogin", { message: "Internal server error" });
//   }
// }
module.exports.adminCreate = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the admin user in the database with the hashed password
    const createdAdmin = await prisma.admin.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    console.log("Error during admin creation", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// module.exports.adminLogin = async (req, res) => {
//   console.log("user", req.body);
//   try {
//     const { email, password } = req.body;
//     if (!email) {
//       return res.render("adminLogin", { message: "Email not present" });
//     }
//     if (!password) {
//       return res.render("adminLogin", { message: "Password not present" });
//     }
//     const admin_login = await prisma.admin.findUnique({
//       where: { email, password },
//     });

//     if (!admin_login) {
//       // Email doesn't exist in the database
//       return res.render("adminLogin", { message: "Invalid email or password" });
//     }
//     // const passwordMatch = await bcrypt.compare(password, admin_login.password);
//     // console.log(passwordMatch);
//     // if (!passwordMatch) {
//     //   // Password doesn't match
//     //   return res.render("adminLogin", { message: "Invalid password1" });
//     // }
//     // if (!admin_login.password) {
//     //   // Email doesn't exist in the database
//     //   return res.render("adminLogin", { message: "Invalid password" });
//     // }

//     res.render("admin-dashboard");
//   } catch (error) {
//     console.log("Error during login", error);
//     res.render("adminLogin", { message: "Internal server error" });
//   }
// };

// const passport = require('passport'); // Make sure to import Passport if not already done

// module.exports.adminLogin=(req,res)=>{
//   const {email,password}=req.body;

//   if(email)

// }
// module.exports.adminLogin = (req, res, next) => {
//   const { email, password } = req.body;

//   // Check for missing email or password
//   if (!email ||!password) {
//     console.log("Please fill in all the fields");
//     return res.render("adminLogin", { email, password, message: "Please enter the correct details" });
//   }

//   // Authenticate using Passport's local strategy
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       // Handle authentication error
//       console.error("Authentication error:", err);
//       return next(err);
//     }

//     if (!user) {
//       // Authentication failed
//       console.log("Incorrect credentials");
//       return res.render("adminLogin", {password, message: "Incorrect credentials" });
//     }

//     // Authentication succeeded, log in the user
//     req.login(user, (loginErr) => {
//       if (loginErr) {
//         console.error("Login error:", loginErr);
//         return next(loginErr);
//       }

//       // Redirect to the dashboard on successful login
//       return res.redirect("/admin/dashboard");
//     });

//   })(req, res, next); // Pass `req`, `res`, and `next` to the authentication middleware
// };
module.exports.adminLogin = async (req, res) => {
  console.log("kkkkkn", req.body);
  const { email,password} = req.body;
  if (!email||!password) {
    return res.render("adminLogin", {
      message: "Email or password not present",
    });
  }
  // if (!email) {
  //   return res.render("adminLogin", {
  //     message: "Email not present",
  //   });
  // }
  // if (!password) {
  //   return res.render("adminLogin", {
  //     message: "Password not present",
  //   });
  // }
  if (req.isAuthenticated()) {
    return res.redirect("/admin/dashboard");
  }
  const admin_login = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin_login) {
    //     //   // Email doesn't exist in the database
    return res.render("adminLogin", { message: "Invalid email" });
  }
  // if (admin_login.password !== password) {
  //   return res.render("adminLogin", { message: "Invalid password" });
  // }
  const passwordMatch = await bcrypt.compare(password, admin_login.password);
  console.log("passwordMatch", passwordMatch);
  if (!passwordMatch) {
    // Password doesn't match
    return res.render("adminLogin", { message: "Invalid password.." });
  }
  passport.authenticate("admin-local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin",
    failureFlash: true,
  })(req, res);
};
// ye  pahale jai
module.exports.adminLogout = async (req, res) => {
  req.session.destroy();
  //req.logOut();
  res.redirect("/admin/"); //redirecto login form(main route)
};
