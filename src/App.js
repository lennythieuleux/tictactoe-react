import './App.css';

import './style/style.css';

import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Best morpion ever</h1>
      </header>
      <main>
        <Game/>
        <div class="container share-twitter"><a class="twitter-share-button" target="share-twitter" href="https://twitter.com/intent/tweet?text=I played to Best Morpion Ever by Len's ! To play, click on the link https://bestmorpionever.netlify.app .">
            <i class="nes-icon twitter"></i> Share it on twitter</a></div>
      </main>
    </div>
  );
}

export default App;
