import './styles/RecipeCard.css';
import {useNavigate} from "react-router-dom";

export default function RecipeCard({props}) {
    const navigation = useNavigate();
    return (
        <div className='recipe-card-wrapper'>
            <div className='recipe-card' id={props.idMeal} onClick={() => navigation('recipe/' + props.idMeal)}>
                <div className='recipe-thumbnail-container'>
                    <img
                        src={props.strMealThumb}
                        className='recipe-thumbnail'
                        alt='thumbnail'
                        style={{
                            width: '100%',
                            height: '240px',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <div className='recipe-title-container'>
                    <h3 className='recipe-title'>
                        {props.strMeal}
                    </h3>
                </div>
            </div>
        </div>
    )
}