import React, { Component, useState } from "react";
import logo from "../../../assets/flavorfiesta-high-resolution-logo-black-transparent.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResultsList } from "../SearchBar/SearchResultsList";

const NavBar = () => {
  const [results, setResults] = useState([]);
  return (
    <>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>{" "}
        <br />
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
        <div className="navbar">
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="nav-link">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
