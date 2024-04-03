const express = require("express");
const { loginController, signupController, signoutController, verifyUser, getUserData, verifyAdmin } = require("../Controllers/userController");
const { getProductController, addProductController, deleteProduct } = require("../Controllers/productController");
const router = express.Router();

// Auth Routes
router.route("/login").post(loginController);
router.route("/signup").post(signupController);
router.route("/signout").delete(signoutController);
router.route("/verify").get(verifyUser);
router.route("/user").post(getUserData)


// Product Routes
router.route("/products").get(getProductController);
router.route("/addproducts").post(verifyAdmin, addProductController)
router.route("/deleteproduct/:id").delete(verifyUser, deleteProduct)


module.exports = router;

