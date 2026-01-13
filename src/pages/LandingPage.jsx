import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="screen" style={{ justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-h1" style={{ marginBottom: 'var(--space-6)' }}>
                    문제를 푸는 능력보다,<br />
                    <span style={{ color: 'var(--color-text-sub)' }}>문제를 정의하는 방식이</span><br />
                    결과를 바꿉니다.
                </h1>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                    <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>
                        이 테스트는 당신이 문제에 직면했을 때<br />
                        <strong>가장 먼저 꺼내 드는 사고 도구</strong>를 진단합니다.
                    </p>
                    <p className="text-small" style={{ lineHeight: 1.6 }}>
                        성격 검사가 아닙니다.<br />
                        지능 테스트도 아닙니다.<br />
                        오직 당신의 <strong>문제 정의 습관</strong>을 관찰합니다.
                    </p>
                </div>

                <div style={{
                    background: 'var(--color-card-bg)',
                    padding: 'var(--space-5)',
                    borderRadius: '2px',
                    marginBottom: 'var(--space-12)'
                }}>
                    <ul style={{ listStyle: 'none', padding: 0 }} className="text-small">
                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '8px', opacity: 0.5 }}>⏱</span> 60개 문항 (약 10-15분)
                        </li>
                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '8px', opacity: 0.5 }}>⚖️</span> 옳고 그른 답은 없음
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '8px', opacity: 0.5 }}>⚡️</span> 본능적인 반응이 중요
                        </li>
                    </ul>
                </div>

                <button
                    onClick={() => navigate('/intro')}
                    style={{
                        width: '100%',
                        padding: '18px',
                        backgroundColor: 'var(--color-text-main)',
                        color: 'var(--color-surface)',
                        borderRadius: '2px',
                        fontSize: '16px',
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
                >
                    테스트 시작하기
                </button>
            </motion.div>
        </div>
    );
};

export default LandingPage;
