const { getPrices } = require("../controllers/Prices/prices.controller");
const { authorizer } = require("../middleware/Auth/authorizer");

const router = require("express").Router();
router.get("/prices", authorizer, getPrices);

module.exports = router;
