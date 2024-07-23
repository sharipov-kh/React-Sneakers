import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Cart from "./components/Cart/Cart";
import axios from "axios";
import "./index.scss";
import "./null.scss";
import Favorites from "./pages/Favorites";
import Appcontext from "./store/Context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsRespose = await axios.get(
          "https://6693af52c6be000fa07ce862.mockapi.io/items"
        );
        const favoritesRespose = await axios.get(
          "https://669b7e85276e45187d35a4b9.mockapi.io/favorites"
        );
        const cartRespose = await axios.get(
          "https://6693af52c6be000fa07ce862.mockapi.io/cart"
        );

        setItems(itemsRespose.data);
        setFavorites(favoritesRespose.data);
        setCartItems(cartRespose.data);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе на сервера");
      }
    }

    fetchData();
  }, []);

  const addToCart = async (item) => {
    try {
      const existingItem = cartItems.find((obj) => Number(obj.id) === Number(item.id));
      if (existingItem) {
        setCartItems((prev) =>
          prev.filter((obj) => Number(obj.id) !== Number(item.id))
        );
        await axios.delete(
          `https://6693af52c6be000fa07ce862.mockapi.io/cart/${existingItem.idd}`
        );
      } else {
        const postResponse = await axios.post("https://6693af52c6be000fa07ce862.mockapi.io/cart", item);
        setCartItems((prev) => [...prev, postResponse.data]);
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
    }
  };
  

  const addToFavorite = async (item) => {
    if (favorites.find((obj) => obj.id === item.id)) {
      try {
        await axios.delete(
          `https://669b7e85276e45187d35a4b9.mockapi.io/favorites/${item.id}`
        );
        setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
      } catch (error) {
        alert("Не удалось удалить из фаворитов");
      }
    } else {
      try {
        const { data } = await axios.post(
          "https://669b7e85276e45187d35a4b9.mockapi.io/favorites",
          item
        );
        setFavorites((prev) => [...prev, data]);
      } catch (error) {
        alert("Не удалось добавить в фавориты");
      }
    }
  };

  useEffect(() => {
    document.body.classList.toggle("active", cartOpened);
  }, [cartOpened]);

  const isAddedCart = (id) => {
    return cartItems.some((obg) => obg.id === id);
  };

  return (
    <Appcontext.Provider
      value={{
        items,
        cartItems,
        favorites,
        addToFavorite,
        addToCart,
        isLoading,
        favorites,
        addToFavorite,
        isAddedCart,
        setCartOpened,
        setCartItems,
        cartOpened,
      }}
    >
      <div className="wrapper">
        <div className="main">
          <Cart cartItemsData={cartItems} setCartItemsData={setCartItems} />
          <Header onClickCart={() => setCartOpened(true)} />
          <Routes>
            <Route path="/React-Sneakers" element={<Home />} />
            <Route
              path="/React-Sneakers/favorites"
              element={<Favorites addToCart={addToCart} />}
            />
            <Route path="/React-Sneakers/orders" element={<Orders addToCart={addToCart} />} />
          </Routes>
        </div>
        {/*  */}
      </div>
    </Appcontext.Provider>
  );
}

export default App;
