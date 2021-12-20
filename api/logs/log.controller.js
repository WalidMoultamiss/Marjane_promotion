const { create, getLogs } = require("./log.service");

const { decode } = require("jsonwebtoken");

module.exports = {
  create: (req, res) => {
    const body = req;
    console.log(body);
    let role = body.role;

    if (
      role == "chef_rayon" ||
      role == "admin_general" ||
      role == "admin_marjane"
    ) {
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        return true
      });
    }
  },
  getLogs: (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = decode(token);
    const role = decoded.result.role;
    if (role == "admin_general") {
      getLogs((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
    }else{
        return res.json({
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
    }
  },
};
