const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create , status } = require("./promotion.controller");

router.post("/", checkToken, create);
router.post("/status/", checkToken, status);

module.exports = router;