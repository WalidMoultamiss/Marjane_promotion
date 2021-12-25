var ejs = require("ejs");
var fs = require("fs");
const createLog = require("../logs/log.controller");

const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getChefRay,
  getUserAndMarjaneId,
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign, decode } = require("jsonwebtoken");
const mailer = require("../../helpers/mailer");

module.exports = {
  createUsingToken: (req, res) => {
    const body = req.body;
    const token = body.token;
    //get id from token
    const decoded = decode(token);
    const user = decoded.result;
    const salt = genSaltSync(10);
    user.password = hashSync(body.password, salt);
    create(user, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      //create log
      const log = `${user.fullName} a crée un compte`;
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
  createToken: async (req, res) => {
    const body = req.body;
    let email = body.email;
    const jsontoken = sign({ result: body }, "qwe1234", {
      expiresIn: "10h",
    });
    body.token = jsontoken;
    let html = ejs.render(fs.readFileSync("public/views/email.ejs", "utf8"), {
      data: body,
    });

    await mailer(html, email);
    //create log
    const log = `un token a etait envoyer vers ${body.email}, le token est: ${body.token}`;
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
      message: "ask him to check his email please",
      token: jsontoken,
    });
  },
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
     getUserByUserEmail(body, (err, results) => {
      let resultUser = results;
      if (err) {
        console.log(err);
      }
      console.log(resultUser);
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result =  compareSync(body.password, results.password);
      if (result) {
          resultUser.password = undefined;
          const jsontoken = sign({ result: resultUser }, "qwe1234", {
            expiresIn: "1h",
          });
          //create log
          const log = `${results.fullName} a connecté`;
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
            message: "login successfully",
            token: jsontoken,
          });
        
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },

  getChefRay: (req, res) => {
    const id = req.params.id;
    //decode token
    const token = req.headers.authorization;
    const decoded = decode(token);
    const user = decoded.result;

    getChefRay(id, (err, results) => {
      if (err) {
        console.log(err);
      }
      //create log
      const log = `${user.fullName} a demandé la liste des chefs rayon`;
      const body = {
        comment: log,
      };
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
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      //create log
      const log = `${user.fullName} a demandé la liste des utilisateurs`;
      const body = {
        comment: log,
      };
      createLog.create(body, (err, results) => {
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
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
