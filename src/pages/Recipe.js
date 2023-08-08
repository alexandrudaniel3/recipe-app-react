import {useParams} from "react-router-dom";
import urls from "../urls";
import {useEffect, useState} from "react";
import IngredientsCard from "../components/IngredientsCard";
import RecipeInstructions from "../components/RecipeInstructions";
import './styles/Recipe.css';
import RecipeHeader from "../components/RecipeHeader";

export default function Recipe() {
    const params = useParams();
    const [recipeData, setRecipeData] = useState({});

    const getRecipe = async () => {
        const result = await fetch(urls.getById + params.id)
            .then(response => response.json())
            .then(data => data.meals[0]);
        console.log(result);
        setRecipeData(result);
    };

    useEffect(() => {
        getRecipe();
    }, []);

    return (
        <div className='recipe-page'>
            <div className='recipe-container'>
                <RecipeHeader recipeData={recipeData}/>
                <IngredientsCard recipeData={recipeData}/>
                <RecipeInstructions recipeData={recipeData}/>
            </div>
            <div className='side-bar'>

            </div>
        </div>
    );
}