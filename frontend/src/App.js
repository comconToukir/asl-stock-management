import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import '../src/style.css';
import './App.css'
import Home from "./components/Home/Home";
import AddProduct from "./components/AddProduct/AddProduct";
import Product from "./components/Product/Product";
import EditProduct from "./components/EditProduct/EditProduct";
import Stock from "./components/Stock/Stock";
import StockReport from "./components/StockReport/StockReport";
import StockIn from "./components/StockIn/StockIn";
import StockOut from "./components/StockOut/StockOut";
import AddCategory from "./components/Category/AddCategory/AddCategory";
import AddCompany from "./components/Company/AddCompany/AddCompany";
import CategoryList from "./components/Category/CategoryList/CategoryList";
import EditCategory from "./components/Category/EditCategory/EditCategory";
import CompanyList from "./components/Company/CompanyList/CompanyList";
import EditCompany from "./components/Company/EditCompany/EditCompany";
import ProductSummary from "./components/ProductSummary/ProductSummary";

function App() {
  const [ isNavCollapsed, setIsNavCollapsed ] = useState(true);
  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  }
  
  return (
    <div className="main-div">
        <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">Home</a>
            {/* <button className="navbar-toggler" type="button" onclick={()=>setIsNavCollapsed(!isNavCollapsed)} data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> */}
            <button className="navbar-toggler" type="button" onClick={()=>handleNavCollapse()}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${ isNavCollapsed ? 'collapse': ''} navbar-collapse`} id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" aria-current="page" to={"/items-summary"}>Items Summary</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/categories"}>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/companies"}>Company</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/add-product"}>Add product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/stock-in"}>Stock In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/stock-out"}>Stock Out</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/stock-report"}>Stock Report</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route path="/items-summary" element={<ProductSummary />} />
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
              path="/product/:key/stock-update"
              element={<Stock />}
            />
            <Route 
              path="/categories"
              element={<CategoryList />}
            />
            <Route 
              path="/companies"
              element={<CompanyList />}
            />
            <Route 
              path="/stock-report"
              element={<StockReport />}
            />
            <Route 
              path="/stock-in"
              element={<StockIn />}
            />
            <Route 
              path="/stock-out"
              element={<StockOut />}
            />
            <Route 
              path="/add-category"
              element={<AddCategory />}
            />
            <Route 
              path="/category/:id"
              element={<EditCategory />}
            />
            <Route 
              path="/add-company"
              element={<AddCompany />}
            />
            <Route 
              path="/company/:id"
              element={<EditCompany />}
            />
          </Routes>
        </div>
    </div>
  );
}

export default App;
