const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
module.exports.get_admin_login = async (req, res) => {
  res.render("adminLogin", { message: "Admin Login Successfully" });
};
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
};
module.exports.adminLogout = async (req, res) => {
  // console.log("logout successfully");
  // res.clearCookie('token');
  res.render("adminLogin");
};
