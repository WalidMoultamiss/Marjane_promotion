const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getChefRay,
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign, decode } = require("jsonwebtoken");
const mailer = require("../../helpers/mailer");

module.exports = {
  createUsingToken: (req, res) => {
    const body = req.body;
    const token = body.token
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
    let html = `<a href="localhost:8080/api/users/createUsingToken/?token=${jsontoken}">localhost:8080/api/users/createUsingToken/?token=${jsontoken}</a>`;
    console.log(html);
    await mailer(html, email);
    return res.json({
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
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });
        return res.json({
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
    getChefRay(id, (err, results) => {
      if (err) {
        console.log(err);
      }
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
