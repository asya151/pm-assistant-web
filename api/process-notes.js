// Vercel Serverless Function
// This processes meeting notes using Claude API

import Anthropic from '@anthropic-ai/sdk';

// Domain context mapping
const DOMAIN_CONTEXTS = {
    'product-strategy': 'Focus on product roadmap, market positioning, competitive analysis, and long-term vision. Key stakeholders: CEO, Sales, Marketing.',
    'engineering': 'Focus on technical deliverables, sprint planning, engineering partnerships, and technical debt. Key stakeholders: Engineering leads, CTO, Design.',
    'customer-success': 'Focus on customer onboarding, retention metrics, support escalations. Key stakeholders: CS team, Sales, Product.',
    'growth-marketing': 'Focus on user acquisition, marketing campaigns, growth metrics, and funnel optimization. Key stakeholders: Marketing, Sales, Product.',
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { domain, notes } = req.body;

        if (!notes || !domain) {
            return res.status(400).json({ error: 'Missing required fields: domain and notes' });
        }

        // Initialize Anthropic client
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            console.error('ANTHROPIC_API_KEY not set');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const anthropic = new Anthropic({ apiKey });

        // Get domain context
        const domainContext = DOMAIN_CONTEXTS[domain] || `Custom domain: ${domain}`;

        // Build system prompt
        const systemPrompt = `You are a Product Manager assistant specialized in ${domain}.

Domain Context: ${domainContext}

Your role:
1. Extract actionable items from meeting notes with clear owners and deadlines
2. Identify key decisions made during meetings
3. Provide concise summaries of meetings
4. Flag dependencies between action items
5. Prioritize items (High/Medium/Low)
6. Note any risks or blockers mentioned

Be thorough but concise. Always assign clear owners and realistic deadlines.`;

        // Create the prompt
        const prompt = `Analyze these meeting notes and extract structured information:

MEETING NOTES:
${notes}

Provide:
1. A brief meeting summary (2-3 sentences)
2. All action items in this format:
   - Title: [clear, actionable title]
   - Owner: [person responsible]
   - Due Date: [specific date or timeframe]
   - Priority: [High/Medium/Low]
   - Dependencies: [any blockers or dependencies]

3. Key decisions made
4. Any risks or concerns mentioned

Be specific and actionable. If owner or date is unclear, note that explicitly.`;

        // Call Claude API
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 4096,
            system: systemPrompt,
            messages: [{
                role: 'user',
                content: prompt
            }]
        });

        // Extract the response
        const analysis = message.content[0].text;

        // Return the result
        return res.status(200).json({
            success: true,
            analysis: analysis,
            domain: domain,
            processedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error processing notes:', error);
        return res.status(500).json({
            error: 'Failed to process notes',
            message: error.message
        });
    }
}
