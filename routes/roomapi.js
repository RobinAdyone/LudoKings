const express = require("express");
const {
  matchStart,
  getlastroomId,
  matchStartStatusUpdate,
  LeaderBoard,
  Bet_List_create,
  Bet_deduction_create,
  config_list_all,
  TransactionSave,
  TransactionOfflineRequest,
  Coin_List,
  getTransactionHistory,
  updateUser,
  TransOfflineWithdrowRequest,
  LivematchStartStatusUpdate,
  getCurrentTime,
} = require("../controllers/matchcontroller.js");
const router = express.Router();

// matchStart
router.post("/roomcreate", matchStart);
router.post("/getlastroomId", getlastroomId);
router.post("/matchStartStatusUpdate", matchStartStatusUpdate);
// router.get("/getpublicurl",matchcontroller.getprofile);
router.post("/leaderboard", LeaderBoard);
router.post("/Bet_List_create", Bet_List_create);
router.post("/Bet_deduction_create", Bet_deduction_create);
router.post("/config_list_all", config_list_all);
router.post("/transactionsave", TransactionSave);
router.post("/transactionoffline_save", TransactionOfflineRequest);
router.post("/coinlist", Coin_List);
router.post("/getTransactionHistory", getTransactionHistory);
router.post("/updateuser", updateUser);

router.post(
  "/TransOfflineWithdrowRequest",TransOfflineWithdrowRequest);
// router.post("/leader",matchcontroller.leader);
router.post("/LivematchStartStatusUpdate",LivematchStartStatusUpdate);
//LivematchStartStatusUpdate
router.get("/getcurrenttime", getCurrentTime);

module.exports = router;
