import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
  ...props
}) {
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  const shouldRedirect = isLoggedin && restricted;

  return (
    <Route {...props}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}

export default PublicRoute;
