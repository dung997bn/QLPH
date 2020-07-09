import React, { Fragment } from "react";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { AzureAD, LoginType, AuthenticationState } from "react-aad-msal";
import { auth365ReduxStore } from "../reducers/auth365Reducer";
import { auth365Store } from "../stores/auth365Store";
import storeApp from "../stores/storeApp";
import WeeklySite from "./sites/WeeklySite";
import DailySite from "./sites/DailySite";
import BodyHeader from "./pages/BodyHeader";
import BookingDetailModal from "./modals/BookingDetailModal";
import BookingModal from "./modals/BookingModal";
const Home = () => {
  const options = auth365Store.getProviderOptions();
  options.loginType = LoginType.Popup;
  auth365Store.setProviderOptions(options);

  return (
    <Provider store={storeApp}>
      <AzureAD provider={auth365Store} reduxStore={auth365ReduxStore}>
        {({ login, logout, authenticationState, accountInfo }) => {
          const isInProgress =
            authenticationState === AuthenticationState.InProgress;
          const isAuthenticated =
            authenticationState === AuthenticationState.Authenticated;
          const isUnauthenticated =
            authenticationState === AuthenticationState.Unauthenticated;
          const info = {
            accountInfo,
            authenticationState,
            isInProgress,
            isAuthenticated,
            isUnauthenticated,
            login,
            logout,
          };
          return (
            <Fragment>
              <Router>
                <Navbar info={info} />
                <BodyHeader info={info} />
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={(props) => <WeeklySite {...props} info={info} />}
                  />
                  <Route
                    path="/daily"
                    exact
                    render={(props) => <DailySite {...props} info={info} />}
                  />
                </Switch>
                <Footer />
                <BookingDetailModal />
                <BookingModal info={info} />
              </Router>
            </Fragment>
          );
        }}
      </AzureAD>
    </Provider>
  );
};

export default Home;
