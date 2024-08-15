const { validateRoute } = require("express-ajv-middleware");
const email = {
  type: "string",
  nullable: false,
  format: "email",
};
const genericString = {
  type: "string",
  nullable: false,
};
// const createCRMAccountValidator = validateRoute({
//   body: {
//     type: "object",
//     required: ["name", "email"],
//     additionalProperties: true,
//     properties: {
//       name,
//       email,
//     },
//   },
// });
const createCRMContactValidator = validateRoute({
  body: {
    type: "object",
    required: [
      "Name",
      "LName",
      "Date",
      "Email",
      "PhoneNumber",
      "Dropdown",
      "AddressCity",
      "Radio",
      "Radio1",
      "Radio2",
      "Radio3",
      "MultiLine3",
      "MultiLine2",
      "MultiLine1",
      "MultiLine",
    ],
    additionalProperties: true,
    properties: {
      Name: genericString,
      LName: genericString,
      Email: email,
      PhoneNumber: genericString,
      Dropdown: genericString,
      AddressCity: genericString,
      langArabic: genericString,
      langEnglish: genericString,
      langFrench: genericString,
      langSomali: genericString,
      langOther: genericString,
      Radio: genericString,
      Radio1: genericString,
      Radio2: genericString,
      Radio3: genericString,
      MultiLine3: genericString,
      MultiLine1: genericString,
      MultiLine2: genericString,
      MultiLine: genericString,
    },
  },
});
module.exports = { createCRMContactValidator };
