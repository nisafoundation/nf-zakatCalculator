const { Schema, model } = require("mongoose");

var PriceSchema = new Schema(
  {
    base: {
      type: String,
      required: true,
    },
    timestamp: { type: Date },
    rates: {
      CAD: Number,
      CADCAD: Number,
      CADXAG: Number,
      CADXAU: Number,
      XAG: Number,
      XAU: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Price", PriceSchema);
