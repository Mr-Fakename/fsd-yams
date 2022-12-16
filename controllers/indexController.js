const Pastry = require("../models/Pastry");
const User = require("../models/User");
const Winnings = require("../models/Winnings");
const mongoose = require("mongoose");
const { winPastries,throwDice, checkCombinations } = require("./utils/play")


const indexView = async (req, res) => {
    const pastries = await Pastry.find()
    let totalPastries = 0;
    for (const pastry of pastries) {
        totalPastries += pastry.quantity
    }

    let winnings;
    if (req.user && req.user.participated) {
        async function f(user_id) {
            const winnings = await Winnings.findOne({user: user_id}).exec();

            let pastries = [];
            for (const document of winnings.pastries) {
                let pastry = await Pastry.findOne({_id: document.toString()}).exec();
                pastries.push(pastry.name)
            }
            return {date: winnings.date, pastries: pastries}
        }

        winnings = await f(req.user._id)
    }

    res.render("index", {
        pastries: pastries,
        total : totalPastries,
        winnings: winnings,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
    });
}

const play = async (req, res) => {
    req.user.participated = true;
    req.user.save();

    const dice = throwDice()
    const results = checkCombinations(dice)
    let winnings;

    if (results) {
        await winPastries(results, req.user).then((value) => {
            winnings = value.map(i => i.name)
        })
    }

    res.json({
        dice: dice,
        results: results,
        winnings: winnings
    });
}

const seedDatabase = async (req, res) => {
    const pastries = [
        {"name": "Profiteroles", "quantity": 10, "order": 1},
        {"name": "Religieuse chocolat", "quantity": 10, "order": 2},
        {"name": "Mille Feuille", "quantity": 5, "order": 3},
        {"name": "Baba au rhum", "quantity": 5, "order": 4},
        {"name": "Paris-Brest", "quantity": 5, "order": 5},
        {"name": "Tarte citron", "quantity": 5, "order": 6},
        {"name": "Éclair café", "quantity": 5, "order": 7},
        {"name": "Forêt Noire", "quantity": 5, "order": 8}
    ]

    const database = process.env.MONGOLAB_URI;
    mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(() => console.log("Connected to the DB"))
        .catch(err => console.log(err));

    (async () => {
        await Pastry.deleteMany({});
        await Pastry.insertMany(pastries)
    })()
        .then(() => {
            console.log("BD populated");
        })
        .catch(err => console.log(err));

    const data = await Pastry.find()

    res.render("index", {pastries: data});
}

module.exports = {
    indexView,
    seedDatabase,
    play
};