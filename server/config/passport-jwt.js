const passport = require('passport');
const { Strategy, ExtractJWT } = require('passport-jwt');

passport.use(new Strategy({
  secretOrKey: 'top_secret',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
