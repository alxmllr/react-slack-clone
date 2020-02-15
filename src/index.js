import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import firebase from "./firebase";
import App from "./components/App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Spinner from "./components/Spinner";

import UserProvider, { UserContext } from "./contexts/user";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

const Root = ({ history }) => {
  const {
    state: { user, loading: userIsLoading },
    dispatch
  } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: "setUser", payload: user });
        history.push("/");
      } else {
        dispatch({ type: "clearUser" });
        history.push("/login");
      }
    });
  }, []);

  if (userIsLoading) {
    return <Spinner />;
  }

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <UserProvider>
      <RootWithAuth />
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
