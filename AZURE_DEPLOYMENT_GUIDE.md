# 🚀 Azure + GitHub Deployment Guide

Complete guide to deploy your PM Assistant on **Azure Static Web Apps** with **GitHub** integration.

## Why Azure Static Web Apps?

✅ **Free tier** - Generous free tier perfect for this use case
✅ **GitHub integration** - Auto-deploy on push
✅ **Serverless API** - Azure Functions included
✅ **Global CDN** - Fast worldwide
✅ **Custom domains** - Free SSL certificates
✅ **Enterprise ready** - Microsoft Azure infrastructure

---

## 📋 Prerequisites

Before starting:
- [ ] GitHub account (free) - https://github.com/signup
- [ ] Azure account (free) - https://azure.microsoft.com/free
- [ ] Git installed on your computer
- [ ] Anthropic API key (or plan to add later)

**Azure Free Tier Includes:**
- 100 GB bandwidth/month
- 2 custom domains
- Unlimited Azure Functions executions (first 1M free)
- Free SSL certificates

---

## Part 1: Setup GitHub Repository (5 minutes)

### Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new

2. **Fill in details**:
   - Repository name: `pm-assistant-web`
   - Description: "PM Assistant - Meeting notes processor with Claude AI on Azure"
   - Visibility: **Public** ✓
   - ❌ Don't initialize with README

3. **Click "Create repository"**

4. **Copy the repository URL** (e.g., `https://github.com/YOUR-USERNAME/pm-assistant-web.git`)

### Step 2: Push Code to GitHub

Open PowerShell in your project folder:

```powershell
# Navigate to project folder
cd C:\Users\asyad\pm-assistant-web

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: PM Assistant for Azure"

# Rename branch to main
git branch -M main

# Add your GitHub repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/pm-assistant-web.git

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password)
- Create token at: https://github.com/settings/tokens

✅ **Success!** Your code is now on GitHub!

---

## Part 2: Create Azure Static Web App (5 minutes)

### Step 1: Sign Up for Azure

1. **Go to**: https://azure.microsoft.com/free

2. **Click "Start free"**

3. **Sign in** with Microsoft account (or create one)

4. **Complete registration**:
   - Add credit card (required but won't be charged for free tier)
   - Complete verification
   - Accept terms

5. **Go to Azure Portal**: https://portal.azure.com

### Step 2: Create Static Web App

1. **In Azure Portal**, click **"Create a resource"**

2. **Search for**: `Static Web App`

3. **Click "Create"**

### Step 3: Configure Your App

#### **Basics Tab:**

- **Subscription**: Select your subscription
- **Resource Group**:
  - Click "Create new"
  - Name: `pm-assistant-rg`
  - Click "OK"
- **Name**: `pm-assistant` (or your preferred name)
  - This will be your URL: `pm-assistant.azurestaticapps.net`
- **Plan type**: **Free**
- **Region**: Choose closest to you (e.g., East US, West Europe)

#### **GitHub Details:**

- **Sign in with GitHub** (click the button)
- **Authorize Azure Static Web Apps**
- **Organization**: Your GitHub username
- **Repository**: `pm-assistant-web`
- **Branch**: `main`

#### **Build Details:**

- **Build Presets**: Select **"Custom"**
- **App location**: `/` (root)
- **Api location**: `api`
- **Output location**: Leave empty

### Step 4: Review and Create

1. Click **"Review + create"**

2. Review your settings

3. Click **"Create"**

4. Wait 2-3 minutes for deployment

5. Click **"Go to resource"** when done

✅ **Your Static Web App is created!**

---

## Part 3: Configure Environment Variables (2 minutes)

### Add Your Anthropic API Key

1. **In your Static Web App** (still in Azure Portal)

2. **Left menu** → Click **"Configuration"**

3. **Click "+ Add"** under Application settings

4. **Add variable**:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your API key (starts with `sk-ant-api03-`)
   - Click "OK"

5. **Click "Save"** at the top

**Don't have an API key yet?**
- Skip this step
- Your app will deploy successfully
- Add the key later when you get access
- The app will work once key is added

### Wait for Deployment

After saving, GitHub Actions will automatically:
1. Build your app
2. Deploy to Azure
3. Takes about 2-3 minutes

**Check deployment status:**
- Go to your GitHub repo
- Click "Actions" tab
- See the deployment progress

---

## Part 4: Test Your PM Assistant (1 minute)

### Get Your URL

1. **In Azure Portal**, in your Static Web App

2. **Overview** page shows your URL:
   ```
   https://pm-assistant.azurestaticapps.net
   ```
   (or your custom name)

3. **Click the URL** or copy it

### Test It!

1. **Visit your URL**

2. **Select a PM domain**

3. **Paste meeting notes** (use the sample in the textarea)

4. **Click "Process Notes"**

5. **Wait 5-10 seconds**

6. **See AI-generated results!** 🎉

---

## Part 5: Share with Your Team

### Your PM Assistant is Live!

Share this URL with your team:
```
https://pm-assistant.azurestaticapps.net
```

### Example Message:

```
Hey team! 👋

Our new PM Assistant is live on Azure!

🔗 https://pm-assistant.azurestaticapps.net

Features:
✅ Paste meeting notes
✅ Get instant AI analysis
✅ Extract action items automatically
✅ Identify risks and blockers

Try it with your next meeting! 🚀
```

---

## 🎨 Customization

### Add Custom Domain

1. **In Azure Portal** → Your Static Web App

2. **Left menu** → **"Custom domains"**

3. **Click "+ Add"**

4. **Select domain type**:
   - Custom domain with any DNS provider
   - Azure DNS zone

5. **Follow the wizard** to add DNS records

6. **Free SSL certificate** automatically provisioned!

### Update Code

Any time you want to update:

```powershell
# Make your changes to files
# Then commit and push:

git add .
git commit -m "Update: description of changes"
git push
```

**Azure automatically redeploys!** (takes 2-3 minutes)

### Add More PM Domains

1. **Edit** `api/process-notes/index.js`

2. **Add to** `DOMAIN_CONTEXTS`:
```javascript
'your-domain': 'Your domain description here',
```

3. **Edit** `index.html`

4. **Add dropdown option**:
```html
<option value="your-domain">Your Domain Name</option>
```

5. **Commit and push** - auto-deploys!

---

## 🔧 Troubleshooting

### "Server configuration error"

**Problem**: API key not set

**Solution**:
1. Azure Portal → Your app → Configuration
2. Add `ANTHROPIC_API_KEY`
3. Save and wait for redeploy

### Build Failed on GitHub Actions

**Problem**: Build error during deployment

**Solution**:
1. Go to your GitHub repo → Actions tab
2. Click the failed workflow
3. Read the error logs
4. Common issues:
   - Missing files - ensure all files are committed
   - Wrong paths - check `api` folder structure
   - Node version - should be 18+

### API Not Working

**Problem**: Frontend loads but API fails

**Solution**:
1. Azure Portal → Your app → Functions
2. Check if `process-notes` function appears
3. Check logs in "Log stream"
4. Verify API key is set correctly

### Can't Push to GitHub

**Problem**: Authentication failed

**Solution**:
1. Create Personal Access Token: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select: `repo` scope
   - Click "Generate token"
   - Copy the token
2. Use token as password when pushing

---

## 📊 Monitor Usage and Costs

### Check Azure Costs

1. **Azure Portal** → **"Cost Management + Billing"**

2. **Cost Analysis** shows daily costs

3. **Expected costs**:
   - Static Web App: **$0** (free tier)
   - Functions: **$0** for first 1M executions
   - Bandwidth: **$0** for first 100GB

### Check API Usage

1. **Anthropic Console**: https://console.anthropic.com

2. **Dashboard** → **Usage**

3. **Typical costs**:
   - $0.05-0.15 per meeting processed
   - ~$15-30/month for daily use

### Monitor App Performance

1. **Azure Portal** → Your app → **"Application Insights"**

2. **View**:
   - Request counts
   - Response times
   - Error rates
   - Geographic distribution

---

## 🔒 Security Best Practices

### ✅ What's Secure:

- API key stored in Azure (not in code)
- HTTPS automatically enabled
- Azure Functions authentication available
- CORS configured properly

### 🔐 Enhanced Security (Optional):

#### Add Function Key Authentication:

1. Edit `function.json`:
```json
{
  "authLevel": "function",
  ...
}
```

2. Get function key from Azure Portal

3. Update frontend to include key in requests

#### Restrict Access by IP:

1. Azure Portal → Your app → **"Networking"**

2. **Access restriction** → Add rules

---

## 🚀 Advanced Features

### Enable Staging Environments

1. **Azure Portal** → Your app → **"Environments"**

2. Create staging environment

3. Test changes before production

### Add Monitoring Alerts

1. **Azure Portal** → Your app → **"Alerts"**

2. Create alert rules:
   - High error rate
   - Slow response time
   - API failures

### Connect to Azure DevOps (Alternative to GitHub)

1. Use Azure DevOps instead of GitHub

2. Configure Azure Pipelines

3. Same deployment process

---

## 📈 Scaling

### When to Upgrade from Free Tier:

**Free tier limits:**
- 100 GB bandwidth/month
- 2 custom domains

**Standard tier ($9/month):**
- Unlimited bandwidth
- 5 custom domains
- SLA guarantee
- Enhanced performance

**Upgrade when you hit limits or need SLA**

---

## 🆘 Getting Help

### Official Resources:

- **Azure Static Web Apps Docs**: https://learn.microsoft.com/azure/static-web-apps/
- **Azure Functions Docs**: https://learn.microsoft.com/azure/azure-functions/
- **GitHub Actions**: https://docs.github.com/actions
- **Anthropic API**: https://docs.anthropic.com

### Support Channels:

- **Azure Support**: Portal → Help + support
- **GitHub Issues**: Your repo → Issues tab
- **Anthropic Support**: https://support.anthropic.com

---

## 📚 Next Steps

### Week 1:
- [x] Deploy to Azure
- [ ] Test with real meeting notes
- [ ] Share with team members
- [ ] Gather feedback

### Week 2:
- [ ] Add custom domain
- [ ] Customize for your PM areas
- [ ] Set up monitoring alerts
- [ ] Review usage and costs

### Month 1:
- [ ] Add database for storing action items (Azure Cosmos DB)
- [ ] Email notifications (Azure Logic Apps)
- [ ] Calendar integration (Microsoft Graph API)
- [ ] Teams bot integration

---

## 💰 Cost Breakdown

### Free Tier (Your Current Setup):
- **Azure Static Web Apps**: $0
- **Azure Functions**: $0 (first 1M executions)
- **Bandwidth**: $0 (first 100GB)
- **SSL Certificate**: $0
- **GitHub**: $0

### API Costs (Pay-as-you-go):
- **Anthropic API**:
  - First $5 free
  - Then ~$0.10 per meeting
  - ~$15-30/month for daily use

### **Total Monthly Cost: $15-30** (after free credits)

---

## 🎉 Congratulations!

You now have a **professional PM Assistant** running on:
- ✅ Azure infrastructure (enterprise-grade)
- ✅ GitHub (version control + CI/CD)
- ✅ Globally distributed (fast everywhere)
- ✅ Auto-scaling (handles any load)
- ✅ Free hosting (until you exceed limits)

**Your PM Assistant is production-ready!** 🚀

---

## Architecture Diagram

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────────┐
│  Azure Static Web App   │
│  (Global CDN)           │
│  ┌─────────────────┐    │
│  │  index.html     │    │
│  │  (Frontend)     │    │
│  └─────────────────┘    │
└───────────┬─────────────┘
            │
            │ HTTPS
            ▼
┌─────────────────────────┐
│  Azure Functions        │
│  (Serverless API)       │
│  ┌─────────────────┐    │
│  │ process-notes   │    │
│  │ function        │    │
│  └─────────────────┘    │
└───────────┬─────────────┘
            │
            │ API Call
            ▼
┌─────────────────────────┐
│  Anthropic API          │
│  (Claude AI)            │
└─────────────────────────┘

GitHub Actions monitors main branch
↓
Auto-deploys on push
```

Perfect for enterprise use with Azure's security and compliance! 🎯
