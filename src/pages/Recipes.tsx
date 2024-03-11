// Recipes.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Recipe } from "../components/types";
import RecipeList from "../components/RecipeList";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const URL = "https://sti-java-grupp1-5znlnp.reky.se";

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get(`${URL}/recipes`);

      if (response.status === 200) {
        setRecipes(response.data);
      }
    };

    fetchRecipes();
  }, []);

  return <RecipeList recipes={recipes} />;
};

export default Recipes;
