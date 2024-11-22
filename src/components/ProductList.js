import React from "react";

const products = [
  { id: 1, name: "Tomatoes", price: 20, seller: "Farmer A" },
  { id: 2, name: "Potatoes", price: 15, seller: "Farmer B" },
  { id: 3, name: "Carrots", price: 25, seller: "Farmer C" },
];

const ProductList = ({ addToCart }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Produce</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price} per kg</p>
            <p>Seller: {product.seller}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
