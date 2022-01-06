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

  static async getStockById(productId) {
    console.log(productId)
    const pipeline = [
      {$match: {"productId": ObjectId(productId)}},
      {
        $group: {
          _id: ObjectId(productId),
          totalStockIn: {$sum: "$stockIn"},
          totalStockOut: {$sum: "$stockOut"}
        }
      },
      {
        $addFields: {
          availableStock: {$subtract: ["$totalStockIn", "$totalStockOut"]}
        }
      }
    ];

    let cursor;
    try {
      cursor = await stocks.aggregate(pipeline).toArray()
    } catch (e) {
      console.error(`Unable to find command, ${e}`)
      return {availableStock: []}
    }

    return cursor;
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
        // availableStock: availableStock,
        stock_update_date: d,
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
        // availableStock: availableStock,
        stock_update_date: d,
      }

      return await stocks.insertOne(stockDocument)
    } catch (e) {
      console.error(`Unable to post stock: ${e}`)
      return { error: e }
    }
  }
}