import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Products.css";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [price, setPrice] = useState(0);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:5000/products/data/${id}`);
    console.log(res);
    setProduct(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1
        style={
          {
            textAlign: "center",
            margin: "20px",
            color: "#ffbb00e3",
            fontSize: "40px",
          }
        }
      >Update Price</h1>

      <div className="table-responsive">
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="update-price">
      <input
        type="text"
        name="price"
        placeholder="Enter new price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        min="0"
      />

      <button
        className="btn"
        onClick={() => {
          if (price >= product.price * 0.8 && price <= product.price * 1.2) {
            axios
              .put(`http://localhost:5000/products/data/${id}`, {
                price: price,
              })
              .then((res) => {
                console.log(res);
                fetchData();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert("New Price must be 80% to 120% of Original Product price");
          }
        }}
      >
        Update
      </button>
      </div>

    </div>
  );
};

export default Detail;
