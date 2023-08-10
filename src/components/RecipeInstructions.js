import './styles/RecipeInstructions.css';

export default function RecipeInstructions({recipeData}) {
    return (
        <div className='recipe-instructions-container'>
            <div className='recipe-instructions-title-container'>
                <h1 className='recipe-instructions-title'>
                    Instructions:
                </h1>
            </div>
            <p className='recipe-instructions'>{recipeData.strInstructions}</p>
        </div>
    );
}