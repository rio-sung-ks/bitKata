import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import User from "../models/User.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export default function configPassport() {
    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

     async function(accessToken, refreshToken, profile, callback) {
      try {
        let newUser = await User.findOne({ githubId: profile.id })
        // console.log("🟢 found newUser : ",newUser)

        if(!newUser){
            newUser = await new User({
            githubId: profile.id,
          }).save();
          return callback(null, newUser);

        } else {
          return callback(null, newUser);
        }
      } catch (error) {
        console.error(error);
        return callback(error);
      }
    }
  ));


passport.serializeUser((user, done) => {
  done(null, user.id);
  // return done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log(id);
    const result = await User.findOne({_id: id});
    done(null, result);
    
  } catch (error) {
    console.error(error);
    done(error);
  }
});
}



