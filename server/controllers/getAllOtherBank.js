const db = require("../models/index");
const updateOtherBanksService = require("../services/updateOtherBanksServices");
const axios = require("axios");

const getDataOtherBanks = async (req, res) => {
  try {
    const response = await db.other_banks.findAll();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateOtherBanksFunc = async (req, res) => {
  try {
    const response = await axios.get("https://api.vietqr.io/v2/banks");
    const banksList = response.data.data;

    if (response && response.data) {
      // Loop through banksList and add to SQL table
      for (const bank of banksList) {
        const iconResponse = await axios.get(bank.icon_url, {
          responseType: "arraybuffer",
        });
        const iconBase64 = Buffer.from(iconResponse.data, "binary").toString(
          "base64"
        );

        db.other_banks
          .create({
            other_banks_name: bank.short_name,
            other_banks_icons: iconBase64,
          })
          .then(() => {
            return res.status(200).json({
              success: true,
              message: "Data updated successfully",
            });
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              message: "Error updating data "+err,
            });
          });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getDataOtherBanks,
  updateOtherBanksFunc,
};
