const protectRoute2 = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log("secure page , need to login");
    //  res.redirect("/admin/dashboard");
    // res.send("cant get this Page Without Login")
  };
  module.exports = protectRoute2;
  