# 🚀 Deployment Guide - PrintPro 3D Website

This guide provides detailed instructions for deploying your 3D printing website to various hosting platforms. Since you're running low on Netlify credits, we've included multiple alternatives.

---

## 📋 Table of Contents

1. [Vercel (Recommended)](#1-vercel-recommended)
2. [Cloudflare Pages](#2-cloudflare-pages)
3. [GitHub Pages](#3-github-pages)
4. [Netlify (for reference)](#4-netlify-for-reference)
5. [Traditional Hosting (cPanel/FTP)](#5-traditional-hosting-cpanelftp)
6. [AWS S3 + CloudFront](#6-aws-s3--cloudfront)
7. [DigitalOcean App Platform](#7-digitalocean-app-platform)
8. [Render.com](#8-rendercom)
9. [Post-Deployment Checklist](#9-post-deployment-checklist)
10. [Domain Configuration](#10-domain-configuration)

---

## 1. Vercel (Recommended)

**Why Vercel:** Free tier, excellent performance, automatic HTTPS, built-in form handling via API routes.

### Step-by-Step:

#### A. Sign Up & Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → Choose "Continue with GitHub"
3. Authorize Vercel to access your repositories

#### B. Import Project
1. Click "Add New" → "Project"
2. Find `3d-printing-website` repository
3. Click "Import"

#### C. Configure Project
```
Framework Preset: Other
Root Directory: 3d.bdecors
Build Command: (leave empty)
Output Directory: .
Install Command: (leave empty)
```

#### D. Deploy
1. Click "Deploy"
2. Wait 1-2 minutes for deployment
3. Your site will be live at `https://your-project.vercel.app`

#### E. Form Handling on Vercel
Since Netlify Forms won't work on Vercel, you have two options:

**Option 1: Formspree (Easiest)**
```html
<!-- Update form action in index.html -->
<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
```
1. Go to [formspree.io](https://formspree.io)
2. Sign up and create a new form
3. Get your form ID
4. Update `index.html` line 560 with your Formspree URL

**Option 2: Vercel Serverless Function**
Create `api/submit-form.js`:
```javascript
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;

    // Send email (use SendGrid, Resend, or your preferred service)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: '3d@bdecors.com',
    //   subject: 'New Quote Request',
    //   html: `<h1>New request from ${formData.name}</h1>...`
    // });

    res.status(200).json({ success: true });
  }
}
```

Update form in `index.html`:
```html
<form method="POST" action="/api/submit-form">
```

---

## 2. Cloudflare Pages

**Why Cloudflare:** Free unlimited bandwidth, excellent CDN, fast global delivery, free SSL.

### Step-by-Step:

#### A. Sign Up
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up with email or GitHub

#### B. Create Project
1. Click "Create a project"
2. Connect to GitHub
3. Select `3d-printing-website` repository

#### C. Configure Build
```
Project name: printpro-3d
Production branch: main (or your branch)
Build command: (leave empty)
Build output directory: 3d.bdecors
```

#### D. Add Environment Variables (if needed)
- None required for static site

#### E. Deploy
1. Click "Save and Deploy"
2. Wait 1-2 minutes
3. Live at `https://printpro-3d.pages.dev`

#### F. Form Handling
Use **Web3Forms** (free, no backend needed):

1. Go to [web3forms.com](https://web3forms.com)
2. Sign up and get your Access Key
3. Update your form in `index.html`:

```html
<form method="POST" action="https://api.web3forms.com/submit">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
  <input type="hidden" name="redirect" value="https://yoursite.com/thank-you.html">
  <!-- Rest of your form fields -->
</form>
```

---

## 3. GitHub Pages

**Why GitHub Pages:** Completely free, simple setup, good for static sites.

### Step-by-Step:

#### A. Update Your Repository
1. Your files need to be in the root OR in a `docs` folder
2. Create a `docs` folder in your repo root
3. Move contents of `3d.bdecors` to `docs`:

```bash
mkdir docs
cp 3d.bdecors/* docs/
git add docs
git commit -m "Add docs folder for GitHub Pages"
git push
```

#### B. Enable GitHub Pages
1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Under "Source":
   - Branch: `main`
   - Folder: `/docs`
4. Click "Save"

#### C. Wait for Deployment
- GitHub will build your site (takes 1-5 minutes)
- Site will be live at `https://algarzaie.github.io/3d-printing-website/`

#### D. Custom Domain (Optional)
1. Add a file named `CNAME` in the `docs` folder:
```
3d.bdecors.com
```
2. Configure DNS (see Domain Configuration section)

#### E. Form Handling
Use **Formsubmit.co** (free, no signup):

```html
<form method="POST" action="https://formsubmit.co/3d@bdecors.com">
  <input type="hidden" name="_next" value="https://yoursite.com/thank-you.html">
  <input type="hidden" name="_captcha" value="false">
  <!-- Rest of your form -->
</form>
```

---

## 4. Netlify (for reference)

**Note:** You mentioned limited credits. Use this only if you have credits left.

### Step-by-Step:

#### A. Deploy
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select repository

#### B. Configure
```
Base directory: 3d.bdecors
Build command: (leave empty)
Publish directory: .
```

#### C. Deploy
- Netlify Forms should work automatically with your current setup
- No changes needed to your code!

---

## 5. Traditional Hosting (cPanel/FTP)

**Why Traditional Hosting:** You may already have shared hosting (GoDaddy, Bluehost, HostGator, etc.)

### Step-by-Step:

#### A. Using cPanel File Manager
1. Log in to your cPanel
2. Go to "File Manager"
3. Navigate to `public_html` (or `www` or `htdocs`)
4. Upload all files from `3d.bdecors` folder
5. Your site is now live at your domain!

#### B. Using FTP (FileZilla)
1. Download [FileZilla](https://filezilla-project.org/)
2. Connect using your FTP credentials:
   - Host: ftp.yourdomain.com
   - Username: (from hosting provider)
   - Password: (from hosting provider)
   - Port: 21
3. Navigate to `public_html`
4. Drag and drop files from `3d.bdecors` folder

#### C. Form Handling
Install a PHP form handler. Create `submit-form.php`:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $projectType = htmlspecialchars($_POST['projectType']);
    $description = htmlspecialchars($_POST['description']);

    $to = "3d@bdecors.com";
    $subject = "New Quote Request from " . $name;
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nProject: $projectType\n\nDescription:\n$description";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        header("Location: /thank-you.html");
    } else {
        echo "Error sending email";
    }
}
?>
```

Update form action in `index.html`:
```html
<form method="POST" action="/submit-form.php">
```

---

## 6. AWS S3 + CloudFront

**Why AWS:** Enterprise-grade, scalable, pay only for what you use (very cheap for small sites).

### Step-by-Step:

#### A. Create S3 Bucket
1. Log in to [AWS Console](https://console.aws.amazon.com)
2. Go to S3
3. Click "Create bucket"
4. Name: `printpro-3d-website`
5. Region: Choose closest to your users
6. Uncheck "Block all public access"
7. Click "Create bucket"

#### B. Upload Files
1. Click on your bucket
2. Click "Upload"
3. Upload all files from `3d.bdecors`
4. Click "Upload"

#### C. Enable Static Website Hosting
1. Go to bucket "Properties"
2. Scroll to "Static website hosting"
3. Click "Edit"
4. Enable it
5. Index document: `index.html`
6. Error document: `index.html`
7. Save changes

#### D. Set Bucket Policy
1. Go to "Permissions" tab
2. Bucket Policy → Edit
3. Paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::printpro-3d-website/*"
    }
  ]
}
```

#### E. Set Up CloudFront (Optional but recommended)
1. Go to CloudFront service
2. Create distribution
3. Origin domain: Select your S3 bucket
4. Origin access: Public
5. Viewer protocol policy: Redirect HTTP to HTTPS
6. Create distribution
7. Wait 10-15 minutes for deployment
8. Use the CloudFront URL for your site

#### F. Form Handling
Use AWS Lambda + API Gateway, or use a third-party service like Formspree.

**Costs:** ~$0.50-2.00/month for small traffic

---

## 7. DigitalOcean App Platform

**Why DigitalOcean:** Simple, $0 for static sites, excellent performance.

### Step-by-Step:

#### A. Create Account
1. Go to [digitalocean.com](https://digitalocean.com)
2. Sign up (get $200 credit for 60 days with some referrals)

#### B. Create App
1. Go to "Apps"
2. Click "Create App"
3. Choose GitHub as source
4. Select your repository
5. Select branch

#### C. Configure
```
Source Directory: 3d.bdecors
Build Command: (leave empty)
Output Directory: .
```

#### D. Deploy
1. Click "Next" through the steps
2. Choose "Starter" plan ($0 for static sites)
3. Deploy!

#### E. Form Handling
Same as Vercel - use Formspree or API functions

---

## 8. Render.com

**Why Render:** Free tier, automatic deploys, modern platform.

### Step-by-Step:

#### A. Sign Up
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### B. Create Static Site
1. Click "New +" → "Static Site"
2. Connect repository
3. Configure:
```
Name: printpro-3d
Branch: main
Build Command: (leave empty)
Publish Directory: 3d.bdecors
```

#### C. Deploy
- Click "Create Static Site"
- Automatically deploys on every push!

---

## 9. Post-Deployment Checklist

After deploying to ANY platform:

### A. Test Functionality
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Form submission works
- [ ] Thank you page appears after form submit
- [ ] You receive form submissions
- [ ] Mobile responsive works
- [ ] All sections visible
- [ ] Custom cursor works on desktop

### B. Performance
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Check load time
- [ ] Test on mobile device

### C. SEO
- [ ] Set up Google Analytics (uncomment code in index.html)
- [ ] Submit sitemap to Google Search Console
- [ ] Test Open Graph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### D. SSL Certificate
- [ ] Ensure HTTPS is working (should be automatic on most platforms)
- [ ] Check for mixed content warnings

---

## 10. Domain Configuration

### Connect Custom Domain (3d.bdecors.com)

#### For Most Platforms (Vercel, Cloudflare, Netlify):
1. Go to your project settings
2. Add custom domain: `3d.bdecors.com`
3. Platform will give you DNS records

#### DNS Configuration:
Go to your domain registrar (where you bought bdecors.com) and add:

**For Vercel:**
```
Type: CNAME
Name: 3d
Value: cname.vercel-dns.com
```

**For Cloudflare Pages:**
```
Type: CNAME
Name: 3d
Value: your-project.pages.dev
```

**For Netlify:**
```
Type: CNAME
Name: 3d
Value: your-site.netlify.app
```

**For GitHub Pages:**
```
Type: A
Name: 3d
Value: 185.199.108.153

Type: A
Name: 3d
Value: 185.199.109.153

Type: A
Name: 3d
Value: 185.199.110.153

Type: A
Name: 3d
Value: 185.199.111.153
```

---

## 📊 Platform Comparison

| Platform | Cost | Ease | Forms | Speed | SSL |
|----------|------|------|-------|-------|-----|
| **Vercel** | Free | ⭐⭐⭐⭐⭐ | API Routes | ⚡ Fast | ✅ Auto |
| **Cloudflare Pages** | Free | ⭐⭐⭐⭐⭐ | 3rd party | ⚡⚡ Very Fast | ✅ Auto |
| **GitHub Pages** | Free | ⭐⭐⭐⭐ | 3rd party | ⚡ Fast | ✅ Auto |
| **Netlify** | Free* | ⭐⭐⭐⭐⭐ | ✅ Built-in | ⚡ Fast | ✅ Auto |
| **Render** | Free | ⭐⭐⭐⭐ | 3rd party | ⚡ Fast | ✅ Auto |
| **DigitalOcean** | Free | ⭐⭐⭐⭐ | API Routes | ⚡ Fast | ✅ Auto |
| **AWS S3** | ~$1/mo | ⭐⭐⭐ | Lambda | ⚡⚡ Very Fast | ✅ Manual |
| **Traditional** | $3-10/mo | ⭐⭐⭐ | ✅ PHP | ⚡ Varies | ⚡ Varies |

*Limited bandwidth/builds

---

## 🎯 Recommended Approach

Based on your requirements (low cost, form handling, good performance):

### **Best Choice: Vercel + Formspree**

1. Deploy to Vercel (free, unlimited bandwidth)
2. Use Formspree for forms (free tier: 50 submissions/month)
3. If you need more: upgrade Formspree ($10/mo for unlimited)

**Total Cost: $0-10/month**

### **Alternative: Cloudflare Pages + Web3Forms**

1. Deploy to Cloudflare Pages (free, unlimited)
2. Use Web3Forms (free, unlimited)
3. Excellent performance, completely free

**Total Cost: $0/month**

---

## 🆘 Troubleshooting

### Forms Not Working?
1. Check form action URL
2. Verify email is correct
3. Check spam folder
4. Test with form debugging tool
5. Check browser console for errors

### Site Not Loading?
1. Wait 5-10 minutes after deployment
2. Clear browser cache (Ctrl+Shift+R)
3. Check deployment logs
4. Verify files uploaded correctly

### DNS Not Resolving?
1. Wait 24-48 hours for DNS propagation
2. Use [dnschecker.org](https://dnschecker.org) to verify
3. Flush DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

---

## 📞 Need Help?

If you encounter issues:
1. Check platform documentation
2. Search for error messages
3. Ask in platform communities (Vercel Discord, Cloudflare Forum, etc.)
4. Email me: 3d@bdecors.com

---

**Good luck with your deployment! 🚀**
