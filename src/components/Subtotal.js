import React from "react";
import "../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { db } from "../firebase";
import firebase from "firebase";

function Subtotal() {
  const [{ basket, user }, dispatch] = useStateValue();

  const placeOrder = () => {
    console.log("Order Placed");
    dispatch({
      type: "EMPTY_BASKET",
    });

    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .add({
        basket: basket,
        amount: getBasketTotal(basket),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong> {value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        //   value={getBasketTotal(basket)}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={placeOrder}>Proceeed to Checkout</button>
    </div>
  );
}

export default Subtotal;
