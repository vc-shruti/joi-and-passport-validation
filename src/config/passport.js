import { Strategy, ExtractJwt } from "passport-jwt";
import Users from "../app/models/users.model";

import config from "./config";

module.exports = passport => {
  try {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.JWTSecret;
    
    passport.use('jwt', new Strategy(opts, async(jwt_payload, done) => {
          await Users.findById(jwt_payload.userId, (err, user) => {
              if (err) {
                  console.log('err', err)
                  return done(err, false);
              }
              if (user) {
                  return done(null, user);
              } else {
                  return done(null, false);
              }
          });
      })  
    );
  } catch (err) {
      console.log('Error...........', err);
  }
};
