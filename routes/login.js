const {registerView, loginView, newUser, logUserIn} = require("../controllers/loginController");

const express = require("express");
const router = express.Router();

router.get("/register", registerView);
router.post("/register", newUser);
router.get("/login", loginView);
router.post("/login", logUserIn)

module.exports = router;
