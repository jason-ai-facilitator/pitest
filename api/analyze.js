const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { scores, primaryId, secondaryId, underUsedIds } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key not configured on server' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      당신은 전문적인 '문제정의 역량 진단' 컨설턴트입니다. 
      사용자의 진단 결과 데이터를 바탕으로 깊이 있고 전문적인 종합 해석 보고서를 한국어로 작성해주세요.

      [진단 결과 데이터]
      - 주요 아키타입 (Primary): ${primaryId}
      - 보조 아키타입 (Secondary): ${secondaryId}
      - 보완이 필요한 아키타입 (Under-used): ${underUsedIds.join(', ')}
      - 전체 점수 데이터: ${JSON.stringify(scores)}

      [요청 사항]
      1. 사용자의 ${primaryId}와 ${secondaryId} 조합이 실무에서 어떤 시너지를 내는지 구체적으로 분석해주세요.
      2. 사용자의 강점이 발휘될 수 있는 구체적인 상황/프로젝트 예시를 들어주세요.
      3. ${underUsedIds.join(', ')} 역량이 부족할 때 발생할 수 있는 리스크와 이를 보완하기 위한 매일 실천 가능한 Action Plan 3가지를 제안해주세요.
      4. 톤앤매너: 전문적이면서도 격려하는 어조로, 가독성 있게 Markdown 형식을 사용해주세요.
      5. "AI 분석 결과"라는 제목으로 시작하며, 분석 내용은 800자 내외로 구성해주세요.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ analysis: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to generate AI analysis' });
    }
};
