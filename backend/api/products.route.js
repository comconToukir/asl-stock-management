import express from "express";
import ProductsController from "./products.controller.js";
import ProductsEditController from "./productsEdit.controller.js";

const router = express.Router();

router.route("/").get(ProductsController.apiGetProducts);
router.route("/product/:key").get(ProductsController.apiGetProductByKey);
router.route("/categories").get(ProductsController.apiGetProductsByCategory);
router.route("/seller").get(ProductsController.apiGetProductsBySeller);

// router
  // .route("/edit")
  // .route("/product")
  // .post(ProductsEditController.apiPostProduct)
  // .put(ProductsEditController.apiUpdateProduct)
  // .delete(ProductsEditController.apiDeleteProduct)

router.route("/add-product").post(ProductsEditController.apiPostProduct)
router.route("/edit-product").put(ProductsEditController.apiUpdateProduct)
router.route("/delete").delete(ProductsEditController.apiDeleteProduct)
router.route("/stock").post(ProductsEditController.apiUpdateStock)
router.route("/stock").get(ProductsEditController.apiGetStocks)

export default router;