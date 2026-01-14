import { createClient } from '@supabase/supabase-js';

/**
 * Vercel Serverless Function: Get Real Population Statistics from Supabase
 */
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    // Fallback data for when Supabase is not yet configured
    const mockStats = {
        totalParticipants: 0,
        distribution: {},
        synergyInsights: [
            { id: 1, text: "데이터베이스 연동 대기 중입니다." },
            { id: 2, text: "Vercel 환경 변수 설정을 확인해주세요." }
        ]
    };

    if (!supabaseUrl || !supabaseServiceKey) {
        return res.status(200).json(mockStats);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        // 1. Get total count
        const { count, error: countError } = await supabase
            .from('results')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        // 2. Get distribution of primary_ids
        const { data: distributionData, error: distError } = await supabase
            .from('results')
            .select('primary_id');

        if (distError) throw distError;

        // Calculate distribution percentages
        const distribution = {};
        if (distributionData && distributionData.length > 0) {
            distributionData.forEach(row => {
                const id = row.primary_id;
                distribution[id] = (distribution[id] || 0) + 1;
            });

            // Convert counts to percentages
            Object.keys(distribution).forEach(id => {
                distribution[id] = Math.round((distribution[id] / distributionData.length) * 100);
            });
        }

        const stats = {
            totalParticipants: count || 0,
            distribution: distribution,
            synergyInsights: [
                { id: 1, text: `현재까지 ${count || 0}명의 데이터가 정밀하게 분석되었습니다.` },
                { id: 2, text: "실시간 데이터베이스 연동을 통해 정확한 통계를 제공합니다." },
                { id: 3, text: "참여자가 늘어날수록 통계는 더욱 정교해집니다." }
            ]
        };

        return res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching stats from Supabase:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
