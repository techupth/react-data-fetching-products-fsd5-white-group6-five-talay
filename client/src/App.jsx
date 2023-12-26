import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// http://localhost:4001/products
function App() {
  const [productPost, setProductPost] = useState([]);
  const getProductPost = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductPost(result.data.data);
  };
  const deleteProductPost = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
  };
  useEffect(() => {
    getProductPost();
  }, [productPost]);
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productPost.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt={item.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name:{item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProductPost(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
        {/* <div className="product">
          <div className="product-preview">
            <img
              src="https://via.placeholder.com/350/350"
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: ...</h1>
            <h2>Product price: ... Baht</h2>
            <p>Product description: .....</p>
          </div>

          <button className="delete-button">x</button>
        </div> */}
      </div>
    </div>
  );
}

export default App;
