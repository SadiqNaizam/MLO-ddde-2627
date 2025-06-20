import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface ThematicPageTransitionProps {
  children: React.ReactNode;
}

const ThematicPageTransition: React.FC<ThematicPageTransitionProps> = ({ children }) => {
  const location = useLocation();
  console.log('ThematicPageTransition loaded for path:', location.pathname);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "20px", // Start slightly to the right, creating a gentle "swoosh" in
    },
    in: {
      opacity: 1,
      x: "0px",
    },
    out: {
      opacity: 0,
      x: "-20px", // Exit slightly to the left, creating a gentle "swoosh" out
    }
  };

  const pageTransitionConfig = {
    type: "tween", // Using tween for a smooth, predictable animation
    ease: "easeInOut", // Standard easing for a pleasant effect
    duration: 0.35 // A quick transition to avoid user frustration
  };

  return (
    <AnimatePresence mode="wait">
      {/* 
        The `key` prop is crucial here. It tells AnimatePresence to detect 
        when the children have changed (i.e., route has changed) and trigger animations.
        `mode="wait"` ensures that the outgoing page completes its exit animation 
        before the incoming page starts its enter animation.
      */}
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransitionConfig}
        className="w-full" // Ensures the animated container spans the full width
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThematicPageTransition;