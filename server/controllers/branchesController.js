const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const addDataBranches = (req, res) => {
  try {
    db.branches
      .max("id")
      .then((dataIdMax) => {
        const newMaxBranchesId = dataIdMax ? dataIdMax + 1 : 1;
        db.branches
          .create({
            id: newMaxBranchesId,
            Branch_Name: req.body.BranchName,
            Street_Address: req.body.StreetAddress,
            city: req.body.City,
            latitude: req.body.Latitude,
            longitude: req.body.Longitude,
          })
          .then((createdDataBranches) => {
            return res.status(200).json({
              success: true,

              message: "Tạo dữ liệu địa chỉ ngân hàng thành công",
              createdDataBranches: createdDataBranches,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Lỗi khi tạo bảng branches",
              error: error.message,
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Lỗi khi lấy dữ liệu max của Branch_id",
          error: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

module.exports = {
  addDataBranches,
};
