# PM Assistant - Web Interface

A beautiful web interface for processing meeting notes and extracting action items using Claude AI.

## 🌟 Features

- ✅ Beautiful, responsive web interface
- ✅ Process meeting notes instantly
- ✅ Extract action items automatically
- ✅ Multiple PM domain support
- ✅ Identify risks and blockers
- ✅ Free hosting on Vercel + GitHub Pages
- ✅ No local setup required

## 🚀 Quick Deploy (5 Minutes)

### Prerequisites

1. **GitHub Account** (free) - https://github.com
2. **Vercel Account** (free) - https://vercel.com
3. **Anthropic API Key** (free $5 credits) - https://console.anthropic.com

### Step 1: Push to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it: `pm-assistant-web`
   - Make it Public
   - Click "Create repository"

2. Push your code to GitHub:
   ```bash
   cd C:\Users\asyad\pm-assistant-web
   git init
   git add .
   git commit -m "Initial commit: PM Assistant web interface"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/pm-assistant-web.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/signup
   - Sign up with your GitHub account (easiest)
   - Authorize Vercel to access your repositories

2. **Import Project**:
   - Click "Add New" → "Project"
   - Select your `pm-assistant-web` repository
   - Click "Import"

3. **Configure Environment Variables**:
   - Before deploying, click "Environment Variables"
   - Add variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: Your API key from https://console.anthropic.com/settings/keys
   - Click "Add"

4. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for deployment
   - You'll get a URL like: `https://pm-assistant-web.vercel.app`

### Step 3: Use It!

1. Visit your Vercel URL
2. Select your PM domain
3. Paste meeting notes
4. Click "Process Notes"
5. Get instant action items!

## 🎯 How to Get Anthropic API Key

### Option 1: Free Trial ($5 Credits)

1. Go to: https://console.anthropic.com/
2. Sign up with email
3. Go to "Settings" → "Billing"
4. Add credit card (required but you get $5 free)
5. Go to "API Keys"
6. Click "Create Key"
7. Copy the key (starts with `sk-ant-api03-`)

### Option 2: Wait Until You Have Access

If you don't have API access yet:
- The web interface is ready
- Deploy it now
- Add API key later when you have access
- Everything will work once the key is added

## 📁 Project Structure

```
pm-assistant-web/
├── index.html          # Frontend web interface
├── api/
│   └── process-notes.js  # Serverless backend function
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
└── README.md          # This file
```

## 🛠️ Local Development (Optional)

If you want to test locally before deploying:

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Install dependencies:
```bash
cd pm-assistant-web
npm install
```

### Add API key locally:
Create a `.env` file:
```
ANTHROPIC_API_KEY=your-key-here
```

### Run locally:
```bash
vercel dev
```

Visit: http://localhost:3000

## 🎨 Customization

### Add More Domains

Edit `api/process-notes.js` and add to `DOMAIN_CONTEXTS`:

```javascript
const DOMAIN_CONTEXTS = {
    'product-strategy': '...',
    'engineering': '...',
    'your-domain': 'Your domain description here',
};
```

Edit `index.html` and add to the dropdown:

```html
<select id="domain">
    <option value="your-domain">Your Domain Name</option>
    ...
</select>
```

### Change Colors/Styling

Edit the `<style>` section in `index.html`:
- Primary color: `#667eea` (purple-blue)
- Secondary color: `#764ba2` (purple)

### Modify AI Behavior

Edit the system prompt in `api/process-notes.js`:
- Change tone (more formal/casual)
- Add specific formatting requirements
- Focus on different aspects

## 💰 Cost Estimate

**Free Tier:**
- Vercel hosting: FREE (hobby plan)
- Anthropic API: $5 free credits, then:
  - ~$0.05-0.15 per meeting processed
  - ~$15-30/month for daily use

**Total monthly cost:** $15-30 after free credits

## 🔒 Security

- ✅ API key stored securely in Vercel environment variables
- ✅ Never exposed to frontend
- ✅ CORS enabled for your domain only
- ✅ Serverless functions (no server to maintain)

## 📊 Features by Domain

### Product Strategy
- Roadmap planning
- Market positioning
- Competitive analysis
- Vision alignment

### Engineering Coordination
- Sprint planning
- Technical deliverables
- Engineering partnerships
- Technical debt tracking

### Customer Success
- Onboarding workflows
- Retention strategies
- Support escalations
- Customer feedback

### Growth & Marketing
- User acquisition
- Campaign planning
- Growth metrics
- Funnel optimization

## 🐛 Troubleshooting

### "Server configuration error"
- Check that `ANTHROPIC_API_KEY` is set in Vercel environment variables
- Redeploy after adding the key

### "Failed to process notes"
- Check Vercel function logs
- Verify API key is valid
- Check Anthropic API status

### Frontend not loading
- Check Vercel deployment status
- Verify DNS settings (if using custom domain)
- Clear browser cache

### API calls failing
- Open browser console (F12)
- Check network tab for errors
- Verify backend function is deployed

## 🔄 Updates and Maintenance

### Update the Code:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel automatically redeploys on push to main branch!

### Update Dependencies:
```bash
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

## 🚀 Next Steps

### Immediate:
- [x] Deploy to Vercel
- [ ] Test with real meeting notes
- [ ] Share URL with team

### This Week:
- [ ] Add more PM domains
- [ ] Customize for your workflow
- [ ] Connect to Jira/Asana API

### This Month:
- [ ] Add action item storage (database)
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Slack bot integration

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Anthropic API Docs**: https://docs.anthropic.com
- **Claude Prompt Engineering**: https://docs.anthropic.com/claude/docs/introduction-to-prompt-design

## 🆘 Support

- **Vercel Issues**: https://github.com/vercel/vercel/discussions
- **Anthropic Support**: https://support.anthropic.com
- **This Project**: Create an issue on your GitHub repo

## 📄 License

Free to use and modify for your own purposes.

---

**Built with ❤️ using Claude AI**

Ready to transform your meeting notes into action! 🚀
