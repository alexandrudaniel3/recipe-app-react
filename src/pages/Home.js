import React, {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard";
import urls from '../urls';
import './styles/Home.css';
import SearchBar from "../components/SearchBar";
import CategoryButton from "../components/CategoryButton";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Categories from "../components/Categories";
import LoadingCircle from "../components/LoadingCircle";

export default function Home() {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigate();
    const [searchInput, setSearchInput] = useState(searchParams.has('search') ? searchParams.get('search') : '');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Featured');


    const searchByCategory = async (category) => {
        setLoading(true);

        if (searchParams.has('search')) {
            searchParams.delete('search');
        }
        setSelectedCategory(category);

        if (category === 'Featured') {
            getFeaturedRecipes();
            return;
        }
        const results = await fetch(urls.filterByCategory + category)
            .then(response => response.json())
            .then(data => data.meals);

        setRecipes(results);
        setLoading(false);

    }

    const searchRecipes = async () => {
        if (searchInput === '') {
            return;
        }

        setLoading(true);
        setSelectedCategory('');
        const results = await fetch(urls.searchByName + searchInput)
            .then(response => response.json())
            .then(data => data.meals);

        if (!results) {
            alert('No recipes found.');
            setSearchInput('');
            getFeaturedRecipes()
            return;
        }

        if (searchParams.has('category')) {
            searchParams.delete('category');
        }

        setSearchParams({'search': searchInput});

        setRecipes(results);
        setLoading(false);
    };


    const getFeaturedRecipes = async () => {
        setSelectedCategory('Featured');
        if (!sessionStorage.getItem("featuredRecipes")) {
            setLoading(true);
            const newRecipes = [];

            for (let i = 0; i < 12; i++) {
                const randomRecipe = await fetch(urls.getRandom)
                    .then(response => response.json())
                    .then(data => data.meals[0]);;
                newRecipes.push(randomRecipe);
            }

            setRecipes(newRecipes);
            setLoading(false);
            sessionStorage.setItem("featuredRecipes", JSON.stringify(newRecipes));
        } else {
            setRecipes(JSON.parse(sessionStorage.getItem("featuredRecipes")));
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'RecipeRealm';
        if (searchParams.has('category')) {
            searchByCategory(searchParams.get('category'));
        } else if (searchParams.has('search')) {
            searchRecipes(searchParams.get('search'));
        } else {
            getFeaturedRecipes();
        }
    }, []);

    useEffect(() => {
        if (searchParams.has('category')) {
            searchByCategory(searchParams.get('category'));
        } else if (searchParams.has('search')) {
            searchRecipes(searchParams.get('search'));
        } else {
            getFeaturedRecipes();
        }

    }, [searchParams]);

    useEffect(() => {
        if (selectedCategory !== '') {
            setSearchInput('');
        }
    }, [selectedCategory]);

    const displayRecipes = () => {
        const elements = <div className='recipes'>
            {recipes.map((recipe, index) => (
                <RecipeCard
                    key={index}
                    props={recipe}
                    id={'home-page-recipe-card'}/>
            ))}
        </div>;
        return elements;
    }


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
                    changeHandler={setSearchInput}
                />
            </div>
            <div id='home'>
                <Categories
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}/>
                {loading ? <LoadingCircle/> : displayRecipes()}
            </div>
        </div>
    );
}