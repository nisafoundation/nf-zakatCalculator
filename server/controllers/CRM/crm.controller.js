const { default: axios } = require("axios");
const crmService = require("../../services/crm.service");

const getContacts = async (req, res, next) => {
  try {
    const data = await crmService.getContacts();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const createContact = async (req, res, next) => {
  try {
    // if (typeof req?.body?.languages == "string") {
    //   req.body[req?.body?.languages] = true;
    // }
    // const { langArabic, langEnglish, langFrench, langSomali, langOther } =
    //   req.body;

    // if (!(langArabic || langEnglish || langFrench || langSomali || langOther)) {
    //   return res.status(400).json({
    //     error: "BadRequest",
    //     message:
    //       "Request body validation failed: data should have any of language property",
    //   });
    // }
    try {
      await axios.request({
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.PROXY_BASE}api/create-contact`,
        headers: {
          Authorization:
            req?.headers?.authorization || req?.headers?.authorization,
          "Content-Type": "application/json",
        },
        data: {
          ...req.body,
        },
      });
    } catch (error) {
      console.log(error?.response);
    }
    return res.status(201).json({ message: "Apply Form Submitted" });
  } catch (error) {
    // console.log(error);
    console.log(error?.response?.data);
    next(error);
  }
};
module.exports = { getContacts, createContact };
