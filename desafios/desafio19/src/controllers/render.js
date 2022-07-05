const formRender = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("form-new-product", { user: req.user.username });
  }
  else {
    res.render("form-new-product");
  }
};

const loginRender = (req, res) => {
  res.render("signin");
};

const signupRender = (req, res) => {
  res.render("signup");
};

const logoutRender = (req, res) => {
  req.logOut();
  res.redirect('/api');
};

const errorLogin = (req, res) => {
  res.render('errorlogin', {message: req.flash('message')})
};

const errorSignup = (req, res) => {
  res.render('errorsignup', {message: req.flash('message')})
};

module.exports = {formRender, loginRender, signupRender, logoutRender, errorLogin, errorSignup};