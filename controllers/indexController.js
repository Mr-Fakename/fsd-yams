const indexView = (req, res) => {
    res.render("index", {});
}

const seedDatabase = (req, res) => {
    const Pastry = require("../models/Pastry")
    const mongoose = require("mongoose")

    const pastries = [
        { "name" : "Profiteroles" , "quantity" : 5, "order" : 1 },
        { "name" : "Religieuse chocolat", "quantity" : 5,  "order" : 2},
        { "name" : "Mille Feuille", "quantity" : 5, "order" : 3},
        { "name" : "Baba au rhum", "quantity" : 5, "order" : 4},
        { "name" : "Paris-Brest", "quantity" : 5, "order" : 5},
        { "name" : "Tarte citron", "quantity" : 5, "order" : 6},
        { "name" : "Éclair café", "quantity" : 5, "order" : 7},
        { "name" : "Forêt Noire", "quantity" : 5, "order" : 8}
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
            mongoose.connection.close();
        })
        .catch(err => console.log(err));

    res.render("index", {});
}

module.exports = {
    indexView,
    seedDatabase
};