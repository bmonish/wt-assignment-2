import React from "react";
import "../css/Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header__title">
          <h1>Web Tech Store</h1>
        </div>
      </Link>

      <div className="header__right">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span>Hello, {user ? `${user.email}` : "Guest"}</span>
            <br />
            <span>{user ? "Sign Out" : " Sign In"}</span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <br />
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="header__option">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span>{basket?.length}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
