import React from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import { Button } from "@material-ui/core";
import s from "./UserMenu.module.css";
import { authOperations } from "../../redux/auth";
import { useDispatch } from "react-redux";

function UserMenu() {
  const name = useSelector(authSelectors.getName);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(authOperations.logOut());
  };
  return (
    <div className={s.div}>
      <p>Hello {name}, nice to see you!</p>
      <Button color="primary" variant="contained" onClick={onClickHandler}>
        Logout
      </Button>
    </div>
  );
}

export default UserMenu;
