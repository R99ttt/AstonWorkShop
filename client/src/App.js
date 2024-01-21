// Lior Poterman, Abo Rabia Rami
import "./style/App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import MiniCart from "./components/MiniCart";

function App() {
  // State variables
  const [isCart, setIsCart] = useState(false);
  const [cartContent, setCartContent] = useState({ items: [], total: 0 });
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch products and cart data on component mount
  useEffect(() => {
    // Fetch products
    async function fetchProducts() {
      await fetch("http://localhost:3001/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        })
        .catch((e) => console.error(e));
    }

    // Fetch cart data
    async function fetchCart() {
      await fetch("http://localhost:3001/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoaded(true);
          if (data != null) {
            setCartContent(data);
          }
        })
        .catch((e) => {
          console.error(e);
          setIsLoaded(true);
        });
    }

    fetchProducts();
    fetchCart();
  }, []);

  // Update the cart when cartContent changes
  async function updateCart(cart) {
    await fetch("http://localhost:3001/cart", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cartContent._id) {
          setCartContent({ item: [...cartContent], _id: data.cart._id });
        }
      })
      .catch((e) => console.error(e));
  }

  // Add item to cart
  const addItemToCart = (item) => {
    let isItemIn = false;
    for (let i = 0; i < cartContent.items.length; i++) {
      // if item already exists in the cart change the qty
      if (item.id === cartContent.items[i].id) {
        const tmp = [...cartContent.items];
        tmp[i].qty++;
        setCartContent({
          _id: cartContent._id,
          items: [...tmp],
          total: cartContent.total + item.price,
        });
        isItemIn = true;
        updateCart({
          _id: cartContent._id,
          items: [...tmp],
          total: cartContent.total + item.price,
        });
        break;
      }
    }
    // if the item dosen't exist add it to the items list
    if (!isItemIn) {
      setCartContent({
        _id: cartContent._id,
        items: [
          ...cartContent.items,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            imageSrc: item.imageSrc,
            qty: 1,
          },
        ],
        total: cartContent.total + item.price,
      });
      updateCart({
        _id: cartContent._id,
        items: [
          ...cartContent.items,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            imageSrc: item.imageSrc,
            qty: 1,
          },
        ],
        total: cartContent.total + item.price,
      });
    }
  };

  // Find the item by item.id and remove the item from the cart
  const removeItemFromCart = (id) => {
    for (let i = 0; i < cartContent.items.length; i++) {
      if (id === cartContent.items[i].id) {
        const tmp = [...cartContent.items];
        const price = tmp[i].price * tmp[i].qty; // Multiply the price by the quantity
        tmp.splice(i, 1);
        setCartContent({
          _id: cartContent._id,
          items: [...tmp],
          total: cartContent.total - price,
        });
        updateCart({
          _id: cartContent._id,
          items: [...tmp],
          total: cartContent.total - price,
        });
        return;
      }
    }
  };

  // Find the item inside the cart by item.id and change the quantity of the item in the cart
  const changeQuantity = (id, addAmount) => {
    for (let i = 0; i < cartContent.items.length; i++) {
      if (id === cartContent.items[i].id) {
        // if user pressed inside the cart the '-' button and there is only one item delete it
        if (cartContent.items[i].qty === 1 && addAmount === -1) {
          removeItemFromCart(id);
          return;
        } else {
          const tmp = [...cartContent.items];
          // dpending on the input ('+' or '-') add +1 or -1
          tmp[i].qty = tmp[i].qty + addAmount;
          // dpending on the input ('+' or '-') multiply by +1 or -1
          const price = tmp[i].price * addAmount;
          setCartContent({
            _id: cartContent._id,
            items: [...tmp],
            total: cartContent.total + price,
          });
          updateCart({
            _id: cartContent._id,
            items: [...tmp],
            total: cartContent.total + price,
          });
          return;
        }
      }
    }
  };

  // Render the component
  return (
    <div className="App">
      <Header setIsCart={setIsCart} isCart={isCart} />
      {/* while the cart get request didn't load the user can't make changes */}
      {isLoaded && (
        <main className="main_container">
          <div className="items_container">
            {/* Render each item as a Card component */}
            {items.map((item) => {
              return (
                <Card key={item.id} addItemToCart={addItemToCart} item={item} />
              );
            })}
          </div>
          {/* Render MiniCart if isCart is true (if cart button clicked) */}
          {isCart && (
            <MiniCart
              changeQuantity={changeQuantity}
              removeItemFromCart={removeItemFromCart}
              cart={cartContent}
            />
          )}
        </main>
      )}
    </div>
  );
}

export default App;
