const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO promotion(product_id,user_id,remise,fidelity) VALUES (?, ?, ?, ?)`,
      [data.product_id, data.user_id, data.remise, data.fidelity],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  status: (data, callBack) => {
    pool.query(
      `INSERT INTO status_promotion(chef_rayon_id, promotion_id, status, comment) VALUES (?, ?, ?, ?)`,
      [data.chef_rayon_id, data.promotion_id, data.status, data.comment],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPromotions: (callBack) => {
    try {
      pool.query(
        `SELECT * FROM promotion`, (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      return callBack(error);
    }
  },
  getPromotionToday: (callBack) => {
    try {
      pool.query(
        `SELECT * FROM promotion_info WHERE DATE(created_at) = CURDATE()`,
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    } catch (error) {
      return callBack(error);
    }
  },
  
};
