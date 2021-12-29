import mongodb from "mongodb";
//dao = data access oject
 
let products;

export default class productsDAO {
  static async injectDB(conn) {
    if (products) {
      return
    } 
    try {
      products = await conn.db(process.env.PRODUCTS_NS).collection("products")
    } catch (e) {
      console.error(
        `Unable to establish a connection handle in productsDAO: ${e}`,
      )
    }
  }

  static async getProducts({
    filters = null,
    page = 0,
    productsPerPage = 10,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = {$text: {$search: filters["name"]}}
      } else if ("category" in filters) {
        query = {"category": { $eq: filters["category"]}}
      } else if ("seller" in filters) {
        query = {"seller": {$eq: filters["seller"]}}
      }
    }

    let cursor;

    try {
      cursor = await products
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { productsList: [], totalNumProducts: 0 };
    }

    const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page);

    try {
      const productsList = await displayCursor.toArray();
      const totalNumProducts = await products.countDocuments(query)

      return { productsList, totalNumProducts }
    } catch (e) {
      console.error(
        `Unable to convert to array or problem counting documents, ${e}`
      )
      return { productsList: [], totalNumProducts: 0 }
    }
  }

  static async getProductByKey(key) {
    let product = [];
    try {
      product = await products.findOne({ "key": key })
      return product;
    } catch (e) {
      console.error(`Unable to get product, ${e}`)
      return product;
    }
  }

  static async getProductsByCategory() {
    let categories = [];
    try {
      categories = await products.distinct("category")
      return categories;
    } catch (e) {
      console.error(`Unable to get categories, ${e}`)
      return categories;
    }
  }

  static async getProductsBySeller() {
    let sellers = [];
    try {
      sellers = await products.distinct("seller")
      return sellers;
    } catch (e) {
      console.error(`Unable to get sellers, ${e}`)
      return sellers;
    }
  }
}