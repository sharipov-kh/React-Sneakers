import Favorited from "../components/Favorites/Favorited";
import styles from "../components/Cards/Cards.module.scss";
import React, { useState } from "react";
import Appcontext from "../store/Context";
import EmptyInfo from "../components/EmptyInfo/EmptyInfo";

const Favorites = ({ addToCart }) => {
  
  const {favorites, addToFavorite} = React.useContext(Appcontext)
  
  const [searchInput, setSearchInput] = useState("");
  
  const onSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  
  const filteredItems = favorites.filter((item) =>
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
            <h1>Мои закладки</h1>
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
        {favorites.length > 0 ? (
          <div className={styles.cards__wrapper}>
            {filteredItems.map((card, index) => (
              <Favorited
                onClickFavorite={() => addToFavorite(card)}
                addToCart={() => addToCart(card)}
                key={index}
                {...card}
              />
            ))}
          </div>
        ) : (
          <EmptyInfo image="image\empty\img1.png" title="Закладок нет :(" text="Вы ничего не добавляли в закладки"/>
        )}
      </div>
    </div>
  );
};

export default Favorites;
