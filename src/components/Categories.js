import CategoryButton from "./CategoryButton";
import React, {useEffect, useState} from "react";
import urls from "../urls";
import {useSearchParams} from "react-router-dom";

export default function Categories({selectedCategory, setSelectedCategory}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        if (!sessionStorage.getItem("categories"))
        {
            const results = await fetch(urls.listCategoriesWithDetails)
                .then(response => response.json())
                .then(data => data.categories);

            setCategories(results.sort((a, b) => a.strCategory.localeCompare(b.strCategory)));
            sessionStorage.setItem("categories", JSON.stringify(results));
        } else {
            setCategories(JSON.parse(sessionStorage.getItem("categories")));
        }

    }

    useEffect(() => {
        getCategories();
    }, []);

    return (<div className='categories-container'>
        <CategoryButton
            key={'Featured'}
            current={selectedCategory}
            title={'Featured'}
            categoryHandler={() => {
                setSearchParams({})
                setSelectedCategory('Featured')
        }} />
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
    </div>)
}