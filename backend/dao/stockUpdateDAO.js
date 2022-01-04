import mongodb, { ObjectId } from "mongodb"

let stocks

export default class StockUpdateDAO {
  static async injectDB(conn) {
    if (stocks) {
      return
    }
    try {
      stocks = await conn.db(process.env.PRODUCTS_NS).collection("stocks")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async getStocks({
    filters = null,
    page= 0,
    productsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("key" in filters) {
        // query = { "key": { $eq: filters["key"]}}
        query = { $text: { $search: filters["key"] } }
      } else if ("greaterThan" in filters && "lesserThan" in filters) {
        // query = { "month": { $eq: filters["month"]}}
        // query = { $text: { $search: filters["month"] } } // working
        query = {
          stock_update_date: {
            $gte: new Date(filters["greaterThan"]),
            $lt: new Date(filters["lesserThan"])
          }
        }
      }
      // } else if ("greaterThan" in filters && "lesserThan" in filters) {
        // query = { $text: { $search: filters["date"] } } // working
        // query = { "date": { $eq: filters["date"]}}
        // query = {
          // stock_update_date: {
            // $gte: new Date(filters["greaterThan"]),
            // $lt: new Date(filters["lesserThan"])
          // }
        // }
      // }
    } 

    let cursor

    try {
      cursor = await stocks
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { productsList: [], totalNumProducts: 0 }
    }

    const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page)

    try {
      const productsList = await displayCursor.toArray();
      const totalNumProducts = await stocks.countDocuments(query)

      return { productsList, totalNumProducts }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      )
      return { productsList: [], totalNumProducts: 0 }
    }
  }

  static async updateStockIn(productId, stockIn, d) {
    try {
      const stockDocument = {
        productId: ObjectId(productId),
        stockIn: stockIn,
        stock_update_date: d,
        // stockOut: stockOut,
        // availableStock: availableStock,
        // minute: minute,
        // hour: hour,
        // date: date,
        // month: month,
        // year: year,
      }

      return await stocks.insertOne(stockDocument)
    } catch (e) {
      console.error(`Unable to post stock: ${e}`)
      return { error: e }
    }
  }

  static async updateStockOut(productId, stockOut, d) {
    try {
      const stockDocument = {
        productId: ObjectId(productId),
        stockOut: stockOut,
        stock_update_date: d,
        // stockOut: stockOut,
        // availableStock: availableStock,
        // minute: minute,
        // hour: hour,
        // date: date,
        // month: month,
        // year: year,
      }

      return await stocks.insertOne(stockDocument)
    } catch (e) {
      console.error(`Unable to post stock: ${e}`)
      return { error: e }
    }
  }
}