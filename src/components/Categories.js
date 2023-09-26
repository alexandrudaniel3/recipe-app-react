import CategoryButton from "./CategoryButton";
import React, {useEffect, useState} from "react";
import urls from "../urls";
import {useSearchParams} from "react-router-dom";

export default function Categories({selectedCategory, setSelectedCategory}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        if (!sessionStorage.getItem("categories")) {
            let results = await fetch(urls.listCategoriesWithDetails)
                .then(response => response.json())
                .then(data => data.categories);

            results = results.sort((a, b) => a.strCategory.localeCompare(b.strCategory));
            results.unshift(
                {
                    idCategory: 1,
                    strCategory: "Featured",
                    strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
                    strCategoryDescription: "Featured recipes"
                });

            setCategories(results);
            sessionStorage.setItem("categories", JSON.stringify(results));
        } else
            {
                setCategories(JSON.parse(sessionStorage.getItem("categories")));
            }

        }

        const displayCategories = () => {
            const categoriesList = <div className='categories-container'>
                {categories.map(category => (
                    <CategoryButton
                        key={category.strCategory}
                        current={selectedCategory}
                        title={category.strCategory}
                        // categoryHandler={() => navigation('/' + category.strCategory)}/>
                        categoryHandler={() => {
                            setSearchParams({'category': category.strCategory})
                            setSelectedCategory(category.strCategory)
                        }}
                    />
                ))}
            </div>

            return categoriesList;
        }

        useEffect(() => {
            getCategories();
        }, []);

        return (displayCategories())
    }
