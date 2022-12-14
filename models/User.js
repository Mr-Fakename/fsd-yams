const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    participated: {
        type: Boolean,
        default: false
    },
    winnings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Winning"
        }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
