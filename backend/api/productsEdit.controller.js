import ProductsEditDAO from "../dao/productsEditDAO.js"
import StockUpdateDAO from "../dao/stockUpdateDAO.js"

export default class ProductsEditController {

  static async apiGetStocks(req, res, next) {
    const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.body.key) {
      filters.key = req.body.key
    } else if (req.body.month) {
      filters.month = req.body.month
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
  
  static async apiUpdateStock(req, res, next) {
    try {
      const key = req.body.key;
      const stockIn = req.body.stockIn;
      const stockOut = req.body.stockOut;
      const availableStock = req.body.availableStock;
      const d = new Date();
      const minute = d.getMinutes();
      const hour = d.getHours();
      const date = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();

      const StockResponse = await StockUpdateDAO.updateStock(
        key,
        stockIn,
        stockOut,
        availableStock,
        minute,
        hour,
        date,
        month,
        year,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiPostProduct(req, res, next) {
    try {
      const key = req.body.key
      const name = req.body.name
      const category = req.body.category
      const seller = req.body.seller
      const price = req.body.price
      const stock = req.body.stock
      const remark = req.body.remark
      const img = req.body.img
      // const userInfo = {
      //   name: req.body.name,
      //   _id: req.body.user_id
      // }
      const date = new Date()

      const editResponse = await ProductsEditDAO.addProduct(
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
        // userInfo,
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
    // console.log(req.query);
    try {
      const key = req.query.key
      // const userId = req.body.user_id
      // console.log(reviewId)
      const editResponse = await ProductsEditDAO.deleteProduct(
        key,
        // userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  
}