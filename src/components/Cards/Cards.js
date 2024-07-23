import styles from "./Cards.module.scss";
import Card from "./Card";
import Loading from "../../uI/Loading";
import React, { useState } from "react";
import Appcontext from "../../store/Context";

const Cards = () => {
  const context = React.useContext(Appcontext);
  const [searchInput, setSearchInput] = useState("");

  const onSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredItems = context.items.filter((item) =>
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
            <h1>Все кроссовки</h1>
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
          {context.isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Loading key={`loading-${index}`} />
              ))
            : filteredItems.map((card) => (
                <Card
                  onClickFavorite={() => context.addToFavorite(card)}
                  addToCart={() => context.addToCart(card)}
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  price={card.price}
                  img={card.img}
                  added={context.isAddedCart(card.id)}
                  favorited={context.favorites.some(
                    (obj) => Number(obj.id) === Number(card.id)
                  )}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
