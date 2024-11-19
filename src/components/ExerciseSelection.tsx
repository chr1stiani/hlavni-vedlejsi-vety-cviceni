import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/ExerciseSelection.css';

const ExerciseSelection: React.FC = () => {
  const exercises = [
    {
      title: 'Hlavní a vedlejší věty',
      description: 'Procvičte si rozpoznávání hlavních a vedlejších vět v interaktivním prostředí. Přetahujte a označujte části vět pro lepší pochopení jejich struktury.',
      path: '/hlavni-vedlejsi'
    },
    {
      title: 'Typy vedlejších vět',
      description: 'Naučte se rozpoznávat různé druhy vedlejších vět. Prozkoumejte jejich specifické vlastnosti a upevněte si znalosti pomocí praktických cvičení.',
      path: '/typy-vedlejsich'
    }
  ];

  return (
    <div className="exercise-selection">
      <motion.div 
        className="exercises-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.path}
            className="exercise-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.2,
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <Link to={exercise.path}>
              <div className="card-content">
                <h2>{exercise.title}</h2>
                <p>{exercise.description}</p>
              </div>
              <div className="start-button">
                <span>Spustit cvičení</span>
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.66663 4L12.6666 8L8.66663 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExerciseSelection;
