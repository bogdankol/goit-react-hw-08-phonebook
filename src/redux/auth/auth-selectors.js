import { useSelector } from "react-redux";

const getIsLoggedIn = (state) => {

  return state.auth.token ? true : false;
};
const getName = (state) => state.auth.user.name;
const getIsFetchingUser = (state) => state.auth.isFetchingUser;

const authSelectors = {
  getIsLoggedIn,
  getName,
  getIsFetchingUser,
};

export default authSelectors;
