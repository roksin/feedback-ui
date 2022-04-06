module.exports = app => {
  const feedback = require("../controllers/feedback.controller.js");

  var router = require("express").Router();

  // Create feedback
  router.post("/", feedback.createFeedback);

  app.use('/api/feedback', router);
};
