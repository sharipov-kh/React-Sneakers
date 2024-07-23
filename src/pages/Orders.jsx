import Card from "../components/Cards/Card";
import styles from "../components/Cards/Cards.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Appcontext from "../store/Context";
import EmptyCart from "../components/EmptyInfo/EmptyInfo";

const Orders = () => {
  const { addToCart, addToFavorite } = React.useContext(Appcontext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://669b7e85276e45187d35a4b9.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obg) => [...prev, ...obg.items], []));
      } catch (error) {
        alert("Ошибка");
      }
    })();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const onSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredItems = orders.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className={styles.cards}>
      <div className={styles.cardsContainer}>
        <div className={styles.cardsTittle}>
          {searchInput ? (
            <h1 className={styles.searchTitle}>
              Поиск по запросу "{searchInput}"
            </h1>
          ) : (
            <h1>Мои заказы</h1>
          )}
          <div className={styles.search}>
            <input
              value={searchInput}
              onChange={onSearchInput}
              type="text"
              placeholder="Поиск..."
            />
            <img
              className={styles.searchBtn}
              src="image/icon/search.svg"
              alt="search"
            />
            <img
              onClick={() => setSearchInput("")}
              className={styles.NoBtn}
              src="image/icon/no-alt.svg"
              alt="no-alt"
            />
          </div>
        </div>
        {searchInput && filteredItems.length === 0 && (
          <h1 className={styles.haveNotFound}>
            К сожалению, данный товар не найден
          </h1>
        )}
        <div className={styles.cards__wrapper}>
          {filteredItems.map((card, index) => (
                <Card
                  onClickFavorite={() => addToFavorite(card)}
                  addToCart={() => addToCart(card)}
                  name={card.name}
                  price={card.price}
                  img={card.img}
                  key={index}
                />
              ))}
        </div>
        {orders.length === 0 && (
          <EmptyCart
            image="image\empty\img2.png"
            title="У вас нет заказов :("
            text="Вы нищеброд? Оформите хотя бы один заказ."
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
