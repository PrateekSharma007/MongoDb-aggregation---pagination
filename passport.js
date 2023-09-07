const passport = require('passport');
const User = require("./model/schema");
const db = require("./model/db");
const jwt = require('jsonwebtoken');
const fbconfig = require('./fbconfig');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy ;
require('dotenv').config();
require("./fbconfig")


passport.serializeUser((user, cb) => {
    cb(null, user._id); 
});

passport.deserializeUser(async (id, cb) => {
    try {
        const existingUser = await User.findById(id);
        cb(null, existingUser);
    } catch (error) {
        cb(error, null);
    }
});
passport.use(new GoogleStrategy({
    clientID: process.env.Client_id,
    clientSecret: process.env.Client_secret_key,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'your-secret-key');
           
             request.res.cookie('jwt', token, { httpOnly: true });
            return done(null, existingUser);
        }

        const newUser = new User({
            googleId: profile.id
        });

      
        await newUser.save();

        
        const token = jwt.sign({ userId: newUser._id }, 'your-secret-key');
        
        request.res.cookie('jwt', token, { httpOnly: true });

       
        return done(null, newUser);
    } catch (error) {
        return done(error, false);
    }
}));



passport.use(new FacebookStrategy({
    clientID: fbconfig.facebookAuth.client_id, 
    clientSecret: fbconfig.facebookAuth.clientsecret,
    callbackURL: fbconfig.facebookAuth.callback,  
    enableProof: true  
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const existingUser = await User.findOne({ googleId: profile.id });
        console.log("her1");
        
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'your-secret-key');
            console.log(token + " token");

            
            done(null, existingUser, { token });
        } else {
            console.log("her2");
            const newUser = new User({
                googleId: profile.id
            });

           
            await newUser.save();

           
            const token = jwt.sign({ userId: newUser._id }, 'your-secret-key');
         

           
            done(null, newUser, { token });
        }
    } catch (error) {
        return done(error, false);
    }
}));




