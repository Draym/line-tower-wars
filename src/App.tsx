import './App.scss';
import HomeView from "./web/views/HomeView";
import React from 'react';

function App() {
    console.log("hi app")
    return (
        <div className="App">
            <HomeView/>
        </div>
    );
}

export default App;
