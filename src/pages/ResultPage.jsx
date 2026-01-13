import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { calculateResults } from '../utils/scoring';
import { archetypes } from '../data/archetypes';

const ResultPage = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('archetype_answers');
        if (saved) {
            const answers = JSON.parse(saved);
            setResults(calculateResults(answers));
        }
    }, []);

    if (!results) return <div className="screen" />;

    const primary = archetypes.find(a => a.id === results.primary);
    const secondary = archetypes.find(a => a.id === results.secondary);
    const underUsed = archetypes.find(a => a.id === results.underUsed);

    return (
        <div className="screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-h1">진단 결과</h2>
                <p className="text-body" style={{ marginBottom: '40px' }}>
                    이 결과는 고정된 성향이 아니라<br />
                    지금 이 시점에서 자주 호출된 사고 방식입니다.
                </p>

                {/* 1. Primary */}
                <ResultCard
                    archetype={primary}
                    label="Primary Archetype"
                    subLabel="가장 먼저 호출되는 사고"
                    delay={0.5}
                    highlight
                />

                {/* 2. Secondary */}
                <ResultCard
                    archetype={secondary}
                    label="Secondary Archetype"
                    subLabel="보조적으로 활용하는 사고"
                    delay={1.2}
                />

                {/* 3. Under-used */}
                <ResultCard
                    archetype={underUsed}
                    label="Under-used Archetype"
                    subLabel="가장 늦게 떠오르는 질문"
                    delay={1.9}
                    isUnderUsed
                />

                {/* Summary Chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6 }}
                    style={{ marginTop: '60px', paddingBottom: '60px' }}
                >
                    <h3 className="text-h2" style={{ fontSize: '18px' }}>전체 사고 분포</h3>
                    <div style={{ marginTop: '20px' }}>
                        {results.allScores.map(([id, score], i) => {
                            const arch = archetypes.find(a => a.id === id);
                            const maxScore = results.allScores[0][1] || 1;
                            const percent = (score / maxScore) * 100;

                            return (
                                <div key={id} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                    <div style={{ width: '40px', fontSize: '14px', fontWeight: 600 }}>{arch.name}</div>
                                    <div style={{ flex: 1, height: '8px', borderRadius: '4px', marginLeft: '12px' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ delay: 2.8 + (i * 0.1), duration: 0.5 }}
                                            style={{
                                                height: '100%',
                                                borderRadius: '4px',
                                                background: i === 0 ? 'var(--color-accent)' : '#e0e0e0'
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const ResultCard = ({ archetype, label, subLabel, delay, highlight, isUnderUsed }) => {
    const [expanded, setExpanded] = useState(false);

    if (!archetype) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
            style={{
                background: highlight ? 'var(--color-accent)' : 'var(--color-card-bg)',
                color: highlight ? '#fff' : 'inherit',
                padding: '24px',
                borderRadius: '2px',
                marginBottom: '16px',
                cursor: 'pointer',
                borderLeft: isUnderUsed ? '4px solid #999' : 'none'
            }}
            onClick={() => setExpanded(!expanded)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <span className="text-small" style={{
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: highlight ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)'
                    }}>
                        {label}
                    </span>
                    <h3 className="text-h2" style={{ marginTop: '8px', marginBottom: '4px' }}>{archetype.name}</h3>
                    <p style={{ fontSize: '14px', opacity: 0.8 }}>{subLabel}</p>
                </div>
                <div>
                    {expanded ? '−' : '+'}
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ paddingTop: '20px', borderTop: highlight ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)', marginTop: '20px' }}>
                            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>{archetype.description}</p>
                            <div style={{
                                background: highlight ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                                padding: '12px',
                                borderRadius: '4px'
                            }}>
                                <span style={{ fontWeight: 600, display: 'block', marginBottom: '4px' }}>⚠️ Blind Spot</span>
                                {archetype.blindSpot}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default ResultPage;
