import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [blogProduct, setBlogProduct] = useState([]);
  const [status, setStatus] = useState(0);

  const getProduct = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setBlogProduct(result.data.data);
      setStatus(1);
    } catch {
      setStatus(2);
    }
  };
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    getProduct();
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {status === 0 ? (
          <h1>Loading...</h1>
        ) : status === 1 ? (
          blogProduct.map((product) => {
            return (
              <div className="product" key={product.id}>
                <div className="product-preview">
                  <img src={product.image} alt="some product" width="350" height="350" />
                </div>
                <div className="product-detail">
                  <h1>Product name: {product.name}</h1>
                  <h2>Product price: {product.price} Baht</h2>
                  <p>Product description: {product.description}</p>
                </div>

                <button className="delete-button" onClick={() => deleteProduct(product.id)}>
                  x
                </button>
              </div>
            );
          })
        ) : (
          <h1>Fetching Error...</h1>
        )}
      </div>
    </div>
  );
}

export default App;
