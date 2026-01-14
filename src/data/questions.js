window.questions = [
    // Anthropologist (4)
    { id: 1, text: "카페나 식당에 가면 사람들이 서비스를 이용할 때 어디서 멈칫거리는지 나도 모르게 관찰하곤 한다.", archetype: "anthropologist" },
    { id: 6, text: "데이터 그래프를 보는 것보다, 그 제품을 쓰는 사람의 표정이나 손짓을 직접 한 번 보는 게 더 믿음직하다.", archetype: "anthropologist" },
    { id: 11, text: "사람들이 말로는 \"좋아요\"라고 해도, 실제로 쓸 때 왠지 머뭇거리는 그 순간을 포착할 때 \"진짜 문제\"를 찾았다고 느낀다.", archetype: "anthropologist" },
    { id: 16, text: "일상에서 사람들이 불편함을 참고 억지로 적응해서 쓰는 '이상한 방식'들을 발견하는 게 흥미롭다.", archetype: "anthropologist" },

    // Cartographer (4)
    { id: 2, text: "회의 내용이 뒤섞여 있으면 \"잠시만요, 지금 무슨 이야기를 하는 중이죠?\"라고 범위를 좁히고 싶다.", archetype: "cartographer" },
    { id: 7, text: "아이디어가 아무리 좋아도, 우리가 지금 해결할 수 있는 영역 밖의 일이면 과감히 제외해야 마음이 편하다.", archetype: "cartographer" },
    { id: 12, text: "논의가 길어지면 화이트보드에 지금 우리가 이야기하는 주제들을 상자에 담아 구조를 그려보고 싶어진다.", archetype: "cartographer" },
    { id: 17, text: "여러가지가 섞인 문제를 보면 우선순위 먼저 정리하고 싶다.", archetype: "cartographer" },

    // Scientist (4)
    { id: 3, text: "누가 \"이게 대박이래요\"라고 하면, \"그게 통한다는 구체적인 근거가 있나요?\"라고 확인하고 싶어진다.", archetype: "scientist" },
    { id: 8, text: "\"느낌이 좋다\"는 말보다는, 작게라도 직접 테스트해 본 결과가 있어야 다음 단계로 넘어갈 용기가 난다.", archetype: "scientist" },
    { id: 13, text: "내 생각이 틀릴 수도 있다는 것을 인정하고, \"이게 왜 안 될 수도 있지?\"를 미리 따져보는 과정이 즐겁다.", archetype: "scientist" },
    { id: 18, text: "처음보는 확신에 찬 주장을 보면 \"주장을 뒷받침할 수 있는 구체적인 숫자나 자료가 있을까\" 생각하고 알아본다.", archetype: "scientist" },

    // Journalist (4)
    { id: 4, text: "다들 찬성하는 분위기일 때, 구석에서 표정이 안 좋은 사람에게 \"혹시 걱정되는 부분이 있으신가요?\"라고 묻고 싶다.", archetype: "journalist" },
    { id: 9, text: "우리를 칭찬하는 말보다는, 우리 서비스에 대해 아주 구체적으로 불만을 말하는 사람의 이야기에 더 귀가 쫑긋한다.", archetype: "journalist" },
    { id: 14, text: "\"다들 그렇게 생각해요\"라는 말은 믿지 않는다. \"정확히 누가, 어떤 상황에서 그렇게 말했는지\"가 훨씬 중요하다.", archetype: "journalist" },
    { id: 19, text: "똑똑한 한 사람의 의견보다, 여러 사람의 평범하고 생생한 삶의 이야기들이 모였을 때 진짜 문제가 선명해진다고 느낀다.", archetype: "journalist" },

    // Economist (4)
    { id: 5, text: "새로운 일을 시작할 때, \"이걸 하느라 우리가 포기해야 하는 다른 중요한 일은 없을까?\"를 먼저 계산해본다.", archetype: "economist" },
    { id: 10, text: "아무리 멋진 제안이라도 우리 팀의 현재 시간과 에너지를 너무 많이 뺏는다면, 신중하게 거절해야 한다고 생각한다.", archetype: "economist" },
    { id: 15, text: "제안을 들으면 \"이걸로 우리가 얻는 이득만큼, 잃게 되는 비용이나 수고는 얼마일까?\"를 냉정하게 따져본다.", archetype: "economist" },
    { id: 20, text: "좋은 의도의 사업이라도, 현실적으로 예산이 계속 버텨줄 수 있는 구조인지부터 냉정하게 살핀다.", archetype: "economist" },

    // Detective (4)
    { id: 21, text: "다들 \"이게 원인이야\"라고 할 때, 왠지 설명되지 않는 구석이 하나라도 있으면 끝까지 찝찝함을 느낀다.", archetype: "detective" },
    { id: 26, text: "남들이 다 아는 정보보다, 아무도 주목하지 않았던 사소한 기록이나 흔적에서 문제의 실마리를 찾으려 한다.", archetype: "detective" },
    { id: 31, text: "사건의 앞뒤가 안 맞을 때 \"왜?\"라고 끈질기게 질문해서, 상대방이 미처 생각지 못한 부분을 깨닫게 하기도 한다.", archetype: "detective" },
    { id: 36, text: "사건의 흐름을 짚어보며 남들이 놓친 미세한 모순을 찾아냈을 때 기쁨을 느낀다.", archetype: "detective" },

    // Systems Thinker (4)
    { id: 22, text: "문제가 생긴 건 누구 한 명의 잘못이라기보다, 그렇게 행동할 수밖에 없게 만든 '상황의 연결' 때문이라고 생각한다.", archetype: "systems-thinker" },
    { id: 27, text: "하나를 고치면 다른 곳에서 또 문제가 터지는 상황을 방지하기 위해, 문제들의 '얽히고설킨 관계'를 먼저 그린다.", archetype: "systems-thinker" },
    { id: 32, text: "눈앞의 불을 끄는 것보다, 이 문제가 계속 반복되게 만드는 '보이지 않는 판'이 무엇인지 찾는 데 더 집중한다.", archetype: "systems-thinker" },
    { id: 37, text: "한 쪽을 누르면 다른 쪽이 튀어나오는 풍선 효과를 고려해서, 전체적인 균형을 맞추는 고민을 많이 한다.", archetype: "systems-thinker" },

    // Philosopher (4)
    { id: 23, text: "우리가 지금 쓰고 있는 '공정'이나 '성공' 같은 단어들을 팀원 모두가 똑같은 의미로 쓰고 있는지 의심해본다.", archetype: "philosopher" },
    { id: 28, text: "\"이건 효율적이야\"라는 말을 들으면 \"그런데 우리에게 '효율'이 왜 그렇게 중요한 가치죠?\"라고 묻고 싶다.", archetype: "philosopher" },
    { id: 33, text: "\"원래 다 이래\"라는 말을 들을 때 가장 답답하며, 당연하다고 생각하는 전제들을 하나씩 무너뜨려 보고 싶다.", archetype: "philosopher" },
    { id: 38, text: "당장의 해결책보다 '우리가 문제를 바라보는 방식' 자체가 틀렸을지도 모른다는 의심을 한다.", archetype: "philosopher" },

    // Scenario Planner (4)
    { id: 24, text: "계획대로 잘 진행될 때조차 \"만약 갑자기 상황이 바뀌면 우리는 어떻게 대처하지?\"라며 플랜 B를 머릿속으로 그린다.", archetype: "scenario-planner" },
    { id: 29, text: "해결책이 가져올 좋은 결과보다, 그로 인해 생길지도 모를 예상치 못한 부작용 리스트가 먼저 머릿속에 떠오른다.", archetype: "scenario-planner" },
    { id: 34, text: "당장 내일의 성과보다, 이 결정이 1년 뒤 우리 팀에 어떤 영향을 줄지를 생각하면 가끔 밤잠을 설친다.", archetype: "scenario-planner" },
    { id: 39, text: "\"상황이 최악으로 흘러간다면 어떤 일이 벌어질까?\"를 시나리오로 그려보는 것이 불안을 줄이는 최고의 방법이라 생각한다.", archetype: "scenario-planner" },

    // Judge (4)
    { id: 44, text: "누군가의 불만을 들으면 \"이게 개인적인 감정인지, 아니면 공적으로 해결해야 할 정당한 문제인지\"를 먼저 심사한다.", archetype: "judge" },
    { id: 49, text: "해야 할 일들이 산더미 같을 때, 지금 우리 팀이 가진 자원으로 해결할 수 있는 '단 하나의 핵심 문제'를 추려낸다.", archetype: "judge" },
    { id: 54, text: "문제 정의가 논리적으로 설득력이 없으면, 아무리 반짝이는 해결책이라도 \"아직 해결할 준비가 안 됐다\"고 선을 긋는다.", archetype: "judge" },
    { id: 59, text: " \"다 중요해 보여요\"라는 팀원들에게 가장 중요한 단 하나를 고르라고 독려하는 편이다.", archetype: "judge" }
];
