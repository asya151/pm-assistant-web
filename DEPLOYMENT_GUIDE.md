# 🚀 Step-by-Step Deployment Guide

Complete guide to get your PM Assistant live on the web in under 10 minutes.

## ✅ Checklist

Before starting, make sure you have:
- [ ] GitHub account (create at https://github.com/signup)
- [ ] Git installed on your computer
- [ ] Vercel account (create at https://vercel.com/signup)
- [ ] Anthropic API key (or plan to add later)

---

## Part 1: Setup GitHub (5 minutes)

### Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new

2. **Fill in details**:
   - Repository name: `pm-assistant-web`
   - Description: "PM Assistant - Meeting notes processor with Claude AI"
   - Visibility: **Public** ✓
   - ❌ Don't initialize with README (we already have one)

3. **Click "Create repository"**

4. **Copy the repository URL** (looks like: `https://github.com/YOUR-USERNAME/pm-assistant-web.git`)

### Step 2: Install Git (if needed)

**Check if Git is installed:**
```bash
git --version
```

**If not installed:**
- Windows: Download from https://git-scm.com/download/win
- Mac: Run `git --version` in terminal (auto-installs)
- Linux: `sudo apt install git`

### Step 3: Push Code to GitHub

Open Command Prompt or PowerShell in the project folder:

```bash
# Navigate to project folder
cd C:\Users\asyad\pm-assistant-web

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: PM Assistant web interface"

# Rename branch to main
git branch -M main

# Add your GitHub repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/pm-assistant-web.git

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Use your GitHub username
- For password, use a Personal Access Token (not your account password)
- Create token at: https://github.com/settings/tokens

✅ **Success!** Your code is now on GitHub!

---

## Part 2: Deploy to Vercel (3 minutes)

### Step 1: Sign Up for Vercel

1. **Go to**: https://vercel.com/signup

2. **Sign up with GitHub** (easiest method)
   - Click "Continue with GitHub"
   - Authorize Vercel

### Step 2: Import Your Project

1. **Click "Add New"** → **"Project"**

2. **Import Git Repository**:
   - You'll see your GitHub repositories
   - Find `pm-assistant-web`
   - Click **"Import"**

### Step 3: Configure Project

1. **Framework Preset**: Vercel should auto-detect (leave as is)

2. **Root Directory**: Leave as `./`

3. **Build Settings**: Leave defaults

### Step 4: Add API Key (Optional - can add later)

**If you have an Anthropic API key:**

1. Scroll to **"Environment Variables"**

2. Click **"Add"**

3. Enter:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your API key (starts with `sk-ant-api03-`)

4. Click **"Add"**

**If you don't have an API key yet:**
- Skip this step
- Deploy anyway
- Add the key later when you get access

### Step 5: Deploy!

1. Click **"Deploy"**

2. Wait 1-2 minutes (watch the build logs - it's cool!)

3. When done, you'll see: **"Congratulations!"** 🎉

4. **Copy your URL**: Something like `https://pm-assistant-web.vercel.app`

✅ **Your PM Assistant is LIVE!**

---

## Part 3: Get Anthropic API Key (if needed)

### Option 1: Free Trial

1. **Go to**: https://console.anthropic.com/

2. **Sign up** with your email

3. **Verify your email**

4. **Add billing info**:
   - Go to Settings → Billing
   - Add credit card
   - You get **$5 free credits** (no charge initially)

5. **Create API Key**:
   - Go to Settings → API Keys
   - Click "Create Key"
   - Name it: "PM Assistant Web"
   - Copy the key (starts with `sk-ant-api03-`)

6. **Add to Vercel**:
   - Go back to Vercel
   - Click your project
   - Go to "Settings" → "Environment Variables"
   - Add: `ANTHROPIC_API_KEY` = your key
   - Click "Save"
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Option 2: Use Later

- Your website is deployed
- Frontend works perfectly
- Just add the API key when you get access
- Then redeploy (takes 30 seconds)

---

## Part 4: Test Your PM Assistant

### Step 1: Visit Your URL

Go to your Vercel URL: `https://pm-assistant-web.vercel.app`

### Step 2: Try It Out

1. **Select a domain** (e.g., "Product Strategy")

2. **Paste sample meeting notes**:
```
Meeting: Q1 Product Review
Date: Feb 8, 2026
Attendees: Sarah (CEO), John (PM), Mike (Eng)

Discussion:
- Reviewed Q4 performance - hit 85% of targets
- New mobile feature needs to launch by March 15
- Marketing wants 2 weeks for campaign prep
- Engineering concerned about API performance

Decisions:
- Delay launch to March 15
- Focus next 2 sprints on performance
- John to complete competitor analysis by Feb 20

Questions:
- Budget for Q2?
- When to hire 2 new engineers?
```

3. **Click "Process Notes"**

4. **Wait 5-10 seconds**

5. **See results!** ✨

---

## Part 5: Share with Your Team

### Get Your Link

Your PM Assistant is live at:
```
https://pm-assistant-web.vercel.app
```

or your custom domain if you set one up.

### Share It

Send to your team:
```
Hey team! 👋

I built a PM Assistant that processes meeting notes automatically!

Try it: https://pm-assistant-web.vercel.app

Just paste your meeting notes and it extracts:
✅ Action items with owners
✅ Key decisions
✅ Risks and blockers
✅ Priorities

Saves hours of manual work! 🚀
```

---

## 🎨 Customization (Optional)

### Add Custom Domain

1. **In Vercel**:
   - Go to project Settings
   - Click "Domains"
   - Add your domain (e.g., `pm-assistant.yourdomain.com`)

2. **In your DNS**:
   - Add CNAME record pointing to Vercel
   - Follow Vercel's instructions

### Change Colors

Edit `index.html`, find the `<style>` section:

```css
/* Change primary color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to blue gradient */
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Change to green gradient */
background: linear-gradient(135deg, #0cebeb 0%, #20e3b2 100%);
```

### Add More Domains

1. **Edit `api/process-notes.js`**:
   Add your domain to `DOMAIN_CONTEXTS`

2. **Edit `index.html`**:
   Add option to the `<select>` dropdown

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new domain"
   git push
   ```

Vercel auto-deploys on push! 🚀

---

## 🔧 Troubleshooting

### "Server configuration error"

**Problem**: API key not set in Vercel

**Solution**:
1. Go to Vercel project
2. Settings → Environment Variables
3. Add `ANTHROPIC_API_KEY`
4. Redeploy

### "Failed to process notes"

**Problem**: API error or rate limit

**Solution**:
1. Check Vercel function logs (in dashboard)
2. Verify API key is valid at console.anthropic.com
3. Check if you have API credits remaining

### Can't push to GitHub

**Problem**: Authentication failed

**Solution**:
1. Create Personal Access Token: https://github.com/settings/tokens
2. Use token as password when pushing
3. Or use GitHub Desktop app

### Build failed on Vercel

**Problem**: Missing dependencies or config

**Solution**:
1. Check build logs in Vercel
2. Verify all files are committed
3. Check `package.json` is present

---

## 📊 Monitor Usage

### Check API Usage

1. Go to: https://console.anthropic.com/
2. Dashboard → Usage
3. See costs per day

### Check Vercel Usage

1. Go to Vercel dashboard
2. Your project → Analytics
3. See function invocations

---

## 🎯 Next Steps

Now that you're live:

### Week 1:
- [ ] Test with real meeting notes
- [ ] Share with 2-3 team members
- [ ] Gather feedback

### Week 2:
- [ ] Add your custom PM domains
- [ ] Customize colors/branding
- [ ] Set up custom domain (optional)

### Month 1:
- [ ] Add database for storing action items
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Slack bot

---

## 🆘 Need Help?

**Stuck?** Check:
- Vercel docs: https://vercel.com/docs
- Anthropic docs: https://docs.anthropic.com
- GitHub docs: https://docs.github.com

**Still stuck?**
- Check Vercel function logs
- Look at browser console (F12)
- Verify all environment variables

---

**🎉 Congratulations! Your PM Assistant is live!**

You now have a professional web app that processes meeting notes with AI, hosted for free, and accessible from anywhere! 🚀
