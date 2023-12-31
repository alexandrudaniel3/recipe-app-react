import {useParams} from "react-router-dom";
import urls from "../urls";
import React, {useEffect, useState} from "react";
import IngredientsCard from "../components/IngredientsCard";
import RecipeInstructions from "../components/RecipeInstructions";
import './styles/Recipe.css';
import RecipeHeader from "../components/RecipeHeader";
import RecipeCard from "../components/RecipeCard";
import VideoCard from "../components/VideoCard";
import ShareCard from "../components/ShareCard";
import LoadingCircle from "../components/LoadingCircle";

export default function Recipe() {
    const params = useParams();
    const [recipeData, setRecipeData] = useState({});
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRecipe = async () => {
        await fetch(urls.getById + params.id)
            .then(response => response.json())
            .then(data => {
                setRecipeData(data.meals[0]);
                setLoading(false);
            });
    };

    const getRecommendedRecipes = async () => {
        await fetch(urls.filterByCategory + recipeData.strCategory)
            .then(response => response.json())
            .then(data => {
                setRecommendedRecipes(data.meals.slice(0, 5));
            });
    }

    useEffect(() => {
        setLoading(true);
        getRecipe();
        window.scrollTo(0, 0);
    }, [params.id]);

    useEffect(() => {
        if (recipeData.strCategory) {
            getRecommendedRecipes();
        }

        if (recipeData.strMeal) {
            document.title = recipeData.strMeal;
        }
    }, [recipeData])

    const displayRecipe = () => {
        return (
            <div className='recipe-container'>
                <RecipeHeader recipeData={recipeData}/>
                <IngredientsCard recipeData={recipeData}/>
                <RecipeInstructions recipeData={recipeData}/>
                <ShareCard/>
            </div>
        )
    }

    return (
        <div className='recipe-page'>
            {loading ? <LoadingCircle /> : displayRecipe()}
            {loading ? null : <div className='side-bar'>
                <div className='recommended-title-container'>
                    <h1 className='recommended-title'>
                        Recommendations:
                    </h1>
                </div>
                <div className='recommended-recipes'>
                    {recommendedRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe.idMeal}
                            props={recipe}
                            id='recipe-page'/>
                    ))}
                </div>
            </div>}
        </div>
    );
}
