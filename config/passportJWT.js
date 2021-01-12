const passport = require('passport');
const User = require('../models/user');
const Notificaion = require('../models/notification');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; // extract jwt from header


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret'; // encryption/decryption key
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


module.exports = passport;