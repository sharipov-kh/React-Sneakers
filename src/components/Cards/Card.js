import React, { useState } from "react";
import styles from "./Card.module.scss";
import Appcontext from "../../store/Context";

const Card = ({
  addToCart,
  onClickFavorite,
  name,
  price,
  img,
  id,
  favorited = false,
  added = false,
}) => {

  const {isAddedCart} = React.useContext(Appcontext)
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const handleAddToCart = () => {
    addToCart();
    setIsAdded(!isAdded);
  };

  const handleAddToFavorite = () => {
    onClickFavorite();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__heart}>
        <img
          onClick={handleAddToFavorite}
          src={
            isFavorite ? "image/icon/isfavorite.svg" : "image/icon/heart.svg"
          }
          alt="heart"
        />
      </div>
      <div className={styles.card__image}>
        <img src={img} alt={name} />
      </div>
      <div className={styles.card__name}>
        <p>{name}</p>
      </div>
      <div className={styles.card__price}>
        <div className={styles["card-price__left"]}>
          <p>Цена:</p>
          <b>{price} руб.</b>
        </div>
        <div className={styles["card-price__right"]}>
          <img
            onClick={handleAddToCart}
            src={
                isAddedCart(id)
                ? "image/icon/addedInCart.svg"
                : "image/icon/plusIncart.svg"
            }
            alt="example"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Card;
