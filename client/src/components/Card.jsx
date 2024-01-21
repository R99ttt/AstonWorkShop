// Lior Poterman, Abo Rabia Rami
import React from "react";
import styles from "../style/Card.module.css";

/**
 * Card component represents an item card in the application.
 * @param {Function} addItemToCart - Function to add the item to the cart.
 * @param {Object} item - Item object containing information like name, price, and image source.
 */
export default function Card({ addItemToCart, item }) {
  return (
    <div className={styles.container}>
      {/* Render the item image */}
      <img
        style={{ objectFit: "contain" }}
        width={380}
        height={264}
        src={item.imageSrc}
        alt="product image"
      />
      <div style={{ padding: "0 1.25rem  1.25rem  1.25rem" }}>
        {/* Render the item name */}
        <h5 className={styles.item_name}>{item.name}</h5>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Render the item price */}
          <span className={styles.price}>{item.price}₪</span>
          {/* Button to add the item to the cart */}
          <button onClick={() => addItemToCart(item)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
