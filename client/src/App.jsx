import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// http://localhost:4001/products
function App() {
  const [productPost, setProductPost] = useState([]);
  const [status, setStatus] = useState(0);
  const getProductPost = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setProductPost(result.data.data);
      setStatus(1);
    } catch (error) {
      setStatus(2);
    }
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
        {status === 0 && <h1>Loading...</h1>}
        {status === 1 &&
          productPost.map((item) => {
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
        {status === 2 && <h1>Fetching Error...</h1>}
      </div>
    </div>
  );
}

export default App;
