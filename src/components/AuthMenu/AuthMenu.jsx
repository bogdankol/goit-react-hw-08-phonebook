import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './AuthMenu.module.css';

function AuthMenu() {
    return (
        <div className={s.div}>
            <NavLink to="registration" className={s.navLink} activeClassName={s.active}>Registration</NavLink>
            <NavLink to="login" className={s.navLink} activeClassName={s.active}>Login</NavLink>
        </div>
    )
}

export default AuthMenu
