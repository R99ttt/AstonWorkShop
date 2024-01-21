// Lior Poterman, Abo Rabia Rami
import React from "react";
import styles from "../style/MiniCartItem.module.css";

/**
 * MiniCartItem component represents an individual item in the mini cart display.
 * @param {string} id - Unique identifier of the item.
 * @param {string} name - Name of the item.
 * @param {number} price - Price of the item.
 * @param {number} qty - Quantity of the item.
 * @param {string} imageSrc - Image source of the item.
 * @param {Function} removeItemFromCart - Function to remove the item from the cart.
 * @param {Function} changeQuantity - Function to change the quantity of the item in the cart.
 */
export default function MiniCartItem({
  id,
  name,
  price,
  qty,
  imageSrc,
  removeItemFromCart,
  changeQuantity,
}) {
  return (
    <div className={styles.container}>
      <img
        style={{ objectFit: "contain" }}
        width={100}
        height={100}
        src={imageSrc}
        alt="product image"
      />
      <div className={styles.info_container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <p className={styles.item_name}>{name}</p>{" "}
          {/* Displaying the item name */}
          <span className={styles.price}>{price * qty}₪</span>{" "}
          {/* Displaying the item price */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <button onClick={() => changeQuantity(id, 1)}>+</button>{" "}
            {/* Button to increase the item quantity */}
            <h5 className={styles.item_name}>Qty - {qty}</h5>{" "}
            {/* Displaying the item quantity */}
            <button
              style={{ background: "red" }}
              onClick={() => changeQuantity(id, -1)} // Button to decrease the item quantity
            >
              -
            </button>
          </div>
          <button onClick={() => removeItemFromCart(id)}>remove</button>{" "}
          {/* Button to remove the item from the cart */}
        </div>
      </div>
    </div>
  );
}
