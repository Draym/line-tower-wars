import './App.scss';
import GameComponent from "./web/component/GameComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className="col-md-12">
              <p className="title text-center">Welcome</p>
          </div>
          <div>
              <p className="text-center">still nothing there, we are building stuff!</p>
          </div>

          <div>
              <GameComponent numberOfPlayers={2} gameWidth={500} gameHeight={500}/>
          </div>
      </header>
    </div>
  );
}

export default App;
