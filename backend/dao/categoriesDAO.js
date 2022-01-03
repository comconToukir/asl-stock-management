import mongodb from "mongodb";

let categories;

export default class CategoriesDAO {
  static async injectDB(conn) {
    if (categories) {
      return
    }
    try {
      categories = await conn.db(process.env.PRODUCTS_NS).collection("categories")
    }
    catch (e) {
      console.error(
        `Unable to establish a connection handle in categoriesDAO: ${e}`,
      )
    }
  }

  static async addCategory(categoryName) {
    try {
      const categoryDoc = {
        categoryName : categoryName,
        date_added: new Date()
      }
      return await categories.insertOne(categoryDoc)
    } catch (e) {
      console.error(`Unable to post categories: ${e}`)
      return { error: e }
    }
  }

  static async getCategories() {
    let categoriesList = [];
    try {
      categoriesList = await categories.distinct("categoryName")
      return categoriesList;
    } catch (e) {
      console.error(`Unable to get categories, ${e}`)
      return categoriesList;
    }
  }

  // static async getCategoryById(id) {}
}