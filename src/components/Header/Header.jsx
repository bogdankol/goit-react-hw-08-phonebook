import React from "react";
import s from "./Header.module.css";
import Navigation from "../Navigation/Navigation";
import AuthMenu from "../AuthMenu/AuthMenu";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";

function Header() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <div className={s.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthMenu />}
    </div>
  );
}

export default Header;
