/**
 * Vercel Serverless Function: Get Population Statistics
 * Returns mock data for global trends and archetype distribution.
 */
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // MOCK DATA: In a real app, this would come from a database query
    const stats = {
        totalParticipants: 1248,
        distribution: {
            'Anthropologist': 12,
            'Journalist': 8,
            'Detective': 15,
            'Systems Thinker': 14,
            'Cartographer': 7,
            'Philosopher': 9,
            'Scientist': 11,
            'Economist': 6,
            'Scenario Planner': 10,
            'Judge': 8
        },
        averageScores: {
            'Anthropologist': 65,
            'Journalist': 58,
            'Detective': 72,
            'Systems Thinker': 68,
            'Cartographer': 54,
            'Philosopher': 62,
            'Scientist': 60,
            'Economist': 48,
            'Scenario Planner': 56,
            'Judge': 59
        },
        synergyInsights: [
            { id: 1, text: "응답자의 24%는 '탐정'과 '시스템 사고가'가 동시에 활성화되어 있습니다." },
            { id: 2, text: "가장 희귀한 조합은 '경제학자'와 '철학자'의 결합입니다 (전체 2%)." },
            { id: 3, text: "현재 가장 많이 호출되는 아키타입은 '탐정' (🕵️) 입니다." }
        ]
    };

    return res.status(200).json(stats);
}
