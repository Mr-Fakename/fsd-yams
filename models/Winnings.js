const mongoose = require("mongoose");

const WinningSchema = new mongoose.Schema({
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    pastries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pastry"
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

const Winning = mongoose.model("Winning", WinningSchema);

module.exports = Winning;
