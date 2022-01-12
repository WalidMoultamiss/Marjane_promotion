const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create , status ,getPromotions , getproducts ,createProduct } = require("./promotion.controller");

router.post("/", checkToken, create);
router.post("/status/", checkToken, status);
router.get("/products/", checkToken, getproducts);
router.post("/products/", checkToken, createProduct);
router.get("/", checkToken, getPromotions)

module.exports = router;