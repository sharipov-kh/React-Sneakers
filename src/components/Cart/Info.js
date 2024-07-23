import { useContext } from "react";
import styles from "./info.module.scss";
import Appcontext from "../../store/Context";

const EmptyCart = ({ title, image, description }) => {
  const { setCartOpened } = useContext(Appcontext);

  return (
    <div className={styles.EmptyCart}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)}>Вернуться назад</button>
    </div>
  );
};

export default EmptyCart;
