const db = require("../models");
const service = require("../../controllers/common/commonservices.js");
const Admin = db.admin;
// db.tutorials = require("./tutorial.model.js")(mongoose);
// const {userModel}=require("../../model/user.js");
const userModel = db.userModels;
const gameModeModel = db.gameModeModels;
const betdeductionModel = db.betdeductionModels;
const AdminUser = db.AdminUsers;
exports.login = (req, res) => {
  res.render("admin/index", { layout: "" });
};
exports.dashboard = async (req, res) => {
  try {
    if (req.session.userId === undefined) {
      res.render("admin/index", { layout: "" });
    } else {
      const data = await userModel.find();
      res.render("admin/dashboard", { layout: "", datatutorials: data });
    }
  } catch (err) {
    res.status(500).send({
      status: "404",
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
exports.login_post = (req, res) => {
  AdminUser.findOne({ email: req.body.email }, function (err, data) {
    if (data) {
      if (data.password == req.body.password) {
        req.session.userId = data.email;
        console.log(req.session);
        res.send({ Success: "Success!" });
      } else {
        res.send({ Success: "Wrong password!" });
      }
    } else {
      res.send({ Success: "This Email Is not regestered!" });
    }
  });
};
exports.register_post = (req, res) => {
  var personInfo = req.body;
  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.send({ Success: "all Filled is required" });
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      AdminUser.findOne({ email: personInfo.email }, function (err, data) {
        if (!data) {
          var c;
          AdminUser.findOne({}, function (err, data) {
            if (data) {
              console.log("if");
              c = data.unique_id + 1;
            } else {
              c = 1;
            }

            var newPerson = new AdminUser({
              unique_id: c,
              email: personInfo.email,
              username: personInfo.username,
              password: personInfo.password,
              passwordConf: personInfo.passwordConf,
            });

            newPerson.save(function (err, Person) {
              if (err) console.log(err);
              else console.log("Success");
            });
          })
            .sort({ _id: -1 })
            .limit(1);
          res.send({ Success: "You are regestered,You can login now." });
        } else {
          res.send({ Success: "Email is already used." });
        }
      });
    } else {
      res.send({ Success: "password is not matched" });
    }
  }
};

exports.logout = (req, res) => {
  console.log("logout");
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
};

//User list

exports.manage_user = async (req, res) => {
  try {
    if (req.session.userId === undefined) {
      res.render("admin/index", { layout: "" });
    } else {
      const data = await userModel.find();
      res.render("admin/manage_user", { layout: "", users: data });
    }
  } catch (err) {
    res.status(500).send({
      status: "404",
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

//game_mode list

exports.game_mode = async (req, res) => {
  try {
    if (req.session.userId === undefined) {
      res.render("admin/index", { layout: "" });
    } else {
      const data = await gameModeModel.find();
      res.render("admin/game_mode", { layout: "", gamemode: data });
    }
  } catch (err) {
    res.status(500).send({
      status: "404",
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.bet_list = async (req, res) => {
  try {
    if (req.session.userId === undefined) {
      res.render("admin/index", { layout: "" });
    } else {
      const data = await betdeductionModel.find();
      console.log(data);
      res.render("admin/manage_bet_deduction", { layout: "", gamemode: data });
    }
  } catch (err) {
    res.status(500).send({
      status: "404",
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
exports.create_bet_list = async (req, res) => {
  try {
    if (req.session.userId === undefined) {
      res.render("admin/index", { layout: "" });
    } else {
      const data = await gameModeModel.find();
      console.log(data);
      res.render("admin/create_bet_list", { layout: "", gamemode: data });
    }
  } catch (err) {
    res.status(500).send({
      status: "404",
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.Bet_deduction_create = async (req, res) => {
  try {
    const timestamp = Date.now();
    const { status, amount, game_mode_id, rank_winning_amount } = req.body;
    const rank1 = rank_winning_amount;
    console.log(rank1);
    const rank_win_amount = rank_winning_amount;
    var arr = [];
    var obj = {};
    for (let i = 0; i < rank1.length; i++) {
      obj[[i + 1]] = rank_win_amount[i];
    }

    let count = await service(betdeductionModel);
    const doc = await betdeductionModel({
      bet_code: game_mode_id,
      status: 1,
      amount,
      rank_winning_amount: obj,
      timestamp: timestamp,
      unique_id: count + 1,
    });
    await doc.save();

    return res.json({ code: 200, sms: "Bet Added Successfully", status: true });
  } catch (err) {
    return res.json({ code: 404, sms: err.message, status: false });
  }
};

//change password
exports.change_password = (req, res) => {
  res.render("admin/changepassword", { layout: "" });
};

exports.change_passwordpost = async (req, res) => {
  try {
    const { oldpass, newpass, cpass } = req.body;
    if (!oldpass || !newpass || !cpass) {
      res.send({ Success: "all Filled is required" });
    } else if (newpass == cpass) {
      const adminuser = await AdminUser.findOneAndUpdate(
        { password: oldpass },
        { $set: { password: newpass } },
        { new: true }
      );
      if (adminuser == null) {
        res.send({ Success: "Old password not correct" });
      } else {
        res.send({ Success: "password updated." });
      }
    } else {
      res.send({ Success: "password and confpassword must be same" });
    }
  } catch (err) {
    console.log(err.message);
  }
};
