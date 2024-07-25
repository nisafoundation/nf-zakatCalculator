const { connect } = require("mongoose");

if (process.env.NODE_ENV !== " production") {
  require("dotenv").config();
}
module.exports = async () => {
  try {
    await connect(`${process.env.DB_URL}${process.env.DB_NAME}`, {});
    console.log(`Database connected`);
  } catch (error) {
    console.log(error);
  }
};
