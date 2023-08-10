import './styles/RecipeCard.css';
import {useNavigate} from "react-router-dom";

export default function RecipeCard({id, props}) {
    const navigation = useNavigate();
    return (
        <div className={'recipe-card-wrapper ' + id + '-recipe-card-wrapper'}>
            <div className={'recipe-card ' + id + '-recipe-card'}  onClick={() => navigation('/recipe/' + props.idMeal)}>
                <div className={'recipe-thumbnail-container ' + id + '-recipe-thumbnail-container'}>
                    <img
                        src={props.strMealThumb}
                        className={'recipe-thumbnail ' + id + '-recipe-thumbnail'}
                        alt='thumbnail'
                    />
                </div>
                <div className={'recipe-title-container ' + id + '-recipe-title-container'}>
                    <h3 className={'recipe-title ' + id + '-recipe-title'}>
                        {props.strMeal}
                    </h3>
                </div>
            </div>
        </div>
    )
}