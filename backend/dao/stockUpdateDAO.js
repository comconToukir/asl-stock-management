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
    // console.log(productId)
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
    let pipeline
    if (filters) {
      if ("key" in filters) {
        // query = { "key": { $eq: filters["key"]}}
        pipeline = { $text: { $search: filters["key"] } }
      } else if ("greaterThan" in filters && "lesserThan" in filters) {
        // query = { "month": { $eq: filters["month"]}}
        // query = { $text: { $search: filters["month"] } } // working
        // query = {
        //   stock_update_date: {
        //     $gte: new Date(filters["greaterThan"]),
        //     $lt: new Date(filters["lesserThan"])
        //   }
        // }

        pipeline = [
          {
            $match: {
                stock_update_date: {
                    $gte: new Date(filters["greaterThan"]),
                    $lt: new Date(filters["lesserThan"])
                }
            }
          },
          {
            $lookup:
            {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productName"
            }
          },
          {
            $replaceRoot: {
                newRoot: { $mergeObjects: [ {$arrayElemAt: ["$productName", 0]}, "$$ROOT"]}
            }
          },
          {
            $project: {
                productName: 0
            }
          },
          {
            $unset: [ "productId", "added_on", "modified_on" ]
          },
          {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
          },
          {
            $replaceRoot: {
                newRoot: { $mergeObjects: [ {$arrayElemAt: ["$category", 0]}, "$$ROOT"]}
            }
          },
          {
            $project: {
                category: 0
            }
          },
          {
            $unset: [ "categoryId", "date_added", "modified_on" ]
          },
          {
            $lookup: // Equality Match
            {
                from: "companies",
                localField: "companyId",
                foreignField: "_id",
                as: "company"
            }
          },
          {
            $replaceRoot: {
                newRoot: { $mergeObjects: [ {$arrayElemAt: ["$company", 0]}, "$$ROOT"]}
            }
          },
          {
            $project: {
                company: 0
            }
          },
          {
            $unset: [ "companyId", "date_added", "modified_on" ]
          },
          {
            $sort: { "stock_update_date": -1 }
          }
        ]
      }
    } 

    let cursor

    try {
      cursor = await stocks.aggregate(pipeline)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { productsList: [], totalNumProducts: 0 }
    }

    // const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page)

    try {
      const productsList = await cursor.toArray();
      const totalNumProducts = await stocks.count(cursor);

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
      }

      return await stocks.insertOne(stockDocument)
    } catch (e) {
      console.error(`Unable to post stock: ${e}`)
      return { error: e }
    }
  }

  static async updateStockOut(inputStockOut) {
    try {
      const stockDocArray = inputStockOut.map((st) => {
        st.productId = ObjectId(st.productId);
        st.stock_update_date = new Date();
        return st;
      })

      return await stocks.insertMany(stockDocArray)
    } catch (e) {
      console.error(`Unable to post stock: ${e}`)
      return { error: e }
    }
  }
}