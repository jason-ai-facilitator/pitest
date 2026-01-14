import { createClient } from '@supabase/supabase-js';

/**
 * Vercel Serverless Function: Save Diagnostic Results to Supabase
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, answers, scores, timestamp } = req.body;

    if (!name || !answers || !scores) {
        return res.status(400).json({ message: 'Missing required data' });
    }

    // Initialize Supabase (Ensure these are set in Vercel Environment Variables)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.warn('Supabase credentials missing. Falling back to log-only mode.');
        return res.status(200).json({
            success: true,
            warning: 'Supabase not configured (SUPABASE_URL or KEY missing)',
            message: 'Result logged to server console only',
            data: { name, timestamp }
        });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the primary archetype ID (the one with the highest score)
    const primaryId = scores.sort((a, b) => b[1] - a[1])[0][0];

    try {
        const { data, error } = await supabase
            .from('results')
            .insert([
                {
                    name,
                    primary_id: primaryId,
                    scores: scores,
                    created_at: timestamp || new Date().toISOString()
                }
            ]);

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: 'Result saved to Supabase',
            data: data
        });
    } catch (error) {
        console.error('Error saving to Supabase:', error);
        return res.status(500).json({ error: `Database Save Failed: ${error.message}` });
    }
}
