const axios = require("axios");
const { Price } = require("../models");
const getLatestPrice = async (pastDate) => {
  const latestPrice = await Price.findOne(
    {
      timestamp: { $gte: pastDate },
    },
    {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  ).sort({ timestamp: -1 });
  return latestPrice;
};

const createNewPrice = async () => {
  const response = await axios.get(
    `https://api.metalpriceapi.com/v1/latest?api_key=${process.env.API_KEY}&base=CAD&currencies=CAD,XAU,XAG `
  );
  const convertedTime = new Date(Number(response.data.timestamp + "000"));
  delete response.data.timestamp;
  const newPrice = await Price.create({
    ...response.data,
    timestamp: convertedTime,
  });
  return await Price.findById(newPrice._id, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
};
module.exports = {
  createNewPrice,
  getLatestPrice,
};
