const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    if(data.type == undefined) data.type = "info";
    pool.query(
      `INSERT INTO logs(comment,type) VALUES (?,?)`,
      [data.comment , data.type],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getLogs: (callBack) => {
    try {
      pool.query(
          `SELECT * FROM logs`, (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      return callBack(error);
    }
  },
};
