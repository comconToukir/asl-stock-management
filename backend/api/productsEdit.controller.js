import ProductsEditDAO from "../dao/productsEditDAO.js"

export default class ProductsEditController {
  static async apiPostProduct(req, res, next) {
    try {
      const key = req.body.product_key
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
      const key = req.body.product_key
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