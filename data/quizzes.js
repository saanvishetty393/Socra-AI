// Multiple choice questions for topic quizzes
export const quizzes = {
  photosynthesis: [
    {
      id: 1,
      question: "Which organelle is responsible for photosynthesis in plant cells?",
      options: ["Mitochondria", "Chloroplast", "Ribosome", "Nucleus"],
      correct: 1,
      explanation: "Chloroplasts contain chlorophyll which absorbs light energy to drive photosynthesis."
    },
    {
      id: 2,
      question: "What are the main inputs required for photosynthesis?",
      options: [
        "Oxygen and glucose",
        "Carbon dioxide, water, and sunlight",
        "Nitrogen and heat",
        "Salt and minerals"
      ],
      correct: 1,
      explanation: "Plants take in carbon dioxide from air, water from soil, and sunlight energy."
    },
    {
      id: 3,
      question: "What gas is released as a byproduct of photosynthesis?",
      options: ["Carbon dioxide", "Oxygen", "Hydrogen", "Methane"],
      correct: 1,
      explanation: "Oxygen is released into the atmosphere as a byproduct when water molecules are split."
    },
    {
      id: 4,
      question: "What is the primary sugar produced during photosynthesis?",
      options: ["Glucose", "Fructose", "Cellulose", "Sucrose"],
      correct: 0,
      explanation: "Glucose is synthesized as food for the plant to store and use as energy."
    }
  ],
  quadratics: [
    {
      id: 1,
      question: "What is the standard form of a quadratic equation?",
      options: [
        "ax + b = 0",
        "ax squared + bx + c = 0",
        "ax cubed + bx squared = 0",
        "y = mx + b"
      ],
      correct: 1,
      explanation: "The standard form is ax squared + bx + c = 0 where a is not equal to zero."
    },
    {
      id: 2,
      question: "In the quadratic formula, what is b squared minus 4ac called?",
      options: ["Vertex", "Discriminant", "Coefficient", "Root"],
      correct: 1,
      explanation: "The discriminant determines the number and type of solutions."
    },
    {
      id: 3,
      question: "How many real solutions does a quadratic equation have if its discriminant is negative?",
      options: ["Zero", "One", "Two", "Infinite"],
      correct: 0,
      explanation: "A negative discriminant means taking the square root of a negative number, resulting in complex solutions."
    }
  ],
  "newton-laws": [
    {
      id: 1,
      question: "Which of Newton's laws is also known as the Law of Inertia?",
      options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
      correct: 0,
      explanation: "Newton's First Law states that an object will remain at rest or in uniform motion unless acted upon by an external force."
    },
    {
      id: 2,
      question: "According to Newton's Second Law, force is equal to mass multiplied by what?",
      options: ["Velocity", "Acceleration", "Momentum", "Gravity"],
      correct: 1,
      explanation: "F = ma, where 'a' stands for acceleration."
    },
    {
      id: 3,
      question: "Newton's Third Law states that for every action, there is an equal and opposite...",
      options: ["Force", "Reaction", "Velocity", "Acceleration"],
      correct: 1,
      explanation: "Forces always occur in equal and opposite pairs."
    }
  ]
};