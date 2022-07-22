import "../../css/MsgPage.css";
import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";
import ListComponent from "../List/List";
export default class MsgPageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="messageCenterContainer">
        <div className="msgpage">
          <div className="navigation">
            <Navigation />
          </div>
          <div className="search"></div>
          <div className="list">
            <ListComponent />
          </div>
          <div className="details"></div>
          <div className="chat"></div>
          <div className="message"></div>
        </div>
      </div>
    );
  }
}
