import ProductsEditDAO from "../dao/productsEditDAO.js"
import StockUpdateDAO from "../dao/stockUpdateDAO.js"

export default class ProductsEditController {

  static async apiGetStocks(req, res, next) {
    console.log(req.body)
    try {
      const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 20
      const page = req.query.page ? parseInt(req.query.page, 10) : 0
      
      let filters = {}
      if (req.body.key) {
        filters.key = req.body.key
      } else if (req.body.greaterThan && req.body.lesserThan) {
        filters.greaterThan = req.body.greaterThan.substr(0, 10)
        filters.lesserThan = req.body.lesserThan.substr(0, 10)
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

    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
    
  static async apiGetStockById(req, res, next) {
    try {
      const productId= req.body.productId;

      const StockResponse = await StockUpdateDAO.getStockById(
        productId,
      )
      res.json(StockResponse)

    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateStock(req, res, next) {
    // if (req.body.stockIn) {
      try {
        const productId = req.body.productId;
        const stockIn = req.body.stockIn;
        const d = new Date();
  
        const StockResponse = await StockUpdateDAO.updateStockIn(
          productId,
          stockIn,
          d,
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    } 
    // else if (req.body.stockOut) {
      // try {
      //   const productId = req.body.productId;
      //   const stockOut = req.body.stockOut;
      //   const d = new Date();
  
      //   const StockResponse = await StockUpdateDAO.updateStockOut(
      //     productId,
      //     stockOut,
      //     d,
      //   )
      //   res.json({ status: "success" })
      // } catch (e) {
      //   res.status(500).json({ error: e.message })
      // }
    // }
  // }

  static async apiUpdateStockOut (req, res, next) {
    console.log(req.body)
    try {
      const inputStockOut = req.body

      const stockResponse = await StockUpdateDAO.updateStockOut(
        inputStockOut
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiPostProduct(req, res, next) {
    try {
      const name = req.body.name
      const categoryId = req.body.categoryId
      const companyId = req.body.companyId
      const date = new Date()

      const editResponse = await ProductsEditDAO.addProduct(
        name,
        categoryId,
        companyId,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateProduct(req, res, next) {
    try {
      const productId = req.body.productId
      const name = req.body.name
      // const categoryId = req.body.categoryId
      // const companyId = req.body.companyId
      const date = new Date()

      const editResponse = await ProductsEditDAO.updateProduct(
        productId,
        name,
        // categoryId,
        // companyId,
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