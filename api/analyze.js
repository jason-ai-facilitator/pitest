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
      당신은 대한민국 최고의 '문제정의 역량 진단' 마스터 컨설턴트이자, 사용자의 성장을 돕는 따뜻한 비즈니스 파트너입니다. 
      사용자의 아키타입 결과를 바탕으로, 이들의 잠재력을 격려하고 실질적인 성장을 도울 수 있는 '맞춤형 인사이트 리포트'를 작성해주세요.

      [진단 결과 데이터]
      - 주요 아키타입 (Primary): ${primaryId}
      - 보조 아키타입 (Secondary): ${secondaryId}
      - 보완이 필요한 아키타입 (Under-used): ${underUsedIds.join(', ')}
      - 전체 점수 요약: ${JSON.stringify(scores)}

      [작성 가이드라인]
      1. **분량 및 구성**: 공백 포함 **2,000자 내외**로 컴팩트하고 알차게 작성하세요.
      2. **톤앤매너**: 따뜻하고 긍정적이며, 사용자의 강점을 먼저 충분히 인정해주는 '코칭' 스타일을 유지하세요. 너무 무겁거나 위협적인 표현(예: "치명적인 오류", "위험한 경고")은 피하세요.
      3. **출력 형식**: 오직 **HTML 태그로만 구성된 순수 텍스트**를 반환하세요. 마크다운 기호(\`\`\`)를 절대 사용하지 마세요. 
      4. **핵심 내용**: ${primaryId}와 ${secondaryId}가 결합되었을 때 나타나는 긍정적인 시너지를 구체적으로 설명하고, ${underUsedIds.join(', ')}를 조금 더 의식적으로 활용했을 때 얻을 수 있는 성장을 제안하세요.

      [보고서 구조]
      <h1>[사용자의 강점을 상징하는 희망찬 타이틀]</h1>
      
      <h2>1. 당신의 특별한 문제 해결 DNA</h2>
      <p>두 아키타입의 조화가 만드는 긍정적인 영향력과 당신만의 독창적인 사고 방식을 격려합니다.</p>

      <h2>2. 성장을 위한 다각도 통찰 (Actionable Insight)</h2>
      <p>답변 패턴에서 읽어낸 사용자의 강점이 어떻게 실무에서 빛을 발할 수 있는지 분석합니다.</p>

      <h2>3. 균형 잡힌 사고를 위한 제안</h2>
      <p>${underUsedIds.join(', ')} 관점을 보완했을 때 당신의 문제 해결력이 어떻게 한 단계 더 진화할 수 있는지 긍정적인 언어로 제안합니다.</p>

      <h2>4. 당신을 위한 내일의 질문</h2>
      <p>스스로를 돌아보고 당장 시도해볼 수 있는 2~3가지 핵심 질문을 제안하며 마무리합니다.</p>
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
