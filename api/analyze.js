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
      당신은 조직심리학과 문제해결 방법론을 결합한 '문제정의 역량 진단' 전문가입니다. 
      사용자의 아키타입 결과를 바탕으로, 실무에 즉시 적용 가능한 통찰력 있는 '역량 분석 리포트'를 작성해주세요.

      [진단 결과 데이터]
      - 주요 아키타입 (Primary): ${primaryId}
      - 보조 아키타입 (Secondary): ${secondaryId}
      - 보완이 필요한 아키타입 (Under-used): ${underUsedIds.join(', ')}
      - 전체 점수 분포: ${JSON.stringify(scores)}

      [아키타입별 핵심 특성 참고]
      - detective: 데이터 기반 분석, 패턴 인식, 증거 중심 사고
      - judge: 기준 설정, 우선순위 판단, 의사결정 프레임워크
      - cartographer: 전체 구조 파악, 관계성 시각화, 시스템적 사고
      - anthropologist: 사용자 관점, 맥락 이해, 질적 통찰
      - archaeologist: 역사적 맥락, 근본 원인 탐구, 시간축 분석
      - journalist: 핵심 질문 도출, 정보 수집, 스토리텔링
      - architect: 솔루션 설계, 구조적 사고, 실행 가능성
      - ethnographer: 현장 관찰, 행동 패턴 분석, 문화적 맥락
      - futurist: 미래 시나리오, 트렌드 예측, 변화 대응
      - philosopher: 본질적 질문, 가치 탐구, 개념적 사고

      [작성 가이드라인]
      1. **분량**: 2,000~2,500자 정도로 충분히 깊이 있게 작성하세요.
      2. **톤**: 전문적이면서도 실용적인 컨설턴트의 어조. 객관적 분석과 실무 조언의 균형을 유지하세요.
      3. **구체성**: 추상적인 표현보다는 실제 업무 상황에서의 구체적인 예시와 시나리오를 포함하세요.
      4. **출력 형식**: HTML 태그만 사용. 마크다운(\`\`\`) 절대 금지.
      5. **핵심 가치**: 
         - ${primaryId}와 ${secondaryId}의 시너지를 구체적 업무 상황으로 설명
         - ${underUsedIds.join(', ')}를 보완했을 때의 실질적 변화를 시나리오로 제시
         - 점수 분포에서 읽어낼 수 있는 사고 패턴의 특이점 분석

      [보고서 구조]
      <h1>문제정의 역량 분석 리포트</h1>
      
      <h2>1. 핵심 사고 패턴: ${primaryId} × ${secondaryId}</h2>
      <p>
      - 두 아키타입의 결합이 만드는 독특한 문제 접근 방식을 실제 업무 시나리오로 설명하세요.
      - 예: "프로젝트 킥오프 미팅에서 당신은..." 같은 구체적 상황 묘사
      - 이 조합의 강점이 빛을 발하는 상황과 한계가 드러나는 상황을 대비하여 제시
      </p>

      <h2>2. 점수 분포 기반 심층 진단</h2>
      <p>
      - 전체 점수 분포(${JSON.stringify(scores)})에서 발견되는 특이점 분석
      - 극단적으로 높거나 낮은 점수가 있다면 그 의미를 해석
      - 균형잡힌 분포 vs 편중된 분포의 실무적 함의 설명
      - "당신의 점수 패턴은 X한 경향을 보이는데, 이는 실무에서 Y한 방식으로 나타날 가능성이 높습니다" 형식으로 구체화
      </p>

      <h2>3. 역량 확장 로드맵</h2>
      <p>
      - ${underUsedIds.join(', ')} 관점을 보완하면 어떤 구체적 변화가 생길지 시나리오로 제시
      - Before/After 비교: "현재는 A 방식으로 접근하지만, X 역량을 강화하면 B 방식도 가능해집니다"
      - 단계별 실천 방안: 내일부터 시도할 수 있는 작은 행동 변화 제안
      </p>

      <h2>4. 자기 점검 질문</h2>
      <p>
      - 사고의 맹점을 발견하고 역량을 확장하기 위한 3가지 핵심 질문
      - 각 질문은 구체적이고 실천 가능해야 함
      - 예: "최근 프로젝트에서 X 관점을 고려했다면 결과가 어떻게 달라졌을까?"
      </p>

      [중요 지침]
      - 일반론이나 교과서적 설명 지양
      - 실제 업무 상황, 구체적 예시, 시나리오 중심으로 작성
      - "당신은...", "이 조합은..." 같은 직접적 표현으로 개인화
      - 단순 나열보다는 "왜 그런지", "어떻게 작동하는지" 메커니즘 설명
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
