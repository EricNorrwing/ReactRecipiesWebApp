import React, { Component, useState } from "react";

import { SearchBar } from "../components/SearchBar"
import { SearchResultsList } from "../components/SearchResultsList";


function Recipes() {
    const [results, setResults] = useState([]);

    return (
        <div>
            <div>
                <h3>Hello from Recipes</h3>
                <SearchBar setResults={setResults} />
                <SearchResultsList results={results} />
            </div>
        </div>
    )


}

export default Recipes