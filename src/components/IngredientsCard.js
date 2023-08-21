import './styles/IngredientsCard.css';

export default function IngredientsCard({recipeData}) {
    let ingredients = JSON.parse(localStorage.getItem(recipeData.idMeal));

    if (!ingredients) {
        ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (!recipeData["strIngredient" + i]) {
                break;
            }
            ingredients.push(
                {
                    checked: false,
                    measure: recipeData["strMeasure" + i],
                    ingredient: recipeData["strIngredient" + i],
                }
            );
        }

        localStorage.setItem(recipeData.idMeal, JSON.stringify(ingredients));
    }

    return (
        <div className='ingredients-card' id={'ingredients-card' + recipeData.idMeal}>
            <div className='ingredients-title-container'>
                <h1 className='ingredients-title'>Ingredients:</h1>
            </div>
            <div className='ingredients-list'>
                {ingredients.map((ingredient, index) => (
                    <div className='ingredient' key={index}>
                        <input type='checkbox' value={ingredient.checked}/>
                        <p>{ingredient.measure}</p>
                        <p>{ingredient.ingredient}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}