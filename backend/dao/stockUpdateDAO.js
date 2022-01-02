import mongodb from "mongodb"

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

  static async updateStock(key, stockIn, stockOut, availableStock, minute, hour, date, month, year) {
    try {
      const stockDocument = {
        key: key,
        stockIn: stockIn,
        stockOut: stockOut,
        availableStock: availableStock,
        minute: minute,
        hour: hour,
        date: date,
        month: month,
        year: year,
      }

      return await stocks.insertOne(stockDocument)
    } catch (e) {
      console.error(`Unable to post stock: ${e}`)
      return { error: e }
    }
  }
}