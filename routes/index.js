const { indexView, seedDatabase, play } = require("../controllers/indexController");

const express = require("express");
const router = express.Router();

router.get("", indexView);
router.get("/seed", seedDatabase);
router.get("/play", play);

module.exports = router;
