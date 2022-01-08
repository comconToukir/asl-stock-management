import React, { useState, useEffect } from "react";
import ProductDataService from "../../services/GetProduct";
import { Link } from "react-router-dom";

const AddProduct = () => {
  // const location = useLocation();
  // const { key, name, category, seller, price, stock  } = location.state;
  const [changedName, setChangedName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [inputData, setInputData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setInputData({
      name: changedName,
      categoryId: categoryId,
      companyId: companyId,
    });
  }, [changedName, categoryId, companyId]);

  useEffect(() => {
    retrieveCategories();
    retrieveCompanies();
  }, []);

  const onChangeName = (e) => {
    const newName = e.target.value;
    setChangedName(newName);
  };
  const onChangeCategory = (e) => {
    const newCategory = e.target.value;
    setCategoryId(newCategory);
  };
  const onChangeCompany = (e) => {
    const newCompany = e.target.value;
    setCompanyId(newCompany);
  };

  const createProduct = () => {
    setInputData({
      name: changedName,
      categoryId: categoryId,
      companyId: companyId,
    });
    ProductDataService.createProduct(inputData).then((response) => {
      setSubmitted(true);
    });
  };

  const retrieveCategories = () => {
    ProductDataService.getCategories()
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCompanies = () => {
    ProductDataService.getCompanies()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link to={"/add-product"} className="btn btn-success">
            Back to Products
          </Link>
        </div>
      ) : (
        <>
          <div className="input-group d-flex flex-column pb-1">
          <div className="row g-1">
              <div className="col-md-3">
                <strong>Category: </strong>
              </div>
              <div className="col-md-9">
                <select
                  className="form-select mb-3"
                  value={categoryId}
                  onChange={(e) => onChangeCategory(e)}
                  aria-label="Category select"
                  required
                  >
                  <option value="">Select Category</option>
                  {categories.map((cat) => <option value={cat._id}>{cat.categoryName}</option>)}
                </select>
              </div>
            </div>

            <div className="row g-1">
              <div className="col-md-3">
                <strong>Company: </strong>
              </div>
              <div  className="col-md-9">
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
                <strong>Name: </strong>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control mb-3"
                  value={changedName}
                  onChange={onChangeName}
                  required
                  />
              </div>
            </div>
          </div>
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => createProduct()}
          >
            Create Product
          </button>
        </>
      )}
    </div>
  );
};

export default AddProduct;
