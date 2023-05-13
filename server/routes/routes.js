const express = require("express");
const router = express.Router();

const index = require("../controllers/auth");
const customersController = require("../controllers/customersController");
const getDataController = require("../controllers/getDataController");

router.post("/signup", index.signUp);
router.post("/login", index.signIn);
router.post("/validateEmail", customersController.getData);
// router.get("/private", index.isAuth);
router.get("/getData", getDataController.getDataAccount);

router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

module.exports = router;
