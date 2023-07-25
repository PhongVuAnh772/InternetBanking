const express = require("express");
const router = express.Router();
const index = require("../controllers/auth");
const customersController = require("../controllers/customersController");
const getDataController = require("../controllers/getDataController");
const getDataBanksController = require("../controllers/getAllOtherBank");
const checkSTKBanksController = require("../controllers/accountController");
const createBucketggCloudController = require("../controllers/ggCloudController");
const bankingController = require("../controllers/BankingController");
const loanController = require("../controllers/loanController");
const updateController = require("../controllers/updateController");
const forgetPasswordController = require("../controllers/forgetPassword");

router.post("/signup", index.signUp);
router.post("/login", index.signIn);
router.post("/private", index.isAuth);
router.post("/validateEmail", customersController.getData);
router.get("/getData/:account_id", getDataController.getDataAccount);
router.get("/getDataOtherBanks", getDataBanksController.getDataOtherBanks);
router.get(
  "/updateDataOtherBanks",
  getDataBanksController.updateOtherBanksFunc
);
router.post("/checkSTKBanks", checkSTKBanksController.checkSTKBank);
router.get("/createBucketggCloud", createBucketggCloudController.createBucket);
router.post(
  "/upImageToGlobal",
  createBucketggCloudController.uploadImageToBucket
);
router.post(
  "/upImageBackToGlobal",
  createBucketggCloudController.uploadImageBackToBucket
);
router.post("/updateCreditCard", bankingController.addCreditCard);
router.post("/addLoan", loanController.addLoans);
router.post("/getLoan", loanController.getLoansByCMND);
router.post("/loanRepayment", loanController.loanRepayment);
router.post("/getOTPCode", customersController.getOTPAccount);
router.put("/changeLocked", updateController.changeLocked);
router.put("/changePhysicalCards", updateController.changePhysicalCards);
router.put("/changeDataPINCode", updateController.changeDataPINCode);
router.post("/forgetPassword", forgetPasswordController.forgetPassword);
router.post("/changePassword", forgetPasswordController.changePassWord);
router.post("/createSendingMoney", bankingController.createSendingMoney);
router.post("/createINickUser", customersController.createINickUser); //
router.post("/createBank", bankingController.createBank); //
router.post("/createCreditCardTransaction",bankingController.createCreditCardTransaction);
router.post("/updateMoneySTK",bankingController.updateMoneySTK);




router.use("/", (req, res, next) => {
  res.status(404).json({ error: "router không tồn tại" });
});

module.exports = router;
