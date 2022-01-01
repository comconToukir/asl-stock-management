import mongodb from "mongodb";
// const ObjectId = mongodb.ObjectId

let products

export default class ProductsEditDAO {
  static async injectDB(conn) {
    if (products) {
      return
    }
    try {
      products = await conn.db(process.env.PRODUCTS_NS).collection("products")
      // products = await conn.db("stock-management").collection("products")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addProduct(
    key,
    name,
    category,
    seller,
    price,
    stock,
    remark,
    img,
    // userInfo,
    date,
  ) {
    try {
      const newProduct = {
        key: key,
        // user_id: userInfo._id,
        name: name,
        category: category,
        seller: seller,
        price: price,
        stock: stock,
        remark: remark,
        img: img,
        added_on: date,
      }

      return await products.insertOne(newProduct)
    } catch (e) {
      console.error(`Unable to post product: ${e}`)
      return { error: e}
    }
  }

  static async updateProduct(
    key,
    // user_id,
    name,
    category,
    seller,
    price,
    stock,
    remark,
    img,
    date
    ) {
      try {
        const updateResponse = await products.updateOne(
          // { user_id: user_id, key: key},
          { key: key},
          { $set: {
            name: name,
            category: category,
            seller: seller,
            price: price,
            stock: stock,
            remark: remark,
            img: img,
            modified_on: date,
          }},
        )
        return updateResponse
      } catch (e) {
        console.error(`Unable to update product: ${e}`)
        return { error: e}
      }
    }

  static async deleteProduct(key) {
    try {
      const deleteResponse = await products.deleteOne({
        key: key
        // user_id: user_id,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete product: ${e}`)
      return { error: e }
    }
  }

}