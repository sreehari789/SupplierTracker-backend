const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const userModel=require('../models/userModel')

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.clientID,
            clientSecret:process.env.clientSecret,
            callbackURL: 'http://localhost:5000/api/google/callback',
        },
        async(accessToken, refreshToken, profile, done)=>{
            try{

        let user= await userModel.findOne({email:profile.emails[0].value})
        if (user) {
            // User already exists return the user
            done(null, user);
          }
          else {
            const newUser = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
            });
              // Save the new user to the database
          await newUser.save();

          done(null, newUser);

        }
    }catch(error){
console.log(error);
    }
        }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id, done) =>{
userModel.findById(id,(err,user)=>{
    done(err,user)
})
})