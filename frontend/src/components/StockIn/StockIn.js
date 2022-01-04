import React, { useState, useEffect } from "react";
import ProductDataService from "../../services/GetProduct";
import { Link } from "react-router-dom";

const StockIn = () => {
  // const location = useLocation();
  // const { key, name, category, seller, price, stock  } = location.state;
  const [changedName, setChangedName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [inputData, setInputData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ inputCompany, getInputCompany ] = useState({});
  const [ inputProduct, getInputProduct ] = useState({});

  useEffect(() => {
    getInputCompany({
      // name: changedName,
      // categoryId: categoryId,
      // companyId: companyId,
      companyId: companyId,
    });
  }, [companyId]);

  useEffect(() => {
    retrieveCompanies();
  }, []);
  
    const retrieveCompanies = () => {
      ProductDataService.getCompanies()
        .then((response) => {
          console.log(response.data);
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
  };

  // const createProduct = () => {
  //   setInputData({
  //     name: changedName,
  //     categoryId: categoryId,
  //     companyId: companyId,
  //   });
  //   ProductDataService.createProduct(inputData).then((response) => {
  //     setSubmitted(true);
  //   });
  // };

  const getProductsByCompany = () => {
    console.log(inputCompany);
    ProductDataService.getProducts(inputCompany)
      .then((response)=> {
        console.log(response.data)
      })
  }

  //TODO

  // const getProducts = () => {
  //   ProductDataService.getProducts()
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  // }

  return (
    <div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link to={"/products"} className="btn btn-success">
            Back to Products
          </Link>
        </div>
      ) : (
        <>
          <div className="input-group d-flex flex-column pb-1">
            <div className="d-flex">
              <strong>Company: </strong>
              <select
                className="form-select ms-3 mb-3"
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
              <button
                className="btn btn-outline-secondary ms-2 flex-shrink-0"
                onClick={getProductsByCompany}
              >
                Get Products
              </button>
              {/* <button onClick={()=>getProducts()}>Search</button> */}
            </div>
            <div className="d-flex mt-2">
              <strong>Items: </strong>
              <input
                type="text"
                className="form-control ms-3 mb-3"
                // value={changedName}
                // onChange={onChangeName}
                // required 
              />
            </div>
          </div>
          {/* <button
            className="btn btn-success mb-3"
            onClick={() => createProduct()}
          >
            Create Product
          </button> */}
        </>
      )}
    </div>
  );
};

export default StockIn;
