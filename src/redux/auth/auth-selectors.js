import { useSelector } from "react-redux";

const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getName = (state) => state.auth.user.name;
const getIsFetchingUser = (state) => state.auth.isFetchingUser;

const authSelectors = {
  getIsLoggedIn,
  getName,
  getIsFetchingUser,
};

export default authSelectors;
