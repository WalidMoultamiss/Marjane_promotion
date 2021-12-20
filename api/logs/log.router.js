const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create , getLogs } = require("./log.controller");

router.post("/", checkToken, create);
router.get("/" , checkToken ,getLogs);

module.exports = router;