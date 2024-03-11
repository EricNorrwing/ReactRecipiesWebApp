import React, { Component } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Recipes from "./Recipes";

export default class Home extends Component {
  render() {
    return (
      <Header>
        <Link to="recipes" className="text-uppercase"></Link>
      </Header>
    );
  }
}
