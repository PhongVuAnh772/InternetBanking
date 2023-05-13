const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const getData = async (req, res, next) => {
  const { account_id } = req.body;

  try {
    let account = await db.account_customers.findOne({
      where: { account_id: account_id },
      include: [
        { model: db.customers, as: "customerData" },
        {
          model: db.accounts,
          as: "accountData",
          include: [{ model: db.branches, as: "branchData" }],
        },
      ],
    });

    if (!account) {
      return res.status(200).json({
        success: false,
        message: "Người dùng không tồn tại trong hệ thống",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Lấy dữ liệu người dùng thành công",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getData,
};
