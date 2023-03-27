const express=require("express");
const router=express.Router();


const matchcontroller=require("../controllers/matchcontroller.js");
router.post("/roomcreate",matchcontroller.matchStart);
router.post("/getlastroomId",matchcontroller.getlastroomId);
router.post("/matchStartStatusUpdate",matchcontroller.matchStartStatusUpdate);
// router.get("/getpublicurl",matchcontroller.getprofile);
router.post("/leaderboard",matchcontroller.LeaderBoard);
router.post("/Bet_List_create",matchcontroller.Bet_List_create);
router.post("/Bet_deduction_create",matchcontroller.Bet_deduction_create);
router.post("/config_list_all",matchcontroller.config_list_all);
router.post("/transactionsave",matchcontroller.TransactionSave);
router.post("/transactionoffline_save",matchcontroller.TransactionOfflineRequest);
router.post("/coinlist",matchcontroller.Coin_List);
router.post("/getTransactionHistory",matchcontroller.getTransactionHistory);
router.post("/updateuser",matchcontroller.updateUser);

router.post("/TransOfflineWithdrowRequest",matchcontroller.TransOfflineWithdrowRequest);
// router.post("/leader",matchcontroller.leader);
router.post("/LivematchStartStatusUpdate",matchcontroller.LivematchStartStatusUpdate);
//LivematchStartStatusUpdate
router.get("/getcurrenttime",matchcontroller.getCurrentTime);

module.exports=router;

