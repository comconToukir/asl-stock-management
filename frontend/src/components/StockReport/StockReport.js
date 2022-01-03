import React, { useState, useEffect } from 'react';

const StockReport = () => {
  const [ year, setYear ] = useState(0);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let dates = [];

  for (let i = 1; i <= 31; i++) {
    dates.push(<option value={i}> {i} </option>);
  }

  return (
    <div className="container">
      <div className="input-group pb-1">
          <input
            type="text"
            className='form-control m-1'
            placeholder='YYYY'
            // value={searchCategory}
            // onChange={onChangeSearchCategory}
          />
          <select className='m-1'>
          {/* <select onChange={onChangeSearchCategory}> */}
            {
              months.map(category => {
                return (
                  <option value={category}> {category} </option>
              )
              })
            }
          </select>
          <select className='m-1'>
          {/* <select onChange={onChangeSearchCategory}> */}
            {dates}
          </select>
          <div className='input-group-append'>
            <button
              className="btn btn-outline-primary m-1"
              type="button"
              // onClick={findByCategory}
            >
              Get stock report
            </button>
          </div>
        </div>
    </div>
  );
};

export default StockReport;