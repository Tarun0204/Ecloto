import React from "react";
import "../styles/Summary.css";

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

const Summary = ({ subtotal }) => {
  const progressPercentage = Math.min((subtotal / THRESHOLD) * 100, 100);

  return (
    <div className="summary-container">
      <div className="summary-content">
        <h2 className="summary-heading">Cart Summary</h2>
      </div>
      <div className="summary-bg">
        <div className="subtotal">
          <span>Subtotal:</span>
          <span className="amount">₹{subtotal}</span>
        </div>
        <div className="offer-message">
          {subtotal < THRESHOLD ? (
            <>
              Add ₹{THRESHOLD - subtotal} more to get a FREE {FREE_GIFT.name}!
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </>
          ) : (
            <p>Congratulations! You’ve unlocked a FREE {FREE_GIFT.name}!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
