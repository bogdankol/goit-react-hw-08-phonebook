import "./App.css";
import Container from "./components/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import HomePageView from "./views/HomePageView";
import { Switch, Route } from "react-router-dom";
import RegisterView from "./views/RegistrationView";
import LoginView from "./views/LoginView";
import { authOperations } from "./redux/auth";
import ContactsView from "./views/ContactsView.jsx";
import { authSelectors } from "./redux/auth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const dispatch = useDispatch();
  const isFetchingUser = useSelector(authSelectors.getIsFetchingUser);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return isFetchingUser ? (
    <h1>Processing...processing!!!</h1>
  ) : (
    <Container>
      <Header />

      <Switch>
        <PublicRoute exact path="/">
          <HomePageView />
        </PublicRoute>
        <PublicRoute
          exact
          path="/registration"
          redirectTo="/contacts"
          restricted
        >
          <RegisterView />
        </PublicRoute>
        <PublicRoute exact path="/login" restricted redirectTo="/contacts">
          <LoginView />
        </PublicRoute>

        <PrivateRoute path="/contacts">
          <ContactsView />
        </PrivateRoute>
      </Switch>
    </Container>
  );
}

export default App;
