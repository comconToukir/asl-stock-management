import React, { useState, useEffect } from "react";
import ProductDataService from "../../services/GetProduct";
import { Link } from "react-router-dom";

const ProductSummary = () => {
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ productId, setProductId ] = useState("");
  const [ productName, setProductName ] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ inputEditName, setInputEditName ] = useState(0);
  const [ availableStock, setAvailableStock ] = useState(0);
  const [ inputProduct, getInputProduct ] = useState({});
  
  useEffect(() => {
    retrieveCompanies();
  }, []);

  useEffect(() => {
    getInputProduct({
      productId: productId,
      name: inputEditName
    });
  }, [productId, inputEditName]);
  
  const retrieveCompanies = () => {
    ProductDataService.getCompanies()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeCompany = (e) => {
    const newCompany = e.target.value;
    setCompanyId(newCompany);
    ProductDataService.getProducts({companyId: newCompany})
      .then((response) => {
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

  const productEditName = () => {
    ProductDataService.updateProduct(inputProduct)
    .then((response) => {
      setSubmitted(true)
    })
    .catch((e)=> {
      console.log(e);
    })
  }

  const getNameFromInput = (e) => {
    setInputEditName(e.target.value);
  }

  const refreshStock = () => {
    ProductDataService.getProducts({companyId: companyId})
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((e)=> {
        console.log(e);
      })
    setProductName("");
    setAvailableStock(0);
    setSubmitted(!submitted);
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link 
            to={"/items-summary"} 
            >
            <button
              onClick={()=>refreshStock()}
              className="btn btn-success"
            >
              Back to Item
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
                    type="text" 
                    className="form-control w-100" 
                    onChange={getNameFromInput}
                    placeholder="Input Edit Name" 
                    aria-label="Input Edit Name" 
                    aria-describedby="basic-addon1"></input>
                </div>
                <div className="row w-50 mx-auto mb-3">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={productEditName}
                    >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSummary;
