import './styles/IngredientsCard.css';
import React, { useState, useEffect } from 'react';

export default function IngredientsCard({ recipeData }) {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const storedIngredients = JSON.parse(sessionStorage.getItem(recipeData.idMeal));

        if (!storedIngredients) {
            const newIngredients = [];

            for (let i = 1; i <= 20; i++) {
                if (!recipeData["strIngredient" + i]) {
                    break;
                }
                newIngredients.push({
                    checked: false,
                    measure: recipeData["strMeasure" + i],
                    ingredient: recipeData["strIngredient" + i],
                });
            }

            setIngredients(newIngredients);
            sessionStorage.setItem(recipeData.idMeal, JSON.stringify(newIngredients));
        } else {
            setIngredients(storedIngredients);
        }
    }, [recipeData.idMeal]);

    const ingredientCheckHandler = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].checked = !updatedIngredients[index].checked;

        setIngredients(updatedIngredients);
        sessionStorage.setItem(recipeData.idMeal, JSON.stringify(updatedIngredients));
    };

    return (
        <div className='ingredients-card' id={'ingredients-card' + recipeData.idMeal}>
            <div className='ingredients-title-container'>
                <h1 className='ingredients-title'>Ingredients:</h1>
            </div>
            <div className='ingredients-list'>
                {ingredients.map((ingredient, index) => (
                    <div className='ingredient' key={index}>
                        <input
                            id={index.toString()}
                            type='checkbox'
                            checked={ingredient.checked}
                            onChange={() => ingredientCheckHandler(index)}
                        />
                        <label for={index.toString()}>
                            {ingredient.measure + ' ' + ingredient.ingredient}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
