import './App.css';
import Home from "./pages/Home";
import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import Recipe from "./pages/Recipe";

function App() {
    return (
        <div id='app'>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                {/*<Route path='/:id' element={<Home/>}/>*/}
                <Route path='/recipe/:id' element={<Recipe/>} />

            </Routes>
        </div>
    );
}

export default App;
