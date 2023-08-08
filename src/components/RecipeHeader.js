import './styles/RecipeHeader.css';

export default function RecipeHeader({recipeData}) {
    console.log(recipeData.strMealThumb);
    return(
        <div
            className='recipe-header'
            id={'recipe-header' + recipeData.idMeal}
            style={{
                backgroundImage: `url(${recipeData.strMealThumb})`,
            }}>
            <div className='title-container'>
                <h1 className='recipe-title'>{recipeData.strMeal}</h1>
            </div>
        </div>
    );
}