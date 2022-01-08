import React, { useState, useEffect } from "react";
import ProductDataService from "../../services/GetProduct";
import { Link } from "react-router-dom";

const StockOut = () => {
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ productId, setProductId ] = useState("");
  const [ productName, setProductName ] = useState("");
  const [ submitted, setSubmitted ] = useState(false);
  const [ inputStockOut, setInputStockOut ] = useState(0);
  const [ availableStock, setAvailableStock ] = useState(0);
  const [ inputProduct, setInputProduct ] = useState({});
  const [ stockOutList, setStockOutList ] = useState([]);
  const [ activeIndex, setActiveIndex ] = useState(null);
  const [ stockEditAmount, setStockEditAmount ] = useState(0);
  
  useEffect(() => {
    retrieveCompanies();
  }, []);

  useEffect(() => {
    setInputProduct({
      productName: productName,
      productId: productId,
      stockOut: inputStockOut,
      availableStock: availableStock.availableStock
    });
  }, [productId, inputStockOut, productName, availableStock]);
  
  const retrieveCompanies = () => {
    ProductDataService.getCompanies()
      .then((response) => {
        // console.log(response.data);
        setCompanies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeCompany = (e) => {
    console.log(e.target.value)
    const newCompany = e.target.value;
    setCompanyId(newCompany);
    ProductDataService.getProducts({companyId: newCompany})
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
      })
      .catch((e)=> {
        console.log(e);
      })
  };

  const onChangeProduct = (e) => {
    const newProduct = e.target.value;
    setProductId(newProduct);
    setProductName(e.target.selectedOptions[0].text);
    ProductDataService.getStockById({productId: e.target.value})
      .then((response) => {
      // console.log(response)
      setAvailableStock(response.data[0])
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const addToList = () => {
    // console.log(inputProduct)
    if ( inputProduct.stockOut > availableStock.availableStock || inputProduct.stockOut <= 0) {
      alert("Invalid stock out quantity");
      return
    } else if ( stockOutList.some((pd) => pd.productId === inputProduct.productId) ) {
      alert("Item already exists in list");
    } else {
      setStockOutList([...stockOutList, inputProduct]);
      // console.log(stockOutList);
    }
  }

  /////////////////////////////
  const productStockOut = () => {
    console.log(stockOutList);
    const newList = stockOutList.map((pd) => {
      delete pd.availableStock;
      delete pd.productName;
      return pd;
    })
    ProductDataService.updateStockOut(newList)
      .then((response) => {
        setSubmitted(!submitted);
      })
      .catch((e)=> {
        console.log(e);
      })
  }

  const getStockFromInput = (e) => {
    setInputStockOut(parseInt(e.target.value));
  }

  const editStockInput = (e) => {
    setStockEditAmount(parseInt(e.target.value));
  }

  const insertInputInList = (i) => {
    console.log(stockEditAmount);
    const newList = stockOutList.map((item, j) => {
      if (j === i) {
        if (stockEditAmount > item.availableStock || stockEditAmount <= 0) {
          alert("Invalid stock out amount");
          return item;
        } else {
          item.stockOut = stockEditAmount;
          return item;
        }
      } else {
        return item;
      }
    })
    setStockOutList(newList);
    // console.log(stockOutList);
  }

  const refreshStock = () => {
    ProductDataService.getStockById({productId: productId})
      .then((response) => {
      console.log(response)
      setAvailableStock(response.data[0])
    })
    .catch((e) => {
      console.log(e);
    })
    setStockOutList([]);
    setSubmitted(!submitted);
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link 
            to={"/stock-out"} 
            >
            <button
              onClick={()=>refreshStock()}
              className="btn btn-success"
            >
              Back to Page
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="input-group d-flex flex-column pb-1">
            <div className="row g-1">
              <div className="col-md-3">
                <strong>Company: </strong>
              </div>
              <div className="col-md-9">
                <select
                  className="form-select mb-3"
                  value={companyId}
                  onChange={onChangeCompany}
                  aria-label="Company select"
                  required
                  >
                  <option value="">Select Company</option>
                  {companies.map((com) => (
                    <option value={com._id}>{com.companyName}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row g-1">
              <div className="col-md-3">
                <strong>Item: </strong>
              </div>
              <div className="col-md-9">
                <select
                  className="form-select mb-3"
                  value={productId}
                  onChange={onChangeProduct}
                  aria-label="Company select"
                  required
                  >
                  <option value="">Select Product</option>
                  {products.map((pd) => (
                    <option value={pd._id}>{pd.name}</option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <div className="row mb-3">
                <span className="col-12" id="basic-addon1">Name: {productName}</span>
              </div>
              <div className="row mb-3">
                <span className="col-12" id="basic-addon2">Available Stock: {availableStock.availableStock}</span>
              </div>
              <div className="row">
                <div className="col-8">
                  <input 
                    type="number" 
                    className="form-control w-100" 
                    min="1"
                    required
                    onChange={getStockFromInput}
                    placeholder="Stock Out Quantity" 
                    aria-label="Stock Out Quantity" 
                    aria-describedby="basic-addon1"></input>
                </div>
                <div className="col-4">
                  <button
                      className="btn btn-outline-secondary w-100"
                      onClick={addToList}
                      >
                      Add to list
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Stock Out</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody>
                {stockOutList.map((pd, i) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{i+1}</th>
                        <td>{pd.productName}</td>
                        <td>{pd.stockOut}</td>
                        <td>
                          {
                            activeIndex === i+1 ? 
                            <div 
                            className="d-flex"
                            >
                              <input 
                              type="number"
                              className="form-control w-100 me-2"
                              onChange={(e)=>editStockInput(e)}
                              />
                              <button
                                // id={"btn"+(i+1)}
                                className="btn btn-sm btn-outline-secondary secondary"
                                onClick={()=>{
                                  if (activeIndex) {
                                    setActiveIndex(null);
                                    insertInputInList(i);
                                  }
                                }}
                                >
                                Done
                              </button>
                            </div>
                            :
                            <button
                              className="btn btn-sm btn-outline-secondary secondary ms-auto"
                              onClick={()=>{
                                if (!activeIndex) {
                                  setActiveIndex(i+1);
                                }
                              }}
                              >
                              Edit
                            </button>
                          }
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="w-100">
            <button
              className="btn btn-outline-secondary mx-auto"
              onClick={()=>productStockOut()}
            >
              Confirm Stock Out List
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StockOut;
