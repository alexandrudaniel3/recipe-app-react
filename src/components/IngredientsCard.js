import './styles/IngredientsCard.css';

export default function IngredientsCard({recipeData}) {
    console.log(recipeData.idMeal);
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
            <div className='ingredients-list'>
                {ingredients.map(ingredient => (
                <div className='ingredient'>
                    <input type='checkbox' value={ingredient.checked} />
                    <p>{ingredient.measure}</p>
                    <p>{ingredient.ingredient}</p>
                </div>
                ))}
            </div>
        </div>
    )
}