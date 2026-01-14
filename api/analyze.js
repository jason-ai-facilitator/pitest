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
      사용자의 상세 문항 답변 데이터와 아키타입 결과를 바탕으로, 한 사람의 인생을 바꿀 수 있을 만큼 깊이 있고 압도적인 분량의 '결과 종합분석 보고서'를 한국어로 작성해주세요.

      [진단 결과 데이터]
      - 주요 아키타입 (Primary): ${primaryId}
      - 보조 아키타입 (Secondary): ${secondaryId}
      - 보완이 필요한 아키타입 (Under-used): ${underUsedIds.join(', ')}
      - 전체 점수 요약: ${JSON.stringify(scores)}
      - 개별 문항 답변 (ID: 점수): ${JSON.stringify(rawAnswers)}

      [작성 가이드라인 - 매우 중요]
      1. **분석의 양과 질**: 전체 길이를 공백 제외 **4,000자 이상**으로 매우 상세하게 작성하세요. 각 섹션마다 전문적인 용어와 구체적인 비즈니스/일상 사례를 들어 깊이 있게 서술해야 합니다.
      2. **HTML 태그 주의**: 반드시 표준 HTML 태그를 사용하되, 태그 안에 공백을 절대 넣지 마세요 (예: < strong > 대신 <strong> 사용). 태그가 깨지면 가독성이 심각하게 저하됩니다.
      3. **답변 패턴 심층 분석**: 사용자가 1점(전혀 아니다) 또는 5점(매우 그렇다)을 준 문항들을 리스트업하고, 그 이면에 숨겨진 심리적 기제와 사고의 편향을 분석하세요. "준비된 문항 중 '~'라는 질문에 5점을 주셨는데, 이는 당신이 ~보다 ~를 중시하는 경향이 있음을 의미합니다"와 같이 구체적으로 연결하세요.
      4. **입체적 시너지 분석**: ${primaryId}와 ${secondaryId}가 결합되었을 때 발생하는 독특한 시너지를 '문제 해결의 엔진' 관점에서 분석하세요. 또한 이 조합이 가질 수 있는 '지적 오만'이나 '맹점'도 날카롭게 지적하세요.
      5. **리스크 시나리오**: ${underUsedIds.join(', ')} 역량이 결핍되었을 때, 실제 프로젝트나 팀 협업에서 발생할 수 있는 '최악의 시나리오'를 소설처럼 구체적으로 묘사하여 경각심을 주세요.
      6. **3단계 Action Plan**: 단순한 조언이 아닌, 내일부터 당장 실행할 수 있는 (1) 마인드셋 훈련, (2) 구체적인 질문 기술, (3) 행동 가이드라인을 아주 상세하게 제안하세요.

      [보고서 구조 - 반드시 지킬 것]
      # 결과 종합분석: [사용자의 정체성을 상징하는 한 줄 문장]
      
      ## 1. 당신의 문제 해결 DNA: [Primary]와 [Secondary]의 결합
      - 두 아키타입의 화학적 결합이 만드는 독특한 강점 분석
      - 타인과 차별화되는 당신만의 지적 무기

      ## 2. 데이터가 말해주는 당신의 사고 패턴 (Deep Dive)
      - 문항 답변 기반의 심층 심리 및 사고 방식 분석
      - 극단적 답변(1점, 5점)에 나타난 가치관 해석

      ## 3. 그림자 역량: [Under-used]의 결핍이 부르는 리스크
      - 보완이 필요한 지점과 그로 인한 실무적 위기 시나리오
      - 당신이 직관적으로 놓치기 쉬운 '결정적 단서'들

      ## 4. 압도적 성장을 위한 전략적 제언 (Roadmap)
      - 단기/중기/장기적 역량 보완 계획
      - 매일 스스로에게 던져야 할 '마법의 질문' 리스트 3가지
      - 당신의 잠재력을 폭발시킬 최종 컨설팅 코멘트
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
