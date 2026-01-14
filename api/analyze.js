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
      당신은 대한민국 최고의 '문제정의 역량 진단' 마스터 컨설턴트입니다. 
      사용자의 상세 문항 답변 데이터와 아키타입 결과를 바탕으로, 한 사람의 인생을 바꿀 수 있을 만큼 깊이 있고 압도적인 분량의 '전문 분석 보고서'를 작성해주세요.

      [진단 결과 데이터]
      - 주요 아키타입 (Primary): ${primaryId}
      - 보조 아키타입 (Secondary): ${secondaryId}
      - 보완이 필요한 아키타입 (Under-used): ${underUsedIds.join(', ')}
      - 전체 점수 요약: ${JSON.stringify(scores)}
      - 개별 문항 답변 (ID: 점수): ${JSON.stringify(rawAnswers)}

      [작성 가이드라인 - 필수]
      1. **분석의 분량**: 최소 공백 제외 **3,500자 이상**으로 매우 정교하게 작성하세요. 각 섹션마다 전문적인 비즈니스 프레임워크와 결합된 깊이 있는 서술이 필요합니다.
      2. **톤앤매너**: 격조 높고 전문적인 '화이트페이퍼' 스타일의 어조를 유지하세요.
      3. **출력 형식 (CRITICAL)**: 오직 **HTML 태그로만 구성된 순수 텍스트**를 반환하세요. 마크다운(backticks \`\`\`)이나 코드 블록 기호(\`\`\`html)를 절대 사용하지 마세요. 
      4. **입체적 분석**: 단순히 점수를 나열하지 말고, ${primaryId}와 ${secondaryId}의 결합이 실무 현장에서 어떤 '지적 독창성' 혹은 '맹점'을 만드는지 실제 사례를 들어 분석하세요.
      5. **데이터 기반 통찰**: 사용자가 극단적인 점수(1점 또는 5점)를 준 문항들을 근거로, 그가 가진 사고의 편향성과 잠재된 리스크를 논리적으로 추론하세요.

      [보고서 구조]
      <h1>결과 종합분석: [사용자의 정체성을 상징하는 전문적인 헤드라인]</h1>
      
      <h2>1. 문제 해결 DNA: [Primary]와 [Secondary]의 상호작용</h2>
      <p>두 아키타입의 화학적 결합이 만드는 독보적인 강점과 타인과 차별화되는 지적 무기를 분석합니다.</p>

      <h2>2. 심층 데이터 분석 (Deep Behavioral Analysis)</h2>
      <p>개별 문항의 답변 패턴에서 발견된 사용자의 핵심 가치관과 사고 프로세스의 특이점을 다룹니다.</p>

      <h2>3. 구조적 맹점과 리스크 시나리오</h2>
      <p>${underUsedIds.join(', ')}의 결핍이 실제 팀 협업이나 복잡한 프로젝트에서 어떠한 치명적인 '의사결정 오류'를 부를 수 있는지 구체적인 가상 시나리오로 경고합니다.</p>

      <h2>4. 전략적 행동 가이드 (The Action Roadmap)</h2>
      <p>단순한 조언을 넘어, 내일부터 당장 실행할 수 있는 역량 보완 계획과 스스로에게 던질 3가지 핵심 질문을 제안합니다.</p>
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
