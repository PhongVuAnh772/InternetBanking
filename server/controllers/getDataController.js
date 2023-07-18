const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const getDataAccount = async (req, res) => {
  const { account_id } = req.params;

  try {
    let account = await db.account_customers.findOne({
      where: { Account_id: account_id },
      include: [
        { model: db.customers, as: "customerData" },
        {
          model: db.accounts,
          as: "accountData",
          include: [{ model: db.branches, as: "branchData" }],
        },
      ],
      nest: true,
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
        data: account,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getDataBankingTransactions = async (req, res) => {
  const { customer_id } = req.params;

  try {
    let account = await db.account_customers.findOne({
      where: { Customer_id: customer_id },
      include: [
        { model: db.customers, as: "customerData" },
        
      ],
      nest: true,
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
        data: account,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getDataAccount,
  getDataBankingTransactions
};
