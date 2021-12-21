const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create , status ,getPromotions } = require("./promotion.controller");

router.post("/", checkToken, create);
router.post("/status/", checkToken, status);
router.get("/", checkToken, getPromotions)

module.exports = router;