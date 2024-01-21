// Lior Poterman, Abo Rabia Rami
import React, { useId } from "react";
import MiniCartItem from "./MiniCartItem";

/**
 * MiniCart component represents a mini cart display in the application. at the right hand side of the screen
 * @param {Object} cart - Cart object containing items and total price.
 * @param {Function} removeItemFromCart - Function to remove an item from the cart.
 * @param {Function} changeQuantity - Function to change the quantity of an item in the cart.
 */
export default function MiniCart({ cart, removeItemFromCart, changeQuantity }) {
  return (
    <div
      style={{
        position: "fixed",
        right: "0",
        background: "white",
        overflowY: "visible",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Displaying the items in the cart */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {/* Rendering each item in the cart */}
        {cart.items.map((item) => {
          return (
            <MiniCartItem
              key={item.id}
              removeItemFromCart={removeItemFromCart} // Function to remove an item from the cart
              changeQuantity={changeQuantity} // Function to change the quantity of an item in the cart
              {...item} // Spread operator to pass individual item properties as props
            />
          );
        })}
      </div>
      {/* Displaying the total */}
      <div
        style={{
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Total: {cart.total}₪</h3> {/* Displaying the total price */}
      </div>
    </div>
  );
}
