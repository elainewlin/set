import React from 'react';
import Card from  './components/Card';
import './styles/App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card 
          color="blue"
          fill="open"
          shape="squiggle"
          number={1}
        />
      </header>
    </div>
  );
}

export default App;
