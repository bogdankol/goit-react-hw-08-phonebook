import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  return (
    <nav className={s.nav}>
      <NavLink to="/" exact className={s.link} activeClassName={s.activeLink}>
        Главная
      </NavLink>

      {isLoggedin && (
        <NavLink
          to="/contacts"
          exact
          className={s.link}
          activeClassName={s.activeLink}
        >
          Контакты
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
