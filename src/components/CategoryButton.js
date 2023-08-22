import './styles/CategoryButton.css';

export default function CategoryButton(props) {
    const buttonClass = props.current === props.title ? 'category-button selected-category' : 'category-button'
    return (
        <div className='category-button-container'>
            <div className='category-button-wrapper'>
                <button
                    className={buttonClass}
                    type='button'
                    onClick={() => props.categoryHandler(props.title)}
                >
                    <span className='category-button-text'>{props.title}</span>
                </button>
            </div>
        </div>
    );
}