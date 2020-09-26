const passport = require('passport');
const { Strategy } = require('passport-local');

const { User } = require('../models')

passport.use('signup', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.create({ email, password });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const passwordsMatch = await user.comparePassword(password);
    if (!passwordsMatch) {
      return done(null, false, { message: 'Wrong Password' });
    }
    return done(null, user, { message: 'Login Successful' });
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;