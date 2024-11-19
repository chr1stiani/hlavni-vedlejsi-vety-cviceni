import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExerciseSelection from './components/ExerciseSelection';
import SentenceExercise from './components/SentenceExercise';
import VedlejsiVetyExercise from './components/VedlejsiVetyExercise';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Procvičování českého jazyka</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ExerciseSelection />} />
            <Route path="/hlavni-vedlejsi" element={<SentenceExercise />} />
            <Route path="/typy-vedlejsich" element={<VedlejsiVetyExercise />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
