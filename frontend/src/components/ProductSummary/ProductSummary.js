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
        // console.log(response.data);
        setCompanies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeCompany = (e) => {
    // console.log(e.target.value)
    const newCompany = e.target.value;
    setCompanyId(newCompany);
    ProductDataService.getProducts({companyId: newCompany})
      .then((response) => {
        // console.log(response.data);
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
    // console.log(inputProduct);
    ProductDataService.updateProduct(inputProduct)
    .then((response) => {
      // console.log(response.data)
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
        // console.log(response.data);
        setProducts(response.data.products);
      })
      .catch((e)=> {
        console.log(e);
      })

    // ProductDataService.getStockById({productId: productId})
    //   .then((response) => {
    //   // console.log(response.data)
    //   setAvailableStock(response.data[0])
    // })
    // .catch((e) => {
    //   console.log(e);
    // })

    // ProductDataService.get(productId)
    // .then((response) => {
    //   setProductName
    // })
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
              <div className="row mb-3">
                <span className="col-12" id="basic-addon1">Name: {productName}</span>
              </div>
              <div className="row mb-3">
                <span className="col-12" id="basic-addon2">Available Stock: {availableStock.availableStock}</span>
              </div>
              <div className="row">
                <div className="col-8">
                  <input 
                    type="text" 
                    className="form-control w-100" 
                    onChange={getNameFromInput}
                    placeholder="Input Edit Name" 
                    aria-label="Input Edit Name" 
                    aria-describedby="basic-addon1"></input>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={productEditName}
                    >
                    Edit Name
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
