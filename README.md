# Aston Martin Workshop - Online Store

## Project Overview

This project is a web-based online store implemented using React on the client side and Node.js with Express on the server side. It includes integration with MongoDB Atlas as the database, utilizing the carts_idnumber collection.

### Technologies Used

- React (Client-side)
- Node.js with Express (Server-side)
- MongoDB Atlas (Database)

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account (optional if you choose not to work with a database)

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:

   ```bash
   cd aston-martin-workshop
   ```

3. Install dependencies for both client and server:

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

### Configuration

1. Set up MongoDB Atlas:

   - Create a collection named `carts_idnumber`, replacing `idnumber` with the provider's ID.
   - Update the MongoDB connection string in `server/config/db.js` if necessary.

2. Start the server:

   ```bash
   cd server
   npm start
   ```

3. Start the client:

   ```bash
   cd client
   npm start
   ```

4. Open your browser and go to http://localhost:3000 to access the online store.

## Features

1. **Add to Cart:**
   - Click the "Add to cart" button to add products to your shopping cart.

2. **Update Quantity:**
   - Adjust the quantity of products in your cart.

3. **Remove from Cart:**
   - Remove unwanted items from your cart.

4. **View Cart:**
   - See the contents of your cart, individual item prices, and the total price.

## Data Transfer

Data transfer between the client and server is handled using the `useEffect` hook, fetching data from http://localhost:3000/message.

```javascript
useEffect(() => {
    fetch("http://localhost:3000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
}, []);
```

## Notes

- If not working with a database, data is stored in JSON files.

## Contributors

- Rami

Feel free to contribute to this project by submitting issues or pull requests.

Abo Rabia Rami
