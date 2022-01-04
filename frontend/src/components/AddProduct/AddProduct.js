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
    // console.log(e.target.value);
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
        console.log(response.data);
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
          <Link to={"/products"} className="btn btn-success">
            Back to Products
          </Link>
        </div>
      ) : (
        <>
          <div className="input-group d-flex flex-column pb-1">
            <div className="d-flex">
              <strong>Category: </strong>
              <select
                className="form-select ms-3 mb-3"
                value={categoryId}
                onChange={(e) => onChangeCategory(e)}
                aria-label="Category select"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => <option value={cat._id}>{cat.categoryName}</option>)}
              </select>
            </div>
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
            </div>
            <div className="d-flex">
              <strong>Name: </strong>
              <input
                type="text"
                className="form-control ms-3 mb-3"
                value={changedName}
                onChange={onChangeName}
                required
              />
            </div>
          </div>
          <button
            className="btn btn-success mb-3"
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
