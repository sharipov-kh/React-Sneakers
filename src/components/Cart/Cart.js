import React, { useState, useContext } from "react";
import "./Cart.scss";
import Product from "./Product/Product";
import Info from "./Info";
import axios from "axios";
import Appcontext from "../../store/Context";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Cart = (props) => {
  const { TotalPrice } = useCart();
  const { setCartItems, cartItems, setCartOpened, cartOpened } =
    useContext(Appcontext);
  const [isComplateOrder, setIsComplateOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [OrderId, setOrderId] = useState(null);

  const onComplateOrder = async () => {
    setIsLoading(true);
    const { data } = await axios.post(
      "https://669b7e85276e45187d35a4b9.mockapi.io/orders",
      {
        items: cartItems,
      }
    );
    setOrderId(data.id);
    setIsComplateOrder(true);
    setCartItems([]);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete(
        "https://6693af52c6be000fa07ce862.mockapi.io/cart/" + item.idd
      );
      await delay(1000);
    }
    setIsLoading(false);
  };

  const clearItemCart = (idd) => {
    axios
      .delete(`https://6693af52c6be000fa07ce862.mockapi.io/cart/${idd}`)
      .then(() => {
        props.setCartItemsData((prev) =>
          prev.filter((item) => item.idd !== idd)
        );
      })
      .catch((error) => {
        console.error("Ошибка при удалении товара из корзины:", error);
        alert("Ошибка при удалении товара из корзины");
      });
  };

  return (
    <div className={!cartOpened ? "Cart" : "Cart Cart__opened"}>
      <div
        className="CartBackground"
        onClick={() => setCartOpened(false)}
      ></div>
      <div className="CartWrapper">
        <div className="CartTitle">
          <h1>Корзина</h1>
        </div>
        <div className="CartContent">
          <div className="CartMain">
            {props.cartItemsData.length === 0 ? (
              <Info
                image={
                  isComplateOrder
                    ? "image/cart/complateOreder.png"
                    : "image/cart/emptyCart.png"
                }
                title={isComplateOrder ? "Заказ оформлен!" : "Корзина пустая"}
                description={
                  isComplateOrder
                    ? `Ваш заказ #${OrderId} скоро будет передан курьерской доставке`
                    : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                }
              />
            ) : (
              props.cartItemsData.map((card) => (
                <Product
                  dataCart={card}
                  onClearCartItem={clearItemCart}
                  key={card.idd}
                  name={card.name}
                  img={card.img}
                  price={card.price}
                />
              ))
            )}
          </div>
          {props.cartItemsData.length === 0 ? (
            <></>
          ) : (
            <div className="Checkout">
              <ul>
                <li>
                  <p>Итого: </p>
                  <div className="line"></div>
                  <b>{TotalPrice} руб. </b>
                </li>
                <li>
                  <p>Налог 5%: </p>
                  <div className="line"></div>
                  <b>{Math.round((TotalPrice / 100) * 5)} руб. </b>
                </li>
                <li>
                  <button disabled={isLoading} onClick={onComplateOrder}>
                    Оформить заказ
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
