import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home/Home";
import AddProduct from "./components/AddProduct/AddProduct";
import Product from "./components/Product/Product";
import ProductsList from "./components/ProductsList/ProductsList";
import Category from "./components/Category/Category";
import Company from "./components/Company/Company";
import EditProduct from "./components/EditProduct/EditProduct";

function App() {
  return (
    <div>
        <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/products"}>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/categories"}>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/seller"}>Seller</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/add-product"}>Add product</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route path={"/products"} element={<ProductsList />} />
            <Route 
              path="/add-product"
              element={<AddProduct />}
            />
            <Route 
              path="/product/:key"
              element={<Product />}
            />
            <Route 
              path="/product/:key/edit"
              element={<EditProduct />}
            />
            <Route 
              path="/categories"
              element={<Category />}
            /><Route 
              path="/seller"
              element={<Company />}
            />
          </Routes>
        </div>
    </div>
  );
}

export default App;
