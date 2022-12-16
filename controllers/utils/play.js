const Pastry = require("../../models/Pastry");
const User = require("../../models/User");
const Winnings = require("../../models/Winnings");

async function winPastries(results, user) {
    let pastriesWonQuantity;

    if (results === "Paire") pastriesWonQuantity = 1;
    else if (results === "Carré") pastriesWonQuantity = 2;
    else if (results === "Yams") pastriesWonQuantity = 3;

    return new Promise((resolve, reject) => {
            Pastry.where("quantity").gt(0).exec(function (err, data) {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                else if (data.length === 0) {
                    resolve("Indisponible")
                } else {
                    let pastriesWon = [];

                    for (let i = 0; i < pastriesWonQuantity; i++) {
                        const x = Math.floor(Math.random() * data.length);
                        pastriesWon.push(data[x])

                        const filter = {_id: data[x]._id};
                        const update = { quantity: data[x].quantity - 1 };
                        Pastry.findOneAndUpdate(filter, update, function(err,obj) { console.log(obj) });
                    }
                    if (data.length < pastriesWonQuantity) {
                        console.log("Vous avez gagné les dernières pâtisseries !")
                        for (const pastry of data) {
                            pastriesWon.push(pastry)
                        }
                    }
                    User.findOne({_id: user._id}).then((user) => {
                        if (user) {
                            const newWinnings = new Winnings({
                                user: user._id,
                            });
                            pastriesWon.forEach(pastry => {
                                newWinnings.pastries.push(pastry._id)
                            })
                            newWinnings.save()
                                .then(
                                    resolve(pastriesWon)
                                )
                                .catch((err) => console.log(err)
                                );
                        }
                    });
                }
            })
        }
    )
}

function throwDice() {
    const dice = []

    // Get 5 random numbers between 1 and 6
    for (let i = 0; i < 5; i++) {
        dice.push(1 + Math.floor(Math.random() * 6));
    }

    return dice
}

function checkCombinations(dice) {
    function count(c, a) {
        c[a] = (c[a] || 0) + 1
        return c
    }

    let duplicates = Object.values(dice).reduce(count, {})
    duplicates = Object.values(duplicates).reduce(count, {})

    if (duplicates[5]) {
        console.log("Yams")
        return "Yams"
    } else if (duplicates[4]) {
        console.log("Carré")
        return "Carré"
    } else if (duplicates[2] === 2 || duplicates[2] && duplicates[3]) {
        console.log("Paire")
        return "Paire"
    }
}

module.exports = {
    winPastries,
    throwDice,
    checkCombinations
};