import React, { useState, useEffect } from "react";
import CartItems from "./CartItems";
import "../styles/Cart.css";
import Summary from "./Summary";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

const Cart = () => {
  const [cart, setCart] = useState([]);

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const subtotal = getSubtotal();
    const freeGiftInCart = cart.some((item) => item.id === FREE_GIFT.id);

    if (subtotal >= THRESHOLD && !freeGiftInCart) {
      setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
    }

    if (subtotal < THRESHOLD && freeGiftInCart) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== FREE_GIFT.id)
      );
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="shopping-cart-container">
      <div className="shopping-content">
        <h1 className="main-heading">Shopping Cart Items</h1>
      </div>
      <div className="products-container">
        <div className="products-content">
          <h2 className="products-heading">Products</h2>
        </div>
        <div className="product-items">
          <ul className="products-data">
            {PRODUCTS.map((product) => (
              <li key={product.id} className="products-list">
                <span className="product-name">{product.name}</span>
                <span className="product-price">${product.price}</span>
                <button
                  type="button"
                  className="cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Summary subtotal={getSubtotal()} />
      <CartItems cart={cart} setCart={setCart} />
    </div>
  );
};

export default Cart;
