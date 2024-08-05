const { validateRoute } = require("express-ajv-middleware");
const email = {
  type: "string",
  nullable: false,
  minLength: 3,
  maxLength: 100,
  format: "email",
};
const name = {
  type: "string",
  nullable: false,
  minLength: 2,
  maxLength: 100,
};
const createCRMAccountValidator = validateRoute({
  body: {
    type: "object",
    required: ["name", "email"],
    additionalProperties: true,
    properties: {
      name,
      email,
    },
  },
});
module.exports = { createCRMAccountValidator };
