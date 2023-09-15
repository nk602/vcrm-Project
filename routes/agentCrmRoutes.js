const express = require("express");
const Router = express.Router();
const crmAgentFormcontroller=require("../controllers/crmController");
Router.post("/Ready/", crmAgentFormcontroller.agent_ready);
Router.post("/agentActivityLog",crmAgentFormcontroller.AgentActivityLog)
module.exports = Router;