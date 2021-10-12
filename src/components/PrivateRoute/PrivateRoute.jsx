import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authSelectors } from "../../redux/auth";

function PrivateRoute({ children, redirectTo = "/", ...routeProps }) {
  const isLoggedin = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedin ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}

export default PrivateRoute;
