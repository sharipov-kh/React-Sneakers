import Card from "../Cards/Card";

const Favorited = ({onClickFavorite, addToCart, name, price, img }) => {
  return (
    <div>
      <Card
        onClickFavorite={onClickFavorite}
        addToCart={addToCart}
        name={name}
        price={price}
        img={img}
        favorited={true}
        />
    </div>
  );
};

export default Favorited;
