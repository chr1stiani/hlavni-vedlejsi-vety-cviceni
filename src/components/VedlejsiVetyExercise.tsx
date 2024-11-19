import React, { useState } from 'react';
import sentencesData from '../data/vedlejsi-vety-sentences.json';
import { VedlejsiVetaSentence } from '../types/sentence';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SentenceExercise.css';
import { shuffleArray } from '../utils/array';

const VEDLEJSI_VETY_TYPES = [
  { type: 'podmětná', color: 'rgba(126, 231, 135, 0.2)' },
  { type: 'předmětná', color: 'rgba(255, 123, 114, 0.2)' },
  { type: 'příslovečná', color: 'rgba(88, 166, 255, 0.2)' },
  { type: 'přívlastková', color: 'rgba(246, 185, 59, 0.2)' },
  { type: 'doplňková', color: 'rgba(219, 97, 162, 0.2)' }
];

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    y: -1,
    transition: { duration: 0.2 }
  },
  tap: { y: 1 }
};

const feedbackVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const VedlejsiVetyExercise: React.FC = () => {
  const [sentences] = useState<VedlejsiVetaSentence[]>(() => 
    shuffleArray(sentencesData.sentences)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentSentence = sentences[currentIndex];

  const handleTypeSelect = (type: string) => {
    if (!isChecked) {
      setSelectedType(type);
    }
  };

  const checkAnswer = () => {
    const isCorrect = selectedType === currentSentence.type;
    setIsCorrect(isCorrect);
    setIsChecked(true);
  };

  const nextSentence = () => {
    setCurrentIndex((prev) => (prev + 1) % sentences.length);
    setSelectedType(null);
    setIsChecked(false);
    setIsCorrect(null);
  };

  return (
    <motion.div
      className="sentence-exercise"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sentence">
        <span className="sentence-part">
          {currentSentence.text}
        </span>
      </div>

      <div className="question-prompt">
        <h3>Otázka: {currentSentence.question}</h3>
      </div>

      <div className="blobs-container">
        {VEDLEJSI_VETY_TYPES.map((type) => (
          <motion.div
            key={type.type}
            className={`blob ${selectedType === type.type ? 'selected' : ''}`}
            onClick={() => handleTypeSelect(type.type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.type}
          </motion.div>
        ))}
      </div>

      <motion.div className="controls">
        {!isChecked ? (
          <motion.button
            onClick={checkAnswer}
            disabled={!selectedType}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Zkontrolovat
          </motion.button>
        ) : (
          <motion.button
            onClick={nextSentence}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Další věta
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {isChecked && (
          <motion.div
            className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
            variants={feedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p>{isCorrect ? '🎉 Správně!' : 'Zkus to znovu'}</p>
            <div className="explanation">
              <p>Správná odpověď: {currentSentence.type}</p>
              <p className="hint">{currentSentence.typeExplanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VedlejsiVetyExercise;
