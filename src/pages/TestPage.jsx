import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';

const TestPage = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showReflection, setShowReflection] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);

    // Safely get question (in case index goes out of bounds momentarily)
    const currentQuestion = questions[index] || questions[0];
    const progress = ((index) / questions.length) * 100;

    const handleAnswer = (val) => {
        const newAnswers = { ...answers, [currentQuestion.id]: val };
        setAnswers(newAnswers);

        // 400ms delay for "Deliberate Pacing"
        setTimeout(() => {
            if (index === 29 && !showReflection) {
                setShowReflection(true);
            } else if (index < questions.length - 1) {
                setIndex(prev => prev + 1);
            } else {
                finishTest(newAnswers);
            }
        }, 400);
    };

    const handleReflectionNext = () => {
        setShowReflection(false);
        setIndex(prev => prev + 1);
    };

    const finishTest = (finalAnswers) => {
        setIsFinishing(true);
        // 2.5 seconds Pre-Result Silence
        setTimeout(() => {
            localStorage.setItem('archetype_answers', JSON.stringify(finalAnswers));
            navigate('/result');
        }, 2500);
    };

    if (isFinishing) {
        return (
            <div className="screen" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-body" style={{ opacity: 0.6, fontSize: '15px' }}>
                        사고 패턴을 정리하고 있습니다.
                    </p>
                </motion.div>
            </div>
        );
    }

    if (showReflection) {
        return (
            <motion.div
                className="screen"
                style={{ justifyContent: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h3 className="text-h2" style={{ textAlign: 'center', marginBottom: '20px' }}>잠시만요.</h3>
                <p className="text-body" style={{ textAlign: 'center', marginBottom: '40px', lineHeight: '1.8' }}>
                    지금까지의 질문은<br />
                    당신이 어떤 답을 '선호하는지'보다<br />
                    <strong>어떤 질문을 먼저 떠올리는지</strong>를 보고 있습니다.
                </p>
                <button
                    onClick={handleReflectionNext}
                    style={{
                        padding: '14px 40px',
                        backgroundColor: 'var(--color-text-main)',
                        color: 'white',
                        margin: '0 auto',
                        display: 'block',
                        borderRadius: '2px',
                        fontWeight: 500
                    }}
                >
                    계속하기
                </button>
            </motion.div>
        );
    }

    return (
        <div className="screen">
            {/* Abstract Progress Bar */}
            <div style={{
                width: '100%',
                height: '4px',
                background: '#f0f0f0',
                marginBottom: '40px',
                marginTop: '20px',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        background: 'var(--color-accent)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '60px' }}
                >
                    <div style={{ marginBottom: '60px' }}>
                        <span className="text-small" style={{ display: 'block', marginBottom: '16px', color: 'var(--color-accent)', letterSpacing: '1px' }}>
                            QUESTION {index + 1}
                        </span>
                        <h2 className="text-h1" style={{ fontSize: '24px', fontWeight: 500, lineHeight: 1.4 }}>
                            {currentQuestion.text}
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span className="text-small" style={{ fontSize: '13px' }}>전혀 그렇지 않다</span>
                            <span className="text-small" style={{ fontSize: '13px' }}>매우 그렇다</span>
                        </div>

                        <div style={{ position: 'relative', height: '60px', display: 'flex', alignItems: 'center' }}>
                            <div style={{ position: 'absolute', left: '20px', right: '20px', height: '1px', background: '#e0e0e0', zIndex: 0 }} />
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', zIndex: 1 }}>
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => handleAnswer(val)}
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '50%',
                                            border: '2px solid transparent',
                                            backgroundColor: '#fff',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <div style={{
                                            width: val === 1 || val === 5 ? '16px' : '10px',
                                            height: val === 1 || val === 5 ? '16px' : '10px',
                                            background: '#ddd',
                                            borderRadius: '50%',
                                            margin: '0 auto'
                                        }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TestPage;
