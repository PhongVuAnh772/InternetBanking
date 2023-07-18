const db = require("../models");
const fs = require("fs");
const axios = require('axios');

const updateOtherBanks = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get('https://api.httzip.com/api/bank/list');
      const banksList = response.data;
      console.log(banksList)
      const imageBuffer = fs.readFileSync(data.other_banks_icons);
      const imageBase64 = imageBuffer.toString('base64');
      
      let check = await db.other_banks.create({
        other_banks_name: data.other_banks_name,
        other_banks_icons: imageBase64,
        banks_list: banksList // Assuming you have a field named "banks_list" in your database schema to store the API response.
      });

      if (!check) {
        resolve({
          success: false,
          message: 'Tạo bản ghi thất bại'
        });
      } else {
        resolve({
          success: true,
          message: 'Tạo bản ghi thành công'
        });
      }
    } catch (err) {
      reject(err);
    }
  });

module.exports = {
  updateOtherBanks,
};
