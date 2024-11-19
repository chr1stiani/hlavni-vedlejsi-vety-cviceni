import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ExerciseSelection from './components/ExerciseSelection';
import SentenceExercise from './components/SentenceExercise';
import VedlejsiVetyExercise from './components/VedlejsiVetyExercise';
import './App.css';

function HeaderContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  let exerciseTitle = '';
  if (location.pathname === '/hlavni-vedlejsi') {
    exerciseTitle = 'Hlavní a vedlejší věty';
  } else if (location.pathname === '/typy-vedlejsich') {
    exerciseTitle = 'Typy vedlejších vět';
  }

  return (
    <header className="App-header">
      <h1>Procvičování skladby vět</h1>
      {isHomePage ? (
        <div className="author-credit">Naprogramoval Christian</div>
      ) : (
        <div className="exercise-title">{exerciseTitle}</div>
      )}
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderContent />
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
