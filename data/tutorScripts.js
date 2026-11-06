// Scripted responses for the AI Tutor chat feature
export const tutorScripts = {
  photosynthesis: {
    greeting: "Hi there! I am your AI tutor for Photosynthesis. Do you know what plant organelle is primarily responsible for capturing sunlight?",
    simpler: "Think of chloroplasts as tiny solar panels inside plant cells that trap light energy to make sugar.",
    example: "A great example is a green leaf: it absorbs sunlight and carbon dioxide from the air to produce glucose and oxygen.",
    fallback: "That is an interesting thought! Let us break it down: plants use sunlight, water, and CO2 to create food. What do you think happens to the sunlight?"
  },
  quadratics: {
    greeting: "Welcome! Quadratic equations are equations with an x-squared term. Can you tell me what the standard form of a quadratic equation looks like?",
    simpler: "The standard form is written as ax squared + bx + c = 0, where 'a' cannot be zero.",
    example: "For example, in 2x squared + 5x - 3 = 0, a = 2, b = 5, and c = -3.",
    fallback: "Keep going! Remember we are looking for relationships involving squared variables. Can you try writing a simple quadratic expression?"
  },
  "newton-laws": {
    greeting: "Hello! Let us explore physics. According to Newton's First Law, what tends to happen to an object at rest if no outside force acts on it?",
    simpler: "Objects like to keep doing whatever they are currently doing. If something is still, it stays still.",
    example: "Think of a soccer ball sitting on the grass; it will not move unless someone kicks it.",
    fallback: "Good effort! Remember inertia—objects resist changes in their state of motion."
  }
};

export const genericScript = {
  greeting: "Hello! I am ready to help you master this topic. What part would you like to explore first?",
  simpler: "Let us look at the core idea in simpler terms: every concept builds on basic foundational blocks.",
  example: "Consider a real-world scenario where this principle applies directly to everyday problem-solving.",
  fallback: "That is a great question! Let us examine it step by step. What do you think is the main goal here?"
};