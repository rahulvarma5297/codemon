import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Products.css";
import Loading from "../Loading/Loading";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);

    axios
      .post("https://backend-codemon.onrender.com/products/data", data)
      .then((res) => {
        alert("Data inserted successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setData({
      name: "",
      description: "",
      price: 0,
    });
  };

  useEffect(() => {
    axios
      .get("https://backend-codemon.onrender.com/products/data")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="name"
              placeholder="Enter Product name"
              onChange={changeHandler}
              value={data.name}
              required
            />

            <br />

            <input
              type="text"
              name="description"
              placeholder="Enter Product description"
              onChange={changeHandler}
              value={data.description}
              required
            />

            <br />

            <input
              type="number"
              name="price"
              placeholder="Enter Product price"
              onChange={changeHandler}
              value={data.price}
              min="0"
              required
            />

            <br />

            <button type="submit" className="btn">
              Submit
            </button>
          </form>

          <br />

          <div className="table-responsive">
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th width="10%"> Update Price </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#6a00a8",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            navigate(`/${product._id}`);
                          }}
                        >
                          Go
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
