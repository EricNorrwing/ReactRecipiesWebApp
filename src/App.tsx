import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Ingredient, Recipe } from "./components/types";
import RecipeComponent from "./components/RecipeComponent";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [addRecipeTitle, setAddRecipeTitle] = useState('')
  const [addRecipeDescription, setAddRecipeDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [time, setTime] = useState('')
  const [categories, setCategories] = useState('')
  const [instructions, setInstructions] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')

  const URL = "https://sti-java-grupp1-5znlnp.reky.se";
  //const recipeId = "65e5c741a997d20ee1acd0c7";

  //GET
  const fetchRecipes = async () => {
    const response = await axios.get(`${URL}/recipes`);

    if (response.status === 200) {
      setRecipes(response.data);

      console.log("recipe", response.data);
    }
  };

  //PATCH
  // Funktion för att uppdatera en specifik todo genom att göra en PUT-förfrågan till API:et
  const updateRecipe = async (recipeId: string) => {
    // Hittar todo som ska uppdateras baserat på dess ID
    const recipeToUpdate = recipes.find((recipe) => recipe._id === recipeId);

    // Om todo inte hittas, avslutas funktionen
    if (!recipeToUpdate) {
      return;
    }

    // Skapar en request body för att skicka med uppdaterad information om todo
    const requestBody = {
      completed: !recipeToUpdate.completed,
    };

    // Skickar en PUT-förfrågan för att uppdatera uppgiften med ny information
    const response = await axios.patch(
      `${URL}/recipes/${recipes}`,
      requestBody
    );

    // Om PUT-förfrågan är lyckad (statuskod 200)
    if (response.status === 200) {
      // Uppdaterar state för todo
      const updatedTodosAfterRequest = recipes.map((existingRecipe) => {
        // Om todo ID inte matchar ID:t för den uppdaterade todo, returnera originaltodo
        if (existingRecipe._id !== recipeId) return existingRecipe;

        // Annars, uppdatera todo med den nya completed-statusen
        return {
          ...existingRecipe,
          completed: !recipeToUpdate.completed,
        };
      });
      // Uppdaterar state för todo med de uppdaterade todo
      setRecipes(updatedTodosAfterRequest);
    }
  };

  //POST
  const addRecipe = () => {
    const originalRecipes = [...recipes];
    const newRecipe = {
      title: addRecipeTitle,
      description: addRecipeDescription,
      imageUrl: imgUrl,
      timeInMins: time,
      categories: categories,
      instructions: instructions,
      
    };
    setRecipes([newRecipe, ...recipes])
    /* setAddRecipeTitle('')
    setAddRecipeDescription('') */
    ;

    axios
      .post(`${URL}/recipes`, newRecipe)
      .then(({ data: savedRecipe }) => setRecipes([...savedRecipe, ...recipes]))
      .catch((error) => {
        console.error(error);
        setRecipes(originalRecipes);
      });
  };

  //DELETE
  const deleteRecipe = async (recipeId: string) => {
    const response = await axios.delete(`${URL}/recipes/${recipeId}`);

    if (response.status === 204) {
      const newRecipes = recipes.filter(
        (recipesCopiaFilter) => recipesCopiaFilter._id !== recipeId
      );
      setRecipes(newRecipes);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeComponent
            key={recipe._id}
            recipe={recipe}
            onSwitchComplete={updateRecipe}
            handleDelete={deleteRecipe}
          />
        ))}
      </div>
      <button className="btn-add" onClick={fetchRecipes}>
        Show all the recipes
      </button>{" "}
      <div>
        <br />
        <input type='text' value={addRecipeTitle} onChange={(eventTitle) => setAddRecipeTitle(eventTitle.target.value)} placeholder='title' />
        <br />
        <input type='text' value={addRecipeDescription} onChange={(e) => setAddRecipeDescription(e.target.value)} placeholder='description' />
        <br />
        <input type='text' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder='ImageURL' />
        <br />
        <input type='text' value={time} onChange={(e) => setTime(e.target.value)} placeholder='timeInMins' />
        <br />
        <input type='text' value={categories} onChange={(e) => setCategories(e.target.value)} placeholder='categories' />
        <br />
        <input type='text' value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder='instructions' />
        <br />
        <br />
        {/* <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Ingredients Name' />
        <br />
        <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Ingredients Amount' />
        <br />
        <input type='text' value={unit} onChange={(e) => setUnit(e.target.value)} placeholder='Ingredients Unit' />
        <br /> */}
      </div>{" "}
      <br />
      <button className="btn-add" onClick={addRecipe}>
        Add a new recipe
      </button>{" "}
      <br /> <br />
      {/* <button className="btn-add" onClick={deleteRecipe}>
        Delete a recipe
      </button>
      <br /> */}
    </>
  );
}

export default App;
