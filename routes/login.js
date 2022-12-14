const {registerView, loginView, newUser } = require("../controllers/loginController");

const express = require("express");
const router = express.Router();

router.get("/register", registerView);
router.post("/register", newUser);
router.get("/login", loginView);

module.exports = router;
