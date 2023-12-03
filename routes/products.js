const express = require("express");
const router = express.Router();
const { getProducts, getProductsTesting } = require("../controllers/products");

router.route("/").get(getProducts);
router.route("/testing").get(getProductsTesting);

module.exports = router;
