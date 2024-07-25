const { getTime } = require("../../utils/helpers/helper");
const {
  createNewPrice,
  getLatestPrice,
} = require("../../services/price.service");
const getPrices = async (req, res, next) => {
  try {
    const pastDate = getTime();
    let prices = await getLatestPrice(pastDate);
    if (prices == null) {
      prices = await createNewPrice();
    }
    if (!prices) {
      return res.status(404).json({
        message: "No Prices Found",
      });
    }
    return res.status(200).json({
      message: "Prices Fetched Successfully",
      data: prices,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { getPrices };
