const { getPrices } = require("../controllers/Prices/prices.controller");

const router = require("express").Router();
router.get("/prices", getPrices);

module.exports = router;
