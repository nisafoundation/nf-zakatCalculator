const crmController = require("../controllers/CRM/crm.controller");
const { getPrices } = require("../controllers/Prices/prices.controller");
const { authorizer } = require("../middleware/Auth/authorizer");
const { createCRMAccountValidator } = require("../utils/validators/validator");

const router = require("express").Router();
router.get("/prices", authorizer, getPrices);
router.post(
  "/create-crm",
  authorizer,
  createCRMAccountValidator,
  crmController.create
);

module.exports = router;
