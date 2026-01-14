/**
 * Vercel Serverless Function: Save Diagnostic Results
 * Currently logs the data and returns a success response.
 * Can be extended to save to Google Sheets, Supabase, or any other DB.
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, answers, scores, timestamp } = req.body;

    if (!name || !answers || !scores) {
        return res.status(400).json({ message: 'Missing required data' });
    }

    // LOG FOR VIEWING IN VERCEL LOGS
    console.log('--- NEW DIAGNOSTIC RESULT ---');
    console.log(`User: ${name}`);
    console.log(`Time: ${timestamp}`);
    console.log(`Scores: ${JSON.stringify(scores)}`);
    console.log('----------------------------');

    /**
     * FUTURE INTEGRATION:
     * To save to Google Sheets, you can use a library like 'google-spreadsheet'
     * or send a webhook to services like Make.com/Zapier.
     */

    return res.status(200).json({
        success: true,
        message: 'Result saved successfully',
        data: { name, timestamp }
    });
}
