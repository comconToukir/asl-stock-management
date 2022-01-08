import express from "express";
import ProductsController from "./products.controller.js";
import ProductsEditController from "./productsEdit.controller.js";
import CategoriesController from "./categories.controller.js";
import CompaniesController from "./companies.controller.js";

const router = express.Router();

router.route("/").post(ProductsController.apiGetProducts);
router.route("/product/:key").get(ProductsController.apiGetProductByKey);

router.route("/categories").get(CategoriesController.apiGetCategories);
router.route("/categories").post(CategoriesController.apiPostCategory);
router.route("/categories").put(CategoriesController.apiEditCategory);
router.route("/categories").delete(CategoriesController.apiDeleteCategory);

router.route("/companies").post(CompaniesController.apiPostCompany);
router.route("/companies").get(CompaniesController.apiGetCompanies);
router.route("/companies").put(CompaniesController.apiEditCompany);
router.route("/companies").delete(CompaniesController.apiDeleteCompany);

router.route("/add-product").post(ProductsEditController.apiPostProduct)
router.route("/edit-product").put(ProductsEditController.apiUpdateProduct)
router.route("/delete").delete(ProductsEditController.apiDeleteProduct)
router.route("/stock").post(ProductsEditController.apiUpdateStock)
router.route("/stock-out").post(ProductsEditController.apiUpdateStockOut)
router.route("/stock-report").post(ProductsEditController.apiGetStocks)
router.route("/stock-in").post(ProductsEditController.apiGetStockById)
// router.route("/stock-out").post(ProductsEditController.apiGetStockById)

export default router;