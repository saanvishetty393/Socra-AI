// Initial sample user and quiz history for new sessions
export const initialUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  grade: "College Freshman",
  streak: 4
};

export const initialQuizHistory = [
  {
    id: "q_hist_1",
    date: "2026-06-01",
    topicId: "photosynthesis",
    topicTitle: "Photosynthesis",
    score: 4,
    total: 4,
    percentage: 100
  },
  {
    id: "q_hist_2",
    date: "2026-06-03",
    topicId: "quadratics",
    topicTitle: "Quadratic Equations",
    score: 2,
    total: 3,
    percentage: 66
  }
];