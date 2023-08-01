const express = require('express');
const Router = express.Router();



Router.get("/",async(req,res)=>{
    res.send("Dashboard apis is running")
})


module.exports = Router 