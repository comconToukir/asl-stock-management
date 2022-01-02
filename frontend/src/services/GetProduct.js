import http from "../http-common.js";

class ProductDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(key) {
    return http.get(`product/${key}`);
  }

  find(query, by="name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  createProduct(data) {
    return http.post("/add-product", data);
  }

  updateProduct(data) {
    return http.put("/edit-product", data);
  }

  deleteProduct(key) {
    return http.delete(`delete?key=${key}`);
  }

  getCategories() {
    return http.get(`/categories`);
  }

  getSellers() {
    return http.get(`/seller`)
  }

  updateStock(data) {
    return http.post(`/stock`, data)
  }
}

export default new ProductDataService();