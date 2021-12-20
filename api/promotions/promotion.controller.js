const { create, status } = require("./promotion.service");
const createLog  = require("../logs/log.controller");
const { decode } = require("jsonwebtoken");

module.exports = {
  create: (req, res) => {
    const body = req.body;
    //get id from token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = decode(token);
    const id = decoded.result.id;
    body.user_id = id;

    //calculate fidelity using remise
    let remise = +body.remise;
    body.fidelity = remise * 10;
    body.role = decoded.result.role;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
        //create log
        const log = `${decoded.result.fullName} a crée une promotion`;
        body.comment = log;
        createLog.create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
        });
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  status: (req, res) => {
    const body = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = decode(token);

    // get id from token
    const id = decoded.result.id;
    body.chef_rayon_id = id;

    // get role from token
    const role = decoded.result.role;
    body.role = role;
    try {
      if (role == "chef_rayon") {
        status(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          //create log
            const log = `${decoded.result.fullName} a modifié le statut en ${body.status} de la promotion`;
            body.comment = log;
            createLog.create(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error",
                    });
                }
            });
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      }else{
        const log = `${decoded.result.fullName} qui est ${role} a essayer de modifier le statut en ${body.status} de la promotion`;
        body.comment = log;
        createLog.create(body, (err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
        });
      return res.status(500).json({
        success: 0,
        message: "Not Chef de rayon 😥",
      });
      }
    } catch (err) {
        console.log(err);
    }
  },
};
