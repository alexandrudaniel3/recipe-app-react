import React, {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard";
import urls from '../urls';
import './styles/Home.css';
import SearchBar from "../components/SearchBar";
import CategoryButton from "../components/CategoryButton";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

export default function Home() {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const results = await fetch(urls.listCategoriesWithDetails)
            .then(response => response.json())
            .then(data => data.categories);

        setCategories(results);
    }
    const searchByCategory = async (category) => {
        const results = await fetch(urls.filterByCategory + category)
            .then(response => response.json())
            .then(data => data.meals);


        setRecipes([]);
        setRecipes(results);
    }

    const searchRecipes = async () => {
        const results = await fetch(urls.searchByName + searchInput)
            .then(response => response.json())
            .then(data => data.meals);

        if (!results) {
            alert('No recipes found.');
            setSearchInput('');
            return;
        }

        if (searchParams.has('category')) {
            searchParams.delete('category');
        }

        setSearchParams({'search': searchInput});

        setRecipes([]);
        setRecipes(results);
        setSearchInput('');
    };

    const getRandomRecipe = async () => {
        return await fetch(urls.getRandom)
            .then(response => response.json())
            .then(data => data.meals[0]);
    };

    const getMultipleRandomRecipes = async () => {
        const newRecipes = [];

        for (let i = 0; i < 12; i++) {
            const randomRecipe = await getRandomRecipe();
            newRecipes.push(randomRecipe);
        }

        setRecipes([]);
        setRecipes(newRecipes);
    };

    useEffect(() => {
        document.title = 'RecipeRealm';
    }, []);

    useEffect(() => {
        getCategories();
        if (searchParams.has('category')){
            searchByCategory(searchParams.get('category'));
        } else if (searchParams.has('search')){

        } else {
            getMultipleRandomRecipes();
        }

    }, [searchParams]);


    return (
        <div>
            <div id='landing-header'>
                <div id='welcome-container'>
                    <h1>Welcome to <span id='welcome-logo'>RecipeRealm</span></h1>
                    <p>Search for your favorite dish or discover new recipes now!</p>
                </div>
                <SearchBar
                    id='recipe-search'
                    buttonTitle='Search'
                    submitHandler={searchRecipes}
                    value={searchInput}
                    changeHandler={setSearchInput}/>
            </div>
            <div id='home'>
                <div className='categories-container'>
                    {categories.map(category => (
                        <CategoryButton
                            current={searchParams.get('category')}
                            title={category.strCategory}
                            // categoryHandler={() => navigation('/' + category.strCategory)}/>
                            categoryHandler={() => setSearchParams({'category': category.strCategory})}
                        />
                    ))}
                </div>

                <div className='recipes'>
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.idMeal}
                            props={recipe}
                            id={'home-page-recipe-card'}/>
                    ))}
                </div>
            </div>
        </div>
    );
}