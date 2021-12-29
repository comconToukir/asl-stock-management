import ProductsDAO from "../dao/productsDAO.js";

export default class ProductsController {
  static async apiGetProducts(req, res, next) {
    const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {};
    if (req.query.category) {
      filters.category = req.query.category
    } else if (req.query.seller) {
      filters.seller = req.query.seller
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { productsList, totalNumProducts } = await ProductsDAO.getProducts({
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
    res.json(response);
  }

  static async apiGetProductByKey(req, res, next) {
    try {
      let key = req.params.key || {};
      let product = await ProductsDAO.getProductByKey(key)
      if (!product) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(product)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetProductsByCategory(req, res, next) {
    try {
      let categories = await ProductsDAO.getProductsByCategory();
      res.json(categories)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetProductsBySeller(req, res, next) {
    try {
      let sellers = await ProductsDAO.getProductsBySeller();
      res.json(sellers)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}