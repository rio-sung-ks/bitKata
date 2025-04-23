import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export default function configPassport() {
    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

     async function(accessToken, refreshToken, profile, cb) {
      try {
        let newUser = await User.findOne({ githubId: profile.id })
        console.log("🟢 found newUser : ",newUser)
        if(!newUser){
            newUser = await new User({
            githubId: profile.id,
          }).save();
          return cb(null, newUser);
          
        } else {
          return cb(null, newUser);
        }
      } catch (error) {
        console.error(error);
        return cb(error);
      }
    }
  ));


passport.serializeUser((user, done) => {
  done(null, {id: user.id, name: user.name});
});

passport.deserializeUser(async (id, done) => {
  try {
    // 매개변수 id는 serializeUser의 done의 인자 user.id를 받은 것
    // 매개변수 id는 req.session.passport.user에 저장된 값
    // id 값으로 사용자인증 (서버로 들어오는 매 요청마다 실행)

    const user = await User.findOne({ where: { id } });
    done(null, user); // 여기의 user가 req.user가 됨

  } catch (error) {
    console.error(error);
    done(error);
  }
});
}

// export default function configPassport() {
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     done(null, user);
//   });

//   passport.use(new GitHubStrategy({
//       clientID:     process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL:  "http://localhost:8000/auth/github/callback"
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // findOrCreate 로직…
//       done(null, profile);
//     }
//   ));
// }
