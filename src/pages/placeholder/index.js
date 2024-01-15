import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./placeholder.css";

const Placeholder = () => {
  const location = useLocation();
  const placeholderData = location.state;
  const [placeholder, setPlaceholder] = useState([]);

  useEffect(() => {
    if (placeholderData) {
      setPlaceholder(placeholderData);
    }
  }, [placeholderData]);

  const handleDelete = (index) => {
    const deletedData = [...placeholder];
    deletedData.splice(index, 1);
    setPlaceholder(deletedData);
  };

  return (
    <div className="container">
      <h1>JSON Placeholder</h1>
      <div className="table-container">
        <div className="table-header">
          <div className="id column">
            <p>ID</p>
          </div>
          <div className="title column">
            <p>Title</p>
          </div>
          <div className="item-body column">
            <p>Body</p>
          </div>
          <div className="action column">
            <p>Action</p>
          </div>
        </div>
        {placeholder.map((item, i) => (
          <>
            {i <= 9 && (
              <div key={i} className="table-row">
                <div className="id column">
                  <p>{item.id}</p>
                </div>
                <div className="title column">
                  <p>{item.title}</p>
                </div>
                <div className="item-body column">
                  <p>{item.body}</p>
                </div>
                <div className="action column">
                  <button className="button" onClick={() => handleDelete(i)}>
                    delete
                  </button>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Placeholder;

