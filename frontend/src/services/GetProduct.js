import http from "../http-common.js";

class ProductDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(key) {
    return http.get(`product/${key}`);
  }

  getProducts(data) {
    console.log(data)
    return http.get('stock-in', data);
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
  
  updateStock(data) {
    return http.post(`/stock`, data);
  }
  
  getStock(data) {
    return http.get(`/stock`, data);
  }
  
  addCategory(data) {
    return http.post(`/categories`, data);
  }
  
  getCategories() {
    return http.get(`/categories`);
  }

  editCategory(data) {
    return http.put(`/categories`, data);
  }

  deleteCategory(data) {
    return http.delete(`/categories`, data);
  }
  
  getCompanies() {
    return http.get(`/companies`)
  }

  addCompany(data) {
    return http.post(`/companies`, data)
  }
  
  editCompany(data) {
    return http.put(`/companies`, data);
  }

  deleteCompany(data) {
    return http.delete(`/companies`, data);
  }
  
  // getStock(query, by="name", page = 0) {
  //   return http.get(`?${by}=${query}&page=${page}`);
  // }
}

export default new ProductDataService();