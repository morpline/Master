import React from "react";
import style from "./recipe.module.css";

const Recipe = ({title, calories, image, ingredients}) => {
    console.log(ingredients);
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>{calories}</p>
            <img src={image} alt="Get good"/>
        </div>
    );
}

// module.exports = Recipe;
export default Recipe;