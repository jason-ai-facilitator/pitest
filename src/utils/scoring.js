import { questions } from '../data/questions';

export const calculateResults = (answers) => {
    const scores = {};

    // Initialize scores
    questions.forEach(q => {
        if (!scores[q.archetype]) scores[q.archetype] = 0;
    });

    // Sum scores
    Object.entries(answers).forEach(([qId, value]) => {
        const q = questions.find(q => q.id === Number(qId));
        if (q) {
            scores[q.archetype] += value;
        }
    });

    // Convert to array and sort
    const sorted = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);

    return {
        primary: sorted[0] ? sorted[0][0] : null,
        secondary: sorted[1] ? sorted[1][0] : null,
        underUsed: sorted[sorted.length - 1] ? sorted[sorted.length - 1][0] : null,
        allScores: sorted
    };
};
