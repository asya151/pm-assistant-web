// Azure Functions - Meeting Notes Processor
// Using GitHub Models API (Free!)
const { app } = require('@azure/functions');
const OpenAI = require('openai');

// Domain context mapping
const DOMAIN_CONTEXTS = {
    'product-strategy': 'Focus on product roadmap, market positioning, competitive analysis, and long-term vision. Key stakeholders: CEO, Sales, Marketing.',
    'engineering': 'Focus on technical deliverables, sprint planning, engineering partnerships, and technical debt. Key stakeholders: Engineering leads, CTO, Design.',
    'customer-success': 'Focus on customer onboarding, retention metrics, support escalations. Key stakeholders: CS team, Sales, Product.',
    'growth-marketing': 'Focus on user acquisition, marketing campaigns, growth metrics, and funnel optimization. Key stakeholders: Marketing, Sales, Product.',
};

app.http('process-notes', {
    methods: ['GET', 'POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            };
        }

        context.log('Processing meeting notes request with GitHub Models');

        try {
            // Parse request body
            const body = await request.json();
            const { domain, notes } = body;

            if (!notes || !domain) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        error: 'Missing required fields: domain and notes'
                    })
                };
            }

            // Get GitHub token from environment
            const githubToken = process.env.GITHUB_TOKEN;
            if (!githubToken) {
                context.log.error('GITHUB_TOKEN not configured');
                return {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        error: 'Server configuration error: GitHub token not set'
                    })
                };
            }

            // Initialize OpenAI client with GitHub Models endpoint
            const openai = new OpenAI({
                baseURL: 'https://models.inference.ai.azure.com',
                apiKey: githubToken,
            });

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
            const userPrompt = `Analyze these meeting notes and extract structured information:

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

            context.log('Calling GitHub Models API (GPT-4o)...');

            // Call GitHub Models API
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 2000,
            });

            // Extract the response
            const analysis = response.choices[0].message.content;

            context.log('Successfully processed notes with GitHub Models');

            // Return the result
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: true,
                    analysis: analysis,
                    domain: domain,
                    model: 'gpt-4o (GitHub Models)',
                    processedAt: new Date().toISOString()
                })
            };

        } catch (error) {
            context.log.error('Error processing notes:', error);
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Failed to process notes',
                    message: error.message
                })
            };
        }
    }
});
