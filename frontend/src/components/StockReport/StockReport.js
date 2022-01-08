import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductDataService from "../../services/GetProduct"
import Pagination from '../Pagination/Pagination';

const StockReport = () => {
  const [ dateRange, setDateRange ] = useState([null, null]);
  const [ startDate, endDate ] = dateRange;
  const [ stockList, setStockList ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  const getStockByRange = () => {
    const range = {
      greaterThan: startDate.toISOString(),
      lesserThan: endDate.toISOString()
    }
    ProductDataService.getStock(range)
      .then((response) => {
        setStockList(response.data.products);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = stockList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const printDiv = () => {
    window.print();
  } 

  return (
    <div className="container">
      <div className="col button-div">
        <div className='row my-2'>
          <div className="col-3 col-sm-3 ms-auto">
            <span >Set Date Range: </span>
          </div>
          <div className='col-3 me-auto'>
            <DatePicker 
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              // isClearable={true}
              />
          </div>
        </div>
        <div className='row w-50 mx-auto'>
          <button
            className="btn btn-outline-secondary m-2"
            type="button"
            onClick={getStockByRange}
          >
            Get stock report
          </button>
        </div>
        <div className='row w-50 mx-auto'>
          <button
            // style={{width:"215px", margin:"7px"}}
            className="btn btn-outline-secondary m-2"
            type="button"
            onClick={printDiv}
          >
            Print stock report
          </button>
        </div>
      </div>

      <div id="printableArea">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>yyyy-mm-dd</th>
            </tr>
          </thead>
          <tbody>
            {
              currentPosts.map((st, i)=> {
                return <>
                <tr>
                <td>{i+1}</td>
                  <td>{st.name}</td>
                  <td>{st.categoryName}</td>
                  <td>{st.companyName}</td>
                  {st.stockOut &&
                    <>
                      <td>Sell</td>
                      <td>{st.stockOut}</td>
                    </>
                  } 
                  {st.stockIn &&
                    <>
                      <td>Buy</td>
                      <td>{st.stockIn}</td>
                    </>
                  }
                  <td>
                    {st.stock_update_date.substr(0, 10)}
                    </td>
                </tr>
                </>
              })
            }
          </tbody>
        </table>
      </div>
      <div className='button-div d-flex justify-content-center'>
        <Pagination postsPerPage={postsPerPage} totalPosts={stockList.length} paginate={paginate}></Pagination>
      </div>
      </div>
  );
};

export default StockReport;