const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const registerView = (req, res) => {
    res.render("register", {});
}

const newUser = (req, res) => {
    const {name, email, password, confirm} = req.body;

    if (!name || !email || !password || !confirm) {
        console.log("Veuillez remplir tous les champs");
    }
    if (password !== confirm) {
        console.log("Les mots de passe doivent être identiques");
    } else {
        User.findOne({email: email}).then((user) => {
            if (user) {
                console.log("Cet email est déjà existant");
                res.render("register", {
                    name,
                    email,
                    password,
                    confirm,
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });
                console.log(newUser)

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(res.redirect("/login"))
                            .catch((err) => console.log(err));
                    })
                );
            }
        });
    }
}

const loginView = (req, res) => {
    res.render("login", {});
}

const logUserIn = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Veuillez remplir tous les champs");
        res.render("login", {
            email,
            password,
        });
    } else {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res, next);
    }
};

module.exports = {
    registerView,
    loginView,
    newUser,
    logUserIn
};