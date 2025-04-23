import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import User from "../models/User.js";

export default function configPassport() {

  passport.serializeUser(/* */);
  passport.deserializeUser(/* */);

  // passport.serializeUser((user, done) => {
  //   // Strategy 성공 시 호출됨
  //   // 여기의 user.id가 req.session.passport.user에 저장
  //   done(null, user.id); // 여기의 user.id가 deserializeUser의 첫 번째 매개변수로 이동
  // });

  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     // 매개변수 id는 serializeUser의 done의 인자 user.id를 받은 것
  //     // 매개변수 id는 req.session.passport.user에 저장된 값
  //     // id 값으로 사용자인증 (서버로 들어오는 매 요청마다 실행)
  //     const user = await User.findOne({ where: { id } });
  //     done(null, user); // 여기의 user가 req.user가 됨
  //   } catch (error) {
  //     console.error(error);
  //     done(error);
  //   }
  // })

  // passport.use(/* */);
  // passport.use(new GitHubStrategy({
  //     clientID: GITHUB_CLIENT_ID,
  //     clientSecret: GITHUB_SECRET_ID,
  //     callbackURL: "http://localhost:8000/auth/github/callback"
  //   },
  //   // function(accessToken, refreshToken, profile, cb) {
  //   function(accessToken, refreshToken, profile, cb) {
  //     User.findOrCreate({ githubId: "janei" }, function (err, user) {
  //       return cb(err, user);
  //     });
  //   }
  // ));

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
