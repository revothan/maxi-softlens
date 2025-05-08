// Keyframe animations for coin-related effects
export const coinAnimations = {
  // Animation for when coins are earned
  coinEarned: `
    @keyframes coinEarned {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `,
  
  // Animation for the coin counter
  coinCount: `
    @keyframes coinCount {
      0% {
        transform: translateY(10px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  
  // Animation for coins floating upward
  coinFloat: `
    @keyframes coinFloat {
      0% {
        transform: translateY(0) rotate(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-80px) rotate(20deg);
        opacity: 0;
      }
    }
  `,
  
  // Animation for coin shine effect
  coinShine: `
    @keyframes coinShine {
      0% {
        background-position: -100px;
      }
      40% {
        background-position: 300px;
      }
      100% {
        background-position: 300px;
      }
    }
  `,
};

// Keyframe animations for reward-related effects
export const rewardAnimations = {
  // Animation for when a reward becomes available
  rewardUnlock: `
    @keyframes rewardUnlock {
      0% {
        transform: scale(0.9) rotateY(90deg);
        opacity: 0.5;
      }
      60% {
        transform: scale(1.1) rotateY(0deg);
        opacity: 1;
      }
      100% {
        transform: scale(1) rotateY(0deg);
        opacity: 1;
      }
    }
  `,
  
  // Animation for reward card hover effect
  rewardHover: `
    @keyframes rewardHover {
      0% {
        transform: translateY(0);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      100% {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
      }
    }
  `,
  
  // Animation for reward redemption celebration
  rewardCelebration: `
    @keyframes rewardCelebration {
      0% {
        transform: scale(0.8) translateY(20px);
        opacity: 0;
      }
      40% {
        transform: scale(1.2) translateY(0);
        opacity: 1;
      }
      70% {
        transform: scale(0.95) translateY(0);
        opacity: 1;
      }
      100% {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }
  `,
};

// Confetti animation for celebrations
export const confettiAnimation = `
  @keyframes confettiFall {
    0% {
      transform: translateY(-100px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;

// Progress bar animations
export const progressAnimations = {
  // Animation for filling a progress bar
  progressFill: `
    @keyframes progressFill {
      0% {
        width: 0%;
      }
      100% {
        width: var(--progress-percent, 0%);
      }
    }
  `,
  
  // Animation for pulsing progress bar when near completion
  progressPulse: `
    @keyframes progressPulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
      }
    }
  `,
};

// Input and button animations for form interactions
export const formAnimations = {
  // Animation for successful form submission
  formSuccess: `
    @keyframes formSuccess {
      0% {
        transform: translateX(0);
      }
      15% {
        transform: translateX(-5px);
      }
      30% {
        transform: translateX(5px);
      }
      45% {
        transform: translateX(-3px);
      }
      60% {
        transform: translateX(3px);
      }
      75% {
        transform: translateX(-1px);
      }
      90% {
        transform: translateX(1px);
      }
      100% {
        transform: translateX(0);
      }
    }
  `,
  
  // Animation for error in form submission
  formError: `
    @keyframes formError {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(5px);
      }
    }
  `,
  
  // Animation for button hover/click
  buttonPop: `
    @keyframes buttonPop {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
  `,
};

// Create a CSS class with the animation
export const createAnimationClass = (className: string, keyframes: string, duration: string, timing: string, delay: string = '0s', fillMode: string = 'forwards') => {
  return `
    ${keyframes}
    .${className} {
      animation: ${keyframes.match(/@keyframes\s+([^\s{]+)/)?.[1]} ${duration} ${timing} ${delay} ${fillMode};
    }
  `;
};

// Utility to add animation styles to the document
export const addAnimationStyles = (styles: string) => {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
  return styleElement;
};

// Utility function to animate counting up a number (for coin displays)
export const animateNumber = (
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 1000,
  formatter: (value: number) => string = (value) => Math.round(value).toString()
) => {
  let startTime: number | null = null;
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = start + progress * (end - start);
    element.textContent = formatter(currentValue);
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  
  window.requestAnimationFrame(step);
};

// Function to create confetti elements for celebration
export const createConfetti = (container: HTMLElement, count: number = 50) => {
  // Add the confetti animation style
  addAnimationStyles(confettiAnimation);
  
  // Create and append confetti elements
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    
    // Random confetti styles
    const size = Math.random() * 10 + 5;
    const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    const left = `${Math.random() * 100}%`;
    const animationDuration = `${Math.random() * 3 + 2}s`;
    const animationDelay = `${Math.random() * 0.5}s`;
    
    // Apply styles
    Object.assign(confetti.style, {
      position: 'absolute',
      top: '-20px',
      left: left,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: `${Math.random() > 0.5 ? '50%' : '0'}`,
      zIndex: '9999',
      animation: `confettiFall ${animationDuration} ease-in ${animationDelay} forwards`,
    });
    
    container.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, (parseFloat(animationDuration) + parseFloat(animationDelay)) * 1000);
  }
};
