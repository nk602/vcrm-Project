const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("secure page , need to login");
  res.redirect("/admin");
};
module.exports = protectRoute;
