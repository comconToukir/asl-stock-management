import ProductsEditDAO from "../dao/productsEditDAO.js"
import StockUpdateDAO from "../dao/stockUpdateDAO.js"

export default class ProductsEditController {

  static async apiGetStocks(req, res, next) {
    const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.body.key) {
      filters.key = req.body.key
    } else if (req.body.greaterThan && req.body.lesserThan) {
      filters.greaterThan = req.body.greaterThan
      filters.lesserThan = req.body.lesserThan
    }

    const { productsList, totalNumProducts } = await StockUpdateDAO.getStocks({
      filters,
      page,
      productsPerPage,
    })

    let response = {
      products: productsList,
      page: page,
      filters: filters,
      entries_per_page: productsPerPage,
      total_results: totalNumProducts,
    }
    res.json(response)
  }
  
  // static async apiUpdateStockIn(req, res, next) {
  //   try {
  //     const productId = req.body.productId;
  //     const stockIn = req.body.stockIn;
  //     // const stockOut = req.body.stockOut;
  //     // const availableStock = req.body.availableStock;
  //     const d = new Date();

  //     const StockResponse = await StockUpdateDAO.updateStock(
  //       productId,
  //       stockIn,
  //       // stockOut,
  //       // availableStock,
  //       d,
  //     )
  //     res.json({ status: "success" })
  //   } catch (e) {
  //     res.status(500).json({ error: e.message })
  //   }
  // }

  static async apiUpdateStock(req, res, next) {
    if (req.body.stockIn) {
      try {
        const productId = req.body.productId;
        const stockIn = req.body.stockIn;
        // const stockOut = req.body.stockOut;
        // const availableStock = req.body.availableStock;
        const d = new Date();
  
        const StockResponse = await StockUpdateDAO.updateStockIn(
          productId,
          stockIn,
          // stockOut,
          // availableStock,
          d,
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    } else if (req.body.stockOut) {
      try {
        const productId = req.body.productId;
        const stockOut = req.body.stockOut;
        // const stockOut = req.body.stockOut;
        // const availableStock = req.body.availableStock;
        const d = new Date();
  
        const StockResponse = await StockUpdateDAO.updateStockOut(
          productId,
          stockOut,
          // stockOut,
          // availableStock,
          d,
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }
  }

  static async apiPostProduct(req, res, next) {
    try {
      // const key = req.body.key
      const name = req.body.name
      const categoryId = req.body.categoryId
      const companyId = req.body.companyId
      // const price = req.body.price
      // const stock = req.body.stock
      // const remark = req.body.remark
      // const img = req.body.img
      const date = new Date()

      const editResponse = await ProductsEditDAO.addProduct(
        // key,
        name,
        categoryId,
        companyId,
        // price,
        // stock,
        // remark,
        // img,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateProduct(req, res, next) {
    try {
      const key = req.body.key
      const name = req.body.name
      const category = req.body.category
      const seller = req.body.seller
      const price = req.body.price
      const stock = req.body.stock
      const remark = req.body.remark
      const img = req.body.img
      const date = new Date()

      const editResponse = await ProductsEditDAO.updateProduct(
        key,
        // req.body.user_id,
        name,
        category,
        seller,
        price,
        stock,
        remark,
        img,
        date,
      )

      var { error } = editResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (editResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  
  static async apiDeleteProduct(req, res, next) {
    try {
      const key = req.query.key
      const editResponse = await ProductsEditDAO.deleteProduct(
        key,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  
}