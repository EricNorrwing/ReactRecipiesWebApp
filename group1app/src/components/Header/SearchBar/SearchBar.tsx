import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import axios from "axios";
import Recipes from "../../../pages/Recipes";

// SearchBar component
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const URL = "https://sti-java-grupp1-5znlnp.reky.se";

  const fetchData = async (value) => {
    try {
      const response = await axios.get(`${URL}/recipes`);
      if (response.status === 200) {
        const results = response.data.filter((recipe) => {
          return (
            value &&
            recipe &&
            recipe.title &&
            recipe.title.toLowerCase().includes(value)
          );
        });
        setResults(results);
        console.log("Search Results", results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search recipe..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
