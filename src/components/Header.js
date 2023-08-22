import './styles/Header.css';
import {useNavigate, useSearchParams} from "react-router-dom";

export default function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigate();
    return (
        <div className='no-select' id='header'>
            <h1 onClick={() => {
                setSearchParams({});
                navigation('/');
            }}>RecipeRealm</h1>
        </div>
    );
}