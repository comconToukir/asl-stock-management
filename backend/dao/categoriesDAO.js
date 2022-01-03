import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

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
    const categoryDoc = {
      categoryName : categoryName,
      date_added: new Date()
    }
    try {
      const checkCategoryName = categoryName;
        const checkData = await categories.findOne({ categoryName: checkCategoryName });
        if (checkData != null) {
            res.json('Category name already exist');
            return;
        }
      return await categories.insertOne(categoryDoc)
    } catch (e) {
      console.error(`Unable to post categories: ${e}`)
      return { error: e }
    }
  }

  static async editCategory(id, categoryName) {
    try {
      const updateResponse = await categories.updateOne(
        { _id: ObjectId(id)},
        { $set: {
          categoryName: categoryName,
          modified_on: new Date(),
        }}
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update category: ${e}`)
      return { error: e }
    }
  }

  static async deleteCategory(id) {
    try {
      const deleteResponse = await categories.deleteOne({
        _id: ObjectId(id)
      })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete product: ${e}`)
      return { error: e}
    }
  }
  
  static async getCategories() {
    let categoriesList = [];
    try {
      categoriesList = await categories.find().toArray()
      return categoriesList;
    } catch (e) {
      console.error(`Unable to get categories, ${e}`)
      return categoriesList;
    }
  }
  
  
    // static async addCategory(categoryName) {
    //   try {
    //     const categoryDoc = {
    //       categoryName : categoryName,
    //       date_added: new Date()
    //     }
    //     return await categories.insertOne(categoryDoc)
    //   } catch (e) {
    //     console.error(`Unable to post categories: ${e}`)
    //     return { error: e }
    //   }
    // }
}