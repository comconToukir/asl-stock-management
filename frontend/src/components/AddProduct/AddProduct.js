import React, { useState, useEffect } from 'react';
import ProductDataService from "../../services/GetProduct"
import { Link } from 'react-router-dom';

const EditProduct = () => {
  // const location = useLocation();
  // const { key, name, category, seller, price, stock  } = location.state;
  const [ changedKey, setChangedKey ] = useState("");
  const [ changedName, setChangedName ] = useState("");
  const [ changedCategory, setChangedCategory ] = useState("");
  const [ changedSeller, setChangedSeller ] = useState("");
  const [ changedPrice, setChangedPrice ] = useState(0);
  const [ changedStock, setChangedStock ] = useState(0);
  const [ categories, setCategories ] = useState([]);
  const [ sellers, setSellers ] = useState([]);
  const [ inputData, setInputData ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);
  const [ addCategory, setAddCategory ] = useState(true);
  const [ addSeller, setAddSeller ] = useState(true);

  useEffect(() => {
    setInputData({
      key: changedKey,
      name: changedName,
      category: changedCategory,
      seller: changedSeller,
      price: changedPrice,
      stock: changedStock,
    });
    
  }, [changedKey, changedName, changedCategory, changedSeller, changedPrice, changedStock])

  useEffect(() => {
    retrieveCategories();
    retrieveSellers();
  }, [])
  
  const onChangeKey = e => {
    const newKey = e.target.value;
    setChangedKey(newKey);
  }
  const onChangeName = e => {
    const newName = e.target.value;
    setChangedName(newName);
  }
  const onChangeCategory = e => {
    const newCategory = e.target.value;
    setChangedCategory(newCategory);
  }
  const onChangeSeller = e => {
    const newSeller = e.target.value;
    setChangedSeller(newSeller);
  }
  const onChangePrice = e => {
    const newPrice = e.target.value;
    setChangedPrice(newPrice);
  }
  const onChangeStock = e => {
    const newStock = e.target.value;
    setChangedStock(newStock);
  }

  const createProduct = () => {
    setInputData({
      key: changedKey,
      name: changedName,
      category: changedCategory,
      seller: changedSeller,
      price: changedPrice,
      stock: changedStock,
    });
    console.log(inputData);
    ProductDataService.createProduct(inputData)
    .then(response=>{
      setSubmitted(true);
    });
  }

  const retrieveCategories = () => {
    ProductDataService.getCategories()
      .then(response => {
        console.log(response.data);
        setCategories(["Select category", ...response.data]);
      })
      .catch(e => {
        console.log(e)
      });
  };

  const retrieveSellers = () => {
    ProductDataService.getSellers()
      .then(response => {
        console.log(response.data);
        setSellers(["Select company", ...response.data]);
      })
      .catch(e => {
        console.log(e)
      });
  };

    // const defaultCategory = categories[0];
  return (
    <div>
      {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/product/" + changedKey} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>
        ) : (
        <>
          <div className='input-group d-flex flex-column pb-1'>
            <div className="d-flex">
              <strong>Key: </strong>
              <input
                type="text"
                className='form-control ms-3 mb-3'
                value={changedKey}
                onChange={onChangeKey}
                required
                />
            </div>
            <div className="d-flex">
              <strong>Name: </strong>
              <input
                type="text"
                className='form-control ms-3 mb-3'
                value={changedName}
                onChange={onChangeName}
                required
                />
            </div>
            <div className="d-flex">
              <strong>Category: </strong>
              {
                addCategory ? 
                <>
                <select 
                className="form-select ms-3 mb-3" 
                onChange={onChangeCategory}
                aria-label="Category select"
                required
                >
                {
                  categories.map(cat => <option value={cat}>{cat}</option>)
                }
              </select>
              <button className="btn btn-primary ms-3 mb-3" onClick={()=>setAddCategory(!addCategory)}>Add</button>
                </>
              :
              <>
              <input
              type="text"
              className='form-control ms-3 mb-3'
              value={changedCategory}
              onChange={onChangeCategory}
              required
              />
              <button className="btn btn-primary ms-3 mb-3" onClick={()=>setAddCategory(!addCategory)}>List</button>
              </>
            }
            </div>
            <div className="d-flex">
              <strong>Seller: </strong>
              {
                addSeller ?
                <>
                  <select 
                    className="form-select ms-3 mb-3" 
                    onChange={onChangeSeller}
                    aria-label="Company select"
                    required
                    >
                    {
                      sellers.map(slr => <option value={slr}>{slr}</option>)
                    }
                  </select>
                  <button className="btn btn-primary ms-3 mb-3" onClick={()=>setAddSeller(!addSeller)}>Add</button>
                  </>
                  :
                  <>
                  <input
                    type="text"
                    className='form-control ms-3 mb-3'
                    value={changedSeller}
                    onChange={onChangeSeller}
                    required
                    />
                  <button className="btn btn-primary ms-3 mb-3" onClick={()=>setAddSeller(!addSeller)}>List</button>
                  </>
              }
            </div>
            <div className="d-flex">
              <strong>Price: </strong>
              <input
                type="number"
                className='form-control ms-3 mb-3'
                value={changedPrice}
                onChange={onChangePrice}
                required
                />
            </div>
            <div className="d-flex">
              <strong>Stock: </strong>
              <input
                type="number"
                className='form-control ms-3 mb-3'
                value={changedStock}
                onChange={onChangeStock}
                required
                />
            </div>
          </div>
          <button 
            className='btn btn-success mb-3'
            onClick={()=>createProduct()}
            >Create Product</button>
        </>
        )
      }
    </div>
  );
};

export default EditProduct;