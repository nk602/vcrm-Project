const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { validationResult } = require("express-validator");
const { date } = require("joi");
const jwt = require("jsonwebtoken");
// const {path}=require("../public/uploads/")
const jwt_key = process.env.Key;

module.exports.get_user_login = async (req, res) => {
  const errors = validationResult(req);
  //Login form
  if (req.isAuthenticated()) {
    return res.redirect("/user/dashboard/");
  }
  res.render("adminLogin", { message: "" });
};
module.exports.userCreate = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const userExists = await prisma.employee.findUnique({
      where: {
        username: username,
      },
    });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Define a default static profile picture URL or path
    // const defaultProfilePic = "../public/uploads/profile1.png";
    // Create the admin user in the database with the hashed password
    const User = await prisma.employee.create({
      data: {
        username: username,
        password: hashedPassword,
        // profilePic: defaultProfilePic,
      },
    });

    res.status(201).json({ message: "User created successfully", data: User });
  } catch (error) {
    console.log("Error during user creation", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.userLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, username, password } = req.body;
    if (!username || !password) {
      return res.render("adminLogin", {
        message: "Username or password not present",
      });
    }
    const employee = await prisma.employee.findUnique({
      where: {
        username: username,
      },
    });
    const employeeupdated = await prisma.employee.update({
      where: {
        username: username, // Assuming 'id' is the primary key of the employee
      },
      data: {
        updatedAt: new Date(),
      },
    });
    console.log("employeeupdated", employeeupdated.updatedAt);
    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      return res.render("adminLogin", {
        message: "Invalid password...",
      });
    }
    // Generate a JWT token
    // const authToken = jwt.sign({ id: employee.id }, jwt_key, {
    //   expiresIn: "1h", // Adjust the expiration time as needed
    // });
    // console.log(authToken);
    //  return res.status(200).json({message:"User login successfully",authKey:authToken})
    //res.redirect("/user/dashboard/");
    passport.authenticate("user-local", {
      successRedirect: "/user/dashboard/",
      failureRedirect: "/user/",
      failureFlash: true,
    })(req, res);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
};
module.exports.registerEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username, // Add username field
      password,
      mobileNumber,
      // Add other relevant fields here
    } = req.body;

    // Check if required fields are provided
    if (!firstName || !email || !username || !password || !mobileNumber) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check if the employee with the same email or username already exists
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });
    if (existingEmployee) {
      return res.status(409).json({
        message: "Employee with the same email or username already exists",
      });
    }
    // Create a new employee record
    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password, // Ensure that you hash and salt the password for security
        mobileNumber,
        // Add other relevant fields here
      },
    });
    return res.status(201).json({
      message: "Employee registered successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};
module.exports.userLogout = async (req, res) => {
  res.redirect("/admin");
};
