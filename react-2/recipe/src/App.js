import React, {useEffect, useState} from "react";
import Recipe from "./recipe";
import './App.css';

const App = () => {
  const APP_ID = "02ad8b41";
  const APP_KEY = "25f6fc7251a15e46a3003add66f23568";

  const [recipes, setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  // const [counter, setCounter] = useState(0);
  useEffect(()=>{
    // console.log("Effect has been run")
    getRecipes();
  }, [query])
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
  }
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar"
          type="text" 
          onChange={updateSearch}
          value ={search}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {/* <h1 onClick={() => setCounter(counter+1)}>{counter}</h1> */}
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

//26:31