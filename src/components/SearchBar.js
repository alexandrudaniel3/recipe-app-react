import './styles/SearchBar.css';

export default function SearchBar(props) {
    return (
        <div className='search-bar-container' id={props.id + '-container'}>
            <input
                type='text'
                className='search-bar'
                id={props.id}
                value={props.value}
                onChange={(e) => {
                    props.changeHandler(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    props.submitHandler();
                    }
                }}/>
            <button
                type='submit'
                className='search-button'
                id={props.id + '-button'}
                onClick={props.submitHandler}
            >
                {props.buttonTitle}
            </button>
        </div>
    )
}