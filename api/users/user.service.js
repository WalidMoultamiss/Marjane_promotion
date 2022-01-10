const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    try {
      if (data.role != "admin_general") {
        pool.query(
          `INSERT INTO users(fullName, email, password, role) VALUES (?, ?, ?, ?)`,
          [data.fullName, data.email, data.password, data.role],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      } else {
        return callBack(null, "Admin General cannot be created");
      }
    } catch (error) {
      return callBack(error);
    }
  },
  createMarjane: (data, callBack) => {
    try {
        pool.query(
          `INSERT INTO marjane(city,admin_id) VALUES (?, ?)`,
          [data.city, data.admin_id],
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
  getUserByUserEmail: async (user, callBack) => {
    pool.query(
      user.role != 'admin_marjane' ? `select * from users where email = ?` :
      `SELECT users.*,marjane.id as marjane_id FROM users,marjane where users.id = marjane.admin_id and users.email = ?`,
      [user.email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserAndMarjaneId: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT users.*,marjane.id as marjane_id FROM users,marjane where users.id = marjane.admin_id and users.email = ?`,
        [email],
        (error, results, fields) => {
          if (error) {
            reject(error);
          }
          resolve(results[0]);
        }
      );
    });
  },

  getUserByUserId: (id) => {
    // return new Promise((resolve, reject) => {
    //   pool.query(
    //     `select id,firstName,lastName,gender,email,number from users where id = ?`,
    //     [id],
    //     (error, results, fields) => {
    //       if (error) {
    //         reject(error);
    //       }
    //       resolve(results[0]);
    //     }
    //   );
    // });
  },
  getChefRay: (id, callBack) => {
    pool.query(
      ` select * from chef_rayon_info where marjane_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(`select * from getusers`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    console.log(data);
    pool.query(
      `delete from users where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
