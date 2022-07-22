import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

const MessagesContainer = asyncComponent(() =>
  import(
    /* webpackChunkName:"MessagesSettings" */ "../modules/BuyerMessages/container/MessagesContainer"
  ).then((module) => module.default)
);

const LoginContainer = asyncComponent(() =>
  import(
    /* webpackChunkName:"Login" */ "../modules/MyLogin/container/LoginContainer"
  ).then((module) => module.default)
);

export const getRoutes = () => {
  // console.log('Inside getRoutes');
  return (
    <Router>
      <Switch>
        <Route
          exact={true}
          path="/mymessagesreact"
          component={
            readCookie("im_iss") == "" ? LoginContainer : MessagesContainer
          }
        ></Route>
      </Switch>
    </Router>
  );
};
export default getRoutes;
