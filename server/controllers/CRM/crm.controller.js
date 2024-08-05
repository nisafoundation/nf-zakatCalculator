const create = async (req, res, next) => {
  try {
    console.log(req.body);
    return res.status(200).json({
      message: "created user",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { create };
