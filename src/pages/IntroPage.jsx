import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IntroPage = () => {
    const navigate = useNavigate();

    return (
        <div className="screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ height: 'var(--space-8)' }}></div>
                <h2 className="text-h2">시작하기 전에</h2>

                <section style={{ marginBottom: 'var(--space-10)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-accent)' }}>
                        무엇을 보나요?
                    </h3>
                    <p className="text-body">
                        당신이 불확실한 상황에 처했을 때<br />
                        <strong>어떤 질문을 가장 먼저 던지는지</strong> 봅니다.<br />
                        사고의 '우선순위'를 진단합니다.
                    </p>
                </section>

                <section style={{ marginBottom: 'var(--space-10)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text-sub)' }}>
                        무엇을 안 보나요?
                    </h3>
                    <p className="text-body">
                        업무 능력, 지능, 인격의 성숙도는<br />
                        측정하지 않습니다. 정답도 없습니다.
                    </p>
                </section>

                <div style={{
                    background: 'var(--color-card-bg)',
                    padding: 'var(--space-6)',
                    borderRadius: '4px',
                    marginBottom: 'var(--space-10)'
                }}>
                    <p style={{ fontWeight: 600, marginBottom: 'var(--space-3)' }}>✍️ 참여 가이드</p>
                    <ul className="text-small" style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>생각을 멈추지 말고 <strong>직관적</strong>으로 답하세요.</li>
                        <li>구체적인 <strong>최근 프로젝트</strong>를 떠올리세요.</li>
                        <li>'이상적인 모습'이 아닌 <strong>'실제 모습'</strong>에 체크하세요.</li>
                    </ul>
                </div>

                <button
                    onClick={() => navigate('/test')}
                    style={{
                        width: '100%',
                        padding: '18px',
                        backgroundColor: 'var(--color-accent)',
                        color: '#fff',
                        borderRadius: '2px',
                        fontWeight: 600,
                        fontSize: '16px'
                    }}
                >
                    테스트 진행하기
                </button>
            </motion.div>
        </div>
    );
};

export default IntroPage;
