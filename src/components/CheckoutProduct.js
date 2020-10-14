import React, { forwardRef } from "react";
import "../css/CheckoutProduct.css";
import { useStateValue } from "../StateProvider";

const CheckoutProduct = forwardRef(
  ({ id, image, title, price, rating, hideButton }, ref) => {
    const [{}, dispatch] = useStateValue();
    const removeFromBasket = () => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

    return (
      <div ref={ref}>
        <div className="checkoutProduct">
          <img className="checkoutProduct__image" src={image} alt="" />

          <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{title}</p>
            <p className="checkoutProduct__price">
              <small>$</small>
              <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <p>⭐</p>
                ))}
            </div>
            {!hideButton && (
              <button onClick={removeFromBasket}>Remove from Basket</button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
