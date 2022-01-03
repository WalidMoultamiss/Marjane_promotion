const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  createToken,
  createUsingToken,
  createMarjane,
  getChefRay,
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/", checkToken , createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/createmarjane", checkToken, createMarjane);
router.post("/login", login);
router.post("/createToken",checkToken,createToken)
router.post("/createUsingToken",createUsingToken)
router.get("/chefRay/:id", checkToken, getChefRay);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
