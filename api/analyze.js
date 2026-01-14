import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { scores, primaryId, secondaryId, underUsedIds, rawAnswers } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key not configured on server (GEMINI_API_KEY missing)' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
      당신은 대한민국 최고의 '문제정의 역량 진단' 전문 분석가입니다. 
      사용자의 아키타입 결과를 바탕으로, 객관적이고 사실 위주의 '역량 분석 리포트'를 작성해주세요.

      [진단 결과 데이터]
      - 주요 아키타입 (Primary): ${primaryId}
      - 보조 아키타입 (Secondary): ${secondaryId}
      - 보완이 필요한 아키타입 (Under-used): ${underUsedIds.join(', ')}
      - 전체 점수 요약: ${JSON.stringify(scores)}

      [작성 가이드라인]
      1. **분량 및 구성**: 공백 포함 **1,500~2,000자** 정도로 핵심적인 통찰 위주로 기술하세요.
      2. **톤앤매너**: 객관적, 중립적, 분석적인 전문 어조를 유지하세요. 과도한 칭찬, 아첨, 감정적인 위로, 혹은 지나치게 위협적인 표현을 모두 배제하고 사실 관계와 논리적 추론을 바탕으로 작성하세요.
      3. **출력 형식**: 오직 **HTML 태그로만 구성된 순수 텍스트**를 반환하세요. 마크다운 기호(\`\`\`)를 절대 사용하지 마세요. 
      4. **핵심 내용**: ${primaryId}와 ${secondaryId}가 결합되었을 때 나타나는 사고의 특징(강점과 한계점)을 드라이하게 분석하고, ${underUsedIds.join(', ')}를 보완했을 때의 기능적 이득을 제안하세요.

      [보고서 구조]
      <h1>문제정의 역량 분석 리포트</h1>
      
      <h2>1. 사고 방식의 구조적 특징: [Primary] & [Secondary]</h2>
      <p>두 아키타입의 결합이 만드는 사고의 논리적 구조와 실무적 특징을 객관적으로 서술합니다.</p>

      <h2>2. 문항 답변 기반 심층 분석</h2>
      <p>점수 분포에서 나타나는 지적 경향성과 사고 방식의 패턴을 분석적으로 다룹니다.</p>

      <h2>3. 역량 확장을 위한 분석적 제안</h2>
      <p>${underUsedIds.join(', ')} 관점의 결핍이 의사결정에 미칠 수 있는 영향과, 이를 보완하기 위한 논리적 필요성을 설명합니다.</p>

      <h2>4. 핵심 점검 질문 (Key Questions)</h2>
      <p>사고의 맹점을 점검하고 역량을 고도화하기 위해 스스로 검토해야 할 3가지 질문을 제시합니다.</p>
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ analysis: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: `Failed to generate AI analysis: ${error.message}` });
    }
}
