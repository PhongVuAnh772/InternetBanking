const express = require("express");
const router = express.Router();

const index = require("../controllers/auth");

router.post("/signup", index.signup);
router.post("/login", index.login);

router.get("/private", index.isAuth);

router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

module.exports = router;
