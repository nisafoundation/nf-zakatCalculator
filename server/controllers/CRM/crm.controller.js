const crmService = require("../../services/crm.service");

const getAccounts = async (req, res, next) => {
  try {
    const data = await crmService.getAccounts();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
module.exports = { getAccounts };
