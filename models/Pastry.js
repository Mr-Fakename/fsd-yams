const mongoose = require("mongoose");

const PastrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    order: {
        type: Number,
        required: true
    },
});

const Pastry = mongoose.model("Pastry", PastrySchema);

module.exports = Pastry;
