module.exports = app => {
  const config = require("../controllers/config.controller.js");

  var router = require("express").Router();

  // Get config
  router.get("/:id", config.getConfig);

  app.use('/api/config', router);
};
