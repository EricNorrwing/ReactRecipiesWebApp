import React, { Component, useState } from "react";
import RecipeList from "../components/RecipeList"

import { Search } from "../components/Search"
import { SearchResultsList } from "../components/SearchResultsList";


function Recipes() {
    const [results, setResults] = useState([]);

    return (
        <div>
            <div>
                <Search setResults={setResults} />
                <SearchResultsList results={results} />

            </div>
        </div>
    )


}

export default Recipes