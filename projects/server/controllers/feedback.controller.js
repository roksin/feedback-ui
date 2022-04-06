
exports.createFeedback = (req, res) => {
  if (!req.body.feedback) {
    res.status(400).send({
      message: "Feedback can not be empty!"
    });
    return;
  }

  res.send({success: true});
};
