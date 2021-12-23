const { create, getLogs } = require("./log.service");

const { decode } = require("jsonwebtoken");

module.exports = {
  create: (req, res) => {
    const body = req;
    let role = body.role;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return true;
    });
    // }
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
        //create log
        const log = `${decoded.result.fullName} a demandé la liste des logs`;
        let body = {
          comment: log,
        };
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
        });
        return res.json({
          success: 1,
          data: results,
        });
      });
    } else {
        //create log
      const log = `${decoded.result.fullName} qui est ${role?.replace(
        "_",
        " "
      )} a demandé la liste des logs`;
      let body = {
        comment: log,
      };
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
      });
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  },
};
