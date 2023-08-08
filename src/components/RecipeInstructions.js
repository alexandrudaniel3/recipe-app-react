import './styles/RecipeInstructions.css';

export default function RecipeInstructions({recipeData}) {
    console.log(recipeData.strInstructions);
    return(
        <div className='recipe-instructions'>
            <p className='instructions'>{recipeData.strInstructions}</p>
        </div>
    );
}