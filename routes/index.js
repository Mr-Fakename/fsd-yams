const { indexView, seedDatabase } = require("../controllers/indexController");

const express = require("express");
const router = express.Router();

router.get("", indexView);
router.get("/seed", seedDatabase);
module.exports = router;
