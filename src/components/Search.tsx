import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import "./Search.css"
import axios from "axios";

/* export default class Search extends Component
{
    render() {
        return (
          <>
          Hello from Search
          </>
       )    
    }    
} */

export const Search = () => {
    const [input, setInput] = useState("")
    
    const URL = "https://sti-java-grupp1-5znlnp.reky.se";

    const fetchData = async (value) => {
        const response = await axios.get(`${URL}/recipes`);

        if (response.status === 200) {
            setInput(response.data);
      
            console.log("recipe", response.data);
          }
    }



    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input 
        placeholder="Search recipe..." 
        value={input} 
        onChange={(e) => handleChange(e.target.value)} 
        />
        </div>
    )
}