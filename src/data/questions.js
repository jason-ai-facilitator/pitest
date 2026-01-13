export const questions = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    text: `Question Placeholder ${i + 1}: This is where the actual question text will go. Please upload the content file.`,
    archetype: String.fromCharCode(65 + (i % 10)) // A, B, C... J
}));
