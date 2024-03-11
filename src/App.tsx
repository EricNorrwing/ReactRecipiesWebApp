import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Ingredient, Recipe } from "./components/types";
import RecipeComponent from "./components/RecipeComponent";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Default from "./pages/Default";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/Header/Navbar/NavBar";
import Hero from "./components/Hero";
import RecipeList from "./components/RecipeList";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [addRecipeTitle, setAddRecipeTitle] = useState("");
  const [addRecipeDescription, setAddRecipeDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [time, setTime] = useState<number>();
  const [categories, setCategories] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState<number>(0);
  const [ingredientUnit, setIngredientUnit] = useState("");

  const URL = "https://sti-java-grupp1-5znlnp.reky.se";

  // Function to add an Ingredient
  const addIngredient = () => {
    const newIngredient: Ingredient = {
      name: ingredientName,
      amount: Number(ingredientAmount),
      unit: ingredientUnit,
    };

    setIngredients([...ingredients, newIngredient]);

    /* setIngredientName("")
    setIngredientAmount("")
    setIngredientUnit("") */
  };

  //GET
  const fetchRecipes = async () => {
    const response = await axios.get(`${URL}/recipes`);

    if (response.status === 200) {
      setRecipes(response.data);

      console.log("Recipes", response.data);
    }
  };

  //PATCH
  const updateRecipe = async (recipeId: string) => {
    const recipeToUpdate = recipes.find((recipe) => recipe._id === recipeId);

    if (!recipeToUpdate) {
      return;
    }

    const requestBody = {
      completed: !recipeToUpdate.completed,
    };

    const response = await axios.patch(
      `${URL}/recipes/${recipeId}`,
      requestBody
    );

    if (response.status === 200) {
      const updatedTodosAfterRequest = recipes.map((existingRecipe) => {
        if (existingRecipe._id !== recipeId) return existingRecipe;

        return {
          ...existingRecipe,
          completed: !recipeToUpdate.completed,
        };
      });

      setRecipes(updatedTodosAfterRequest);
    }
  };

  //POST
  const addRecipe = () => {
    const originalRecipes = [...recipes];
    const categoryArray = categories
      .split(",")
      .map((category) => category.trim());
    const instructionArray = instructions
      .split(",")
      .map((instruction) => instruction.trim());

    const newIngredient = {
      name: ingredientName,
      amount: ingredientAmount,
      unit: ingredientUnit,
    };

    const newRecipe = {
      title: addRecipeTitle,
      description: addRecipeDescription,
      imageUrl: imgUrl,
      timeInMins: time,
      categories: categoryArray,
      instructions: instructionArray,
      ingredients: newIngredient,
    };

    setRecipes([newRecipe, ...recipes]);

    setIngredients([]);

    /* setAddRecipeTitle('')
    setAddRecipeDescription('') */

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
      <BrowserRouter>
        <main>
          <div className="header-list">
            <Navbar />
            {/* <Hero /> */}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes recipes={recipes} />} />
            <Route path="/recipes/:id" element={<SingleRecipe />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route element={<Default />} />
          </Routes>
        </main>
      </BrowserRouter>
      {/* <RecipeList
        recipes={recipes}
        updateRecipe={updateRecipe}
        deleteRecipe={deleteRecipe}
      />
      <br /> */}
      <button className="btn-add" onClick={fetchRecipes}>
        Test FetchButton
      </button>{" "}
      <br />
      <div className="input-wrapper-home">
        <br />
        <input
          type="text"
          value={addRecipeTitle}
          onChange={(eventTitle) => setAddRecipeTitle(eventTitle.target.value)}
          placeholder="title: string"
        />
        <br />
        <input
          type="text"
          value={addRecipeDescription}
          onChange={(e) => setAddRecipeDescription(e.target.value)}
          placeholder="description: string"
        />
        <br />
        <input
          type="text"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder="ImageUR: string"
        />
        <br />
        <input
          type="text"
          value={time || ""}
          onChange={(e) => setTime(Number(e.target.value))}
          placeholder="timeInMins: number"
        />
        <br />
        <textarea
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="categories: [str] comma seperated"
        />
        <br />
        <textarea
          type="text"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="instructions: [str] comma seperated"
        />
        <br />
        <h3>Ingredients</h3>
        <p>
          If you want to add more than one Ingredient. <br /> Then please fill
          in formular and click on add Ingredient Button first before adding a
          new Recipe.
        </p>
        <input
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder="Ingredient Name: string"
        />
        <br />
        <input
          type="text"
          value={ingredientAmount}
          onChange={(e) => setIngredientAmount(Number(e.target.value))}
          placeholder="Ingredient Amount: Number"
        />
        <br />
        //TODO Fix Description in box
        <input
          type="text"
          value={ingredientUnit}
          onChange={(e) => setIngredientUnit(e.target.value)}
          placeholder="Ingredient Unit: string"
        />
        <br />
        <button className="btn-add-ingredient" onClick={addIngredient}>
          Add Ingredient
        </button>
        <button className="btn-add" onClick={addRecipe}>
          Add a new recipe
        </button>{" "}
        <br /> <br />
      </div>
    </>
  );
}

export default App;
