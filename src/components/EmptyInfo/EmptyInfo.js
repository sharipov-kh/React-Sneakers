import { Link } from "react-router-dom";
import styles from "./EmptyInfo.module.scss";

const EmptyInfo = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={styles.title}>
        <h3>{props.title}</h3>
      </div>
      <div className={styles.text}>
        <p>{props.text}</p>
      </div>
      <div className="button">
        <Link to="/">
          <button className={styles.button}>
            Вернуться назад
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyInfo;
