import CategoriesDAO from "../dao/categoriesDAO.js";

export default class CategoriesController {
  static async apiPostCategory(req, res, next) {
    try {
      const categoryName = req.body.categoryName

      const categoryAddResponse = await CategoriesDAO.addCategory(
        categoryName,
      )
      res.json({ success: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetCategories(req, res, next) {
    try {
      let categories = await CategoriesDAO.getCategories();
      res.json(categories)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}