exports.getConfig = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Company id can not be empty!"
    });
    return;
  }

  // in real time it will set from DB
  const config = {
    id: req.params.id,
    url: './assets/image/',
    image: 'feedback.png',
    modalOpenButtonText: '',
    modalHeaderText: 'SEND YOUR FEEDBACK',
    sendFeedbackButtonText: 'Send Feedback'
  };

  res.send(config);
};
