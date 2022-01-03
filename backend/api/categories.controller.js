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

  static async apiEditCategory(req, res, next) {
    try {
      const id = req.body.categoryId
      const categoryName = req.body.categoryName

      const updateResponse = await CategoriesDAO.editCategory(
        id,
        categoryName,
      )

      var { error } = updateResponse
      if (error) {
        res.status(400).json({ error })
      }

      if(updateResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update category"
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteCategory(req, res, next) {
    try {
      const id = req.body.categoryId
      // console.log(id)
      const deleteResponse = await CategoriesDAO.deleteCategory(
        id,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}