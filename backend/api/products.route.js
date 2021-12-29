import express from "express";
import ProductsController from "./products.controller.js";
import ProductsEditController from "./productsEdit.controller.js";

const router = express.Router();

router.route("/products").get(ProductsController.apiGetProducts);
router.route("/product/:key").get(ProductsController.apiGetProductByKey);
router.route("/categories").get(ProductsController.apiGetProductsByCategory);
router.route("/seller").get(ProductsController.apiGetProductsBySeller);

router
  .route("/edit")
  .post(ProductsEditController.apiPostProduct)
  .put(ProductsEditController.apiUpdateProduct)
  .delete(ProductsEditController.apiDeleteProduct)

export default router;