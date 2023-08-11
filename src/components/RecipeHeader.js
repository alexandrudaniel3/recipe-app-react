import './styles/RecipeHeader.css';

export default function RecipeHeader({recipeData}) {
    let tags = '';
    if (recipeData.strTags != null) {
        tags = <p>Tags: {recipeData.strTags}</p>;
    }
    return (
        <div className='recipe-header-wrapper' id={'recipe-header' + recipeData.idMeal}>
            <div className='recipe-header'>
                <div className='image-container'>
                    <img className='recipe-header-image' src={recipeData.strMealThumb}/>
                </div>
                <div className='text-container'>
                    <h1 className='recipe-header-title'>{recipeData.strMeal}</h1>
                    <div className='recipe-source-container'>
                        <p>Category: {recipeData.strCategory}</p>
                        <p>Cuisine: {recipeData.strArea}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}