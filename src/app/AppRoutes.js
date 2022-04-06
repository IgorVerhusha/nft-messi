import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "../components/Home";
import Error404 from '../components/Error/404';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import Register from '../components/auth/Register';
import Account from '../components/settings/Account';
import Profile from '../components/settings/Profile';
import Contact from "../components/Contact";
import BidHistory from "../components/BidHistory";
import LoginPanel from "../components/auth/LoginPanel";
import VerifyIdentity from "../components/auth/VerifyIdentity";
import UserDetails from "../components/auth/UserDetails";
import ConfirmEmail from "../components/auth/ConfirmEmail";
import ForgotPassword from "../components/auth/ForgotPassword";
import ChangePassword from "../components/auth/ChangePassword";
import Auctions from "../components/admin/Auctions";
import Users from "../components/admin/Users";
import Bids from "../components/admin/Bids";
import Auction from "../components/Auction";
import { useAuthContext } from "../services/AuthService";
import {useMediaQuery} from 'react-responsive'
import {TABLET_OR_MOBILE_MAX_WIDTH} from '../services/Common.js'
import AuctionMobile from '../components/AuctionMobile/index.js'


const AppRouter = (props) => {

  console.log("================================== AppRouter ======================================");
    const isTabletOrMobile = useMediaQuery({ maxWidth: TABLET_OR_MOBILE_MAX_WIDTH });

  function AuthenticatedRoute({ component: Component, ...rest }) {
    // Get Auth Context
    const auth = useAuthContext();

    return (
      <Route
        {...rest}
        render={(props, location) =>
          auth.state.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  function AdminRoute({ component: Component, ...rest }) {
    // Get Auth Context
    const auth = useAuthContext();

    return (
      <Route
        {...rest}
        render={(props, location) =>
          auth.state.isAuthenticated && auth.state.account_type == "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auction" exact component={Auction} />
        <Route path="/login" exact component={Login} />
        <Route path="/loginpanel" exact component={LoginPanel} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={Register} />
        <Route path="/verifyidentity" exact component={VerifyIdentity} />
        <Route path="/userdetails" exact component={UserDetails} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/confirmemail/:user_id/:confirmation_code" exact component={ConfirmEmail} />
        <Route path="/forgot_password" exact component={ForgotPassword} />
        <Route path="/change_password/:user_id/:confirmation_code" exact component={ChangePassword} />
        <AuthenticatedRoute path="/settings/account" component={Account} />
        <AuthenticatedRoute path="/settings/profile" component={Profile} />
        <AuthenticatedRoute path="/bidhistory" component={BidHistory} />
        <AdminRoute path="/admin/auctions" exact component={Auctions} />
        <AdminRoute path="/admin/users" component={Users} />
        <AdminRoute path="/admin/bids" component={Bids} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
}

export default AppRouter;
