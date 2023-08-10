import './styles/Header.css';
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigation = useNavigate();
    return (
        <div className='no-select' id='header'>
            <h1 onClick={() => navigation('/')}>RecipeRealm</h1>
        </div>
    );
}