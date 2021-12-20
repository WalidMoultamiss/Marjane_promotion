const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  getChefRay,
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/", checkToken , createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.get("/chefRay/:id", checkToken, getChefRay);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
