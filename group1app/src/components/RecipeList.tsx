import React from "react";
import RecipeComponent from "./RecipeComponent";
import { Recipe } from "./types";

interface RecipeListProps {
  recipes: Recipe[];
  updateRecipe: (recipeId: string) => void;
  deleteRecipe: (recipeId: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  updateRecipe,
  deleteRecipe,
}) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeComponent
          key={recipe._id}
          recipe={recipe}
          onSwitchComplete={() => updateRecipe(recipe._id)}
          handleDelete={() => deleteRecipe(recipe._id)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
