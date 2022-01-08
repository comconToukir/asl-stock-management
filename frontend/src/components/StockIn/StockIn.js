import React, { useState, useEffect } from "react";
import ProductDataService from "../../services/GetProduct";
import { Link } from "react-router-dom";

const StockIn = () => {
  // const location = useLocation();
  // const { key, name, category, seller, price, stock  } = location.state;
  // const [changedName, setChangedName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ productId, setProductId ] = useState("");
  const [ productName, setProductName ] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ inputStock, setInputStock ] = useState(0);
  const [ availableStock, setAvailableStock ] = useState(0);
  const [ inputProduct, getInputProduct ] = useState({});
  
  useEffect(() => {
    retrieveCompanies();
  }, []);

  useEffect(() => {
    getInputProduct({
      productId: productId,
      stockIn: inputStock
    });
  }, [productId, inputStock]);
  
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
      console.log(response)
      if (response.data.length === 0) {
        setAvailableStock(0);
      } else {
        setAvailableStock(response.data[0])
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const productStockIn = () => {
    // console.log(inputProduct);
    if (inputStock <= 1) {
      alert("Invalid input amount");
      return
    } else {
      ProductDataService.updateStock(inputProduct)
      .then((response) => {
        // console.log(response.data)
        setSubmitted(true)
      })
      .catch((e)=> {
        console.log(e);
      })
    }
  }

  const getStockFromInput = (e) => {
    setInputStock(parseInt(e.target.value));
  }

  const refreshStock = () => {
    ProductDataService.getStockById({productId: productId})
      .then((response) => {
      // console.log(response.data)
      setAvailableStock(response.data[0])
    })
    .catch((e) => {
      console.log(e);
    })
    setSubmitted(!submitted);
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link 
            to={"/stock-in"} 
            >
            <button
              onClick={()=>refreshStock()}
              className="btn btn-success"
            >
              Back to Products
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

            <div className="row g-1 mb-1">
              <div className="col-md-3">
                <strong>Name: </strong>
              </div>
              <div className="col-md-9">
                <input
                  type="text" 
                  className="form-control" 
                  placeholder={productName}
                  disabled
                ></input>
              </div>
            </div>
              <div className="row g-1 my-2">
                <div className="col-md-3">
                  <strong>Available Stock: </strong>
                </div>
                <div className="col-md-9">
                  <input
                    type="number" 
                    className="form-control" 
                    placeholder={availableStock.availableStock}
                    disabled
                    ></input>
                </div>
              </div>
              <div className="col w-100 my-4">
                <div className="row w-50 mx-auto mb-3">
                  <input 
                    type="number" 
                    className="form-control w-100" 
                    onChange={getStockFromInput}
                    min="1"
                    required
                    placeholder="Buy Quantity" 
                    aria-label="Buy Quantity" 
                    aria-describedby="basic-addon1"></input>
                </div>
                <div className="row w-50 mx-auto mb-3">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={productStockIn}
                    >
                    Stock In
                  </button>
                </div>
              </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockIn;
