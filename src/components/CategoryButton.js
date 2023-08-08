import './styles/CategoryButton.css';

export default function CategoryButton(props) {
    const clicked = props.selected === props.title;

    return (
        <div className='category-button-container'>
            <div className='category-button-wrapper'>
                <button
                    className='category-button'
                    type='button'
                    onClick={() => props.categoryHandler(props.title)}

                >
                    <span className='category-button-text'>{props.title}</span>
                </button>
            </div>
        </div>
    );
}