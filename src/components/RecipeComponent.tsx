import { Recipe } from "./types";

interface RecipeComponentProps {
  recipe: Recipe;
  onSwitchComplete: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  
}

const RecipeComponent = ({
  recipe,
  onSwitchComplete,
  handleDelete,
}: RecipeComponentProps) => {
  return (
    <div className="recipe-component">
      <input
        type="checkbox"
        checked={recipe.completed}
        onChange={() => onSwitchComplete(recipe._id)}
      />
      <p>{recipe.title}</p>
      <p className="recipe-delete" onClick={() => handleDelete(recipe._id)}>
        Delete
      </p>

    </div>

    
    

  );
};

export default RecipeComponent;
