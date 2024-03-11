import React from "react";
import "./RecipePages.css";
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import ShowHide from "../components/ShowHide";
import NavBar from "../components/Header/Navbar/NavBar";

const RecipePages = () => {
  return (
    <div className="recipe-list">
      <LandingPage />

      <ShowHide></ShowHide>

      <NavBar />
      {/* <div>
          {netflixMovies.map((movie)=>{
              return (
                  <Link to={`/detail/${movie.id}`}>
                      <Card items= {movie}/>
                  </Link>
                  
              )
          })}
        </div> */}
    </div>
  );
};

export default RecipePages;
