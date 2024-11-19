import React, { useState, useRef } from 'react';
import sentencesData from '../data/sentences.json';
import { Sentence, DragBlob, SentencePart } from '../types/sentence';
import '../styles/SentenceExercise.css';
import { motion, AnimatePresence } from 'framer-motion';

const SentenceExercise: React.FC = () => {
  const [sentences] = useState<Sentence[]>(sentencesData.sentences);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coloredParts, setColoredParts] = useState<{[key: string]: string}>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedTool, setSelectedTool] = useState<{type: 'main' | 'dependent', color: string} | null>(null);

  const currentSentence = sentences[currentIndex];

  const blobs: DragBlob[] = [
    { type: 'main', color: 'rgba(126, 231, 135, 0.2)' },
    { type: 'dependent', color: 'rgba(255, 123, 114, 0.2)' }
  ];

  const [draggedType, setDraggedType] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, type: 'main' | 'dependent', color: string) => {
    const ghost = document.createElement('div');
    ghost.classList.add('drag-ghost');
    ghost.style.background = color;
    document.body.appendChild(ghost);
    
    e.dataTransfer.setDragImage(ghost, 10, 10);
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('color', color);
    setDraggedType(type);
    
    requestAnimationFrame(() => {
      ghost.remove();
    });
  };

  const handleDragEnd = () => {
    setDraggedType(null);
    setHoveredPart(null);
  };

  const handleDragEnter = (part: string) => {
    if (draggedType && !isChecked) {
      setHoveredPart(part);
    }
  };

  const handleDragLeave = () => {
    setHoveredPart(null);
  };

  const handleDrop = (e: React.DragEvent, part: string) => {
    e.preventDefault();
    if (isChecked) return;

    const type = e.dataTransfer.getData('type');
    const color = e.dataTransfer.getData('color');
    
    setColoredParts(prev => ({
      ...prev,
      [part]: color
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkAnswer = () => {
    const mainCorrect = coloredParts[currentSentence.mainClause] === blobs[0].color;
    const dependentCorrect = coloredParts[currentSentence.dependentClause] === blobs[1].color;
    
    setIsCorrect(mainCorrect && dependentCorrect);
    setIsChecked(true);
  };

  const nextSentence = () => {
    setCurrentIndex((prev) => (prev + 1) % sentences.length);
    setColoredParts({});
    setIsChecked(false);
    setIsCorrect(null);
  };

  const sentenceParts: SentencePart[] = [
    { 
      text: currentSentence.mainClause, 
      isMain: true,
      position: currentSentence.order.mainClausePosition 
    },
    { 
      text: currentSentence.dependentClause, 
      isMain: false,
      position: currentSentence.order.dependentClausePosition 
    }
  ].sort((a, b) => a.position - b.position);

  // Add animation variants
  const feedbackVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      y: -1,
      transition: { duration: 0.2 }
    },
    tap: { y: 1 }
  };

  const handleBlobClick = (type: 'main' | 'dependent', color: string) => {
    if (selectedTool?.type === type) {
      setSelectedTool(null); // Deselect if clicking the same tool
    } else {
      setSelectedTool({ type, color });
    }
  };

  const handleSentencePartClick = (part: string) => {
    if (selectedTool && !isChecked) {
      setColoredParts(prev => ({
        ...prev,
        [part]: selectedTool.color
      }));
    }
  };

  return (
    <motion.div
      className="sentence-exercise"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sentence">
      {sentenceParts.map((part, index) => (
  <span
    key={index}
          className={`sentence-part ${hoveredPart === part.text ? 'highlight' : ''}`}
          onClick={() => handleSentencePartClick(part.text)}
          onDragEnter={() => handleDragEnter(part.text)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, part.text)}
          data-colored={!!coloredParts[part.text]}
          style={{ 
            backgroundColor: coloredParts[part.text] || 'transparent',
            transition: 'all 0.2s ease',
            cursor: selectedTool ? 'pointer' : 'default'
          }}
        >
          {part.text}
          {index === 0 && ', '}
        </span>
      ))}
      </div>

        <div className="blobs-container">
    {blobs.map((blob, index) => (
      <div
        key={index}
        className={`blob ${selectedTool?.type === blob.type ? 'selected' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={`Přetáhněte ${blob.type === 'main' ? 'hlavní' : 'vedlejší'} větu`}
        style={{ backgroundColor: blob.color }}
        draggable
        onDragStart={(e) => handleDragStart(e, blob.type, blob.color)}
        onClick={() => handleBlobClick(blob.type, blob.color)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleBlobClick(blob.type, blob.color);
          }
        }}
      >
        {blob.type === 'main' ? 'Hlavní věta' : 'Vedlejší věta'}
      </div>
    ))}
  </div>
      <motion.div className="controls">
        {!isChecked ? (
          <motion.button 
            onClick={checkAnswer}
            disabled={Object.keys(coloredParts).length < 2}
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

      <AnimatePresence mode="wait">
        {isChecked && (
          <motion.div 
            className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
            variants={feedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isCorrect ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  🎉 Správně!
                </motion.span>
              ) : (
                "Zkus to znovu"
              )}
            </motion.p>
            {!isCorrect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>Správné řešení:</p>
                <p>Hlavní věta: {currentSentence.mainClause}</p>
                <p>Vedlejší věta: {currentSentence.dependentClause}</p>
                <p className="hint">{currentSentence.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SentenceExercise; 