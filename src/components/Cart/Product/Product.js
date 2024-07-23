import React from "react";
import "./Product.scss";

const Product = (props) => {
  return (
    <div className="Product">
      <div className="content">
        <div className="ProductImage">
          <img width={70} height={70} src={props.img} alt={props.name} />
        </div>
        <div className="ProductText">
          <h3>{props.name}</h3>
          <b>{props.price} руб.</b>
        </div>
      </div>
      <button onClick={() => props.onClearCartItem(props.dataCart.idd)}>
        <img src="image/icon/clear.svg" alt="example" />
      </button>
    </div>
  );
};

export default Product;
