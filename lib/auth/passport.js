const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const AnonymousStrategy = require('passport-anonymous').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtToken } = require('config');
const { userRepo, internalUserRepo } = require('app/repos');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtToken.secret,
  issuer: jwtToken.issuer,
  audience: jwtToken.audience,
  ignoreExpiration: false,
  algorithms: ['HS256'],
};

const verify = function (payload, done) {
  const match = { _id: payload.uid };
  const selectFields = { id: 1, em: 1, ph: 1, roles: 1, pro: 1, vfy: 1 };

  if (payload.type === 'bo') {
    internalUserRepo.findOne(match, selectFields, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);

      // or you could create a new account
      return done(null, false);
    });
  } else {
    userRepo.findOne(match, selectFields, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);

      // or you could create a new account
      return done(null, false);
    });
  }
};

passport.use(new JwtStrategy(opts, verify));
passport.use(new AnonymousStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  userRepo.findById(id, (err, user) => {
    done(err, user);
  });
});
