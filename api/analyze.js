const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { scores, primaryId, secondaryId, underUsedIds, rawAnswers } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key not configured on server' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      당신은 전문적인 '문제정의 역량 진단' 컨설턴트입니다. 
      사용자의 상세 문항 답변 데이터와 아키타입 결과를 바탕으로 매우 깊이 있고 전문적인 종합 해석 보고서를 한국어로 작성해주세요.

      [진단 결과 데이터]
      - 주요 아키타입 (Primary): ${primaryId}
      - 보조 아키타입 (Secondary): ${secondaryId}
      - 보완이 필요한 아키타입 (Under-used): ${underUsedIds.join(', ')}
      - 전체 점수 요약: ${JSON.stringify(scores)}
      - 개별 문항 답변 (ID: 점수): ${JSON.stringify(rawAnswers)}

      [작성 가이드라인 - 필독]
      1. **분석의 깊이**: 단순히 아키타입을 설명하는 것이 아니라, 사용자의 '답변 패턴'을 분석해야 합니다. 
      2. **구체적 언급**: 사용자가 '매우 그렇다(5점)' 또는 '전혀 아니다(1점)'라고 답한 구체적인 문항 내용을 언급하며, "당신은 ~라는 질문에 매우 강하게 동의(또는 부정)하셨는데, 이는 ~한 사고 방식을 잘 보여줍니다"와 같이 해석해주세요.
      3. **시너지 분석**: ${primaryId}와 ${secondaryId}가 결합되었을 때 나타나는 독특한 실무적 강점을 분석해주세요. (예: 인류학자의 관찰력과 과학자의 실증력이 만나면 ~한 파워가 생깁니다)
      4. **리스크와 대안**: ${underUsedIds.join(', ')}가 부족할 때 발생할 수 있는 구체적인 비즈니스 리스크를 지적하고, 이를 보완할 Action Plan 3가지를 아주 구체적으로 제안해주세요.
      5. **길이와 형식**: 전체 길이를 1500자 이상으로 풍부하게 작성해주세요. Markdown 형식을 활용하여 소제목, 강조(bold), 리스트 등을 적절히 섞어 가독성을 높여주세요.
      6. **톤앤매너**: 통찰력 있고, 지적이며, 동시에 격려하는 컨설턴트의 어조를 유지하세요.

      [보고서 구조]
      # AI 맞춤형 심층 진단 보고서
      ## 1. 당신의 문제 해결 DNA 개요 (Synergy Analysis)
      ## 2. 답변 패턴으로 본 당신의 핵심 사고 (Direct Answer Analysis)
      ## 3. 잠재적 리스크와 그림자 역량
      ## 4. 성장을 위한 맞춤형 Action Plan
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
