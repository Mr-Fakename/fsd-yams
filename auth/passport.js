const bcrypt = require("bcryptjs");
const User = require("../models/User");
LocalStrategy = require("passport-local").Strategy;


const checkLogin = passport => {
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, password, done) => {

            User.findOne({email: email})
                .then((user) => {
                    if (!user) {
                        console.log("Utilisateur inconnu");
                        return done();
                    }

                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log("L'email et le mot de passe ne correspondent pas");
                            return done();
                        }
                    });
                })
                .catch((error) => console.log(error));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
};

module.exports = {checkLogin};