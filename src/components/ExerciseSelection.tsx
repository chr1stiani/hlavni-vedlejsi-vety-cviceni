import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ExerciseSelection: React.FC = () => {
  const exercises = [
    {
      title: 'Hlavní a vedlejší věty',
      description: 'Procvičte si rozpoznávání hlavních a vedlejších vět.',
      path: '/hlavni-vedlejsi'
    },
    {
      title: 'Typy vedlejších vět',
      description: 'Naučte se rozpoznávat různé druhy vedlejších vět.',
      path: '/typy-vedlejsich'
    }
  ];

  return (
    <div className="exercise-selection">
      <motion.div 
        className="exercises-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.path}
            className="exercise-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Link to={exercise.path}>
              <h2>{exercise.title}</h2>
              <p>{exercise.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExerciseSelection;
