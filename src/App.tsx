import React from 'react';
import SentenceExercise from './components/SentenceExercise';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Procvičování hlavních a vedlejších vět</h1>
      </header>
      <main>
        <SentenceExercise />
      </main>
    </div>
  );
}

export default App;
