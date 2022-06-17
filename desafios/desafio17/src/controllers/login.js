const loginController = (req, res) => {
  req.session.username = req.body.username;
  res.redirect('/api')
};
module.exports = loginController;