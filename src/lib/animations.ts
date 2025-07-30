// Animation configurations for Framer Motion

export const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export const hoverAnimation = {
  whileHover: { 
    y: -5, 
    rotate: 1,
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgba(255, 153, 51, 0.25)',
    transition: { duration: 0.2 }
  }
};

export const tapAnimation = {
  whileTap: { scale: 0.98 }
};

export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const chartAnimation = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.5, ease: 'easeInOut' }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const floatAnimation = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const glowAnimation = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(255, 153, 51, 0.3)',
      '0 0 30px rgba(255, 153, 51, 0.6)',
      '0 0 20px rgba(255, 153, 51, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};