const crmController = require("../controllers/CRM/crm.controller");
const { getPrices } = require("../controllers/Prices/prices.controller");
const { authorizer } = require("../middleware/Auth/authorizer");
const { createCRMContactValidator } = require("../utils/validators/validator");

const router = require("express").Router();
router.get("/prices", authorizer, getPrices);

router.get(
  "/get-contacts",
  authorizer,
  // createCRMAccountValidator,
  crmController.getContacts
);
router.post(
  "/create-contact",
  authorizer,
  createCRMContactValidator,
  crmController.createContact
);
module.exports = router;
