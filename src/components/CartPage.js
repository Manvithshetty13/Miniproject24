import React from "react";

const Cart = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
