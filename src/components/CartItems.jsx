import React from "react";
import "../styles/Items.css";

const CartItems = ({ cart, setCart }) => {
  const handleIncrease = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  const handleRemove = (index) => {
    const newCart = cart.filter((_, itemIndex) => itemIndex !== index);
    setCart(newCart);
  };

  const renderCartItems = () => {
    return cart.map((item, index) => {
      const totalPrice = item.price * item.quantity;

      if (item.id === 99) {
        return (
          <li key={item.id} className="cart-item">
            <div className="cart-item-left">
              <span className="item-name">{item.name}</span>
            </div>
            <div className="cart-item-center">
              <span className="item-price">
                ${item.price} * {item.quantity} = ${totalPrice}
              </span>
            </div>
            <div className="cart-item-right">
              <span className="free-item">FREE GIFT</span>
            </div>
          </li>
        );
      }

      return (
        <li key={item.id} className="cart-item">
          <div className="cart-item-left">
            <span className="item-name">{item.name}</span>
          </div>
          <div className="cart-item-center">
            <span className="item-price">
              ${item.price} * {item.quantity} = ${totalPrice}
            </span>
          </div>
          <div className="cart-item-right">
            <button
              className="quantity-btn decrease-btn"
              onClick={() => handleDecrease(index)}
            >
              -
            </button>
            <span className="item-quantity">{item.quantity}</span>
            <button
              className="quantity-btn increase-btn"
              onClick={() => handleIncrease(index)}
            >
              +
            </button>
            <button className="remove-btn" onClick={() => handleRemove(index)}>
              Remove
            </button>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-heading">Cart Items</h1>
      </div>
      <div className="cart-items-list">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>{renderCartItems()}</ul>
        )}
      </div>
    </div>
  );
};

export default CartItems;
