import { useContext } from "react";
import Appcontext from "../store/Context";

export const useCart = () => {
  const { cartItems } = useContext(Appcontext);
  const TotalPrice = cartItems.reduce((sum, obg) => obg.price + sum, 0);

  return{ TotalPrice}
};
