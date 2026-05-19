# 🚀 GoDaddy Deployment Guide - PrintPro 3D Website

Complete step-by-step guide to deploy your 3D printing website to GoDaddy hosting.

---

## ✅ Prerequisites

Before starting, make sure you have:
- [ ] GoDaddy hosting account (Shared, WordPress, or VPS)
- [ ] Your GoDaddy login credentials
- [ ] Domain name (3d.bdecors.com) already in GoDaddy

---

## 🎯 Deployment Methods

Choose one method:
- **Method 1:** cPanel File Manager (easiest, no software needed)
- **Method 2:** FTP with FileZilla (best for future updates)

---

## 📂 Method 1: Using cPanel File Manager (Recommended)

### Step 1: Log into GoDaddy
1. Go to [godaddy.com](https://godaddy.com)
2. Click "Sign In" (top right)
3. Enter your username and password

### Step 2: Access cPanel
1. After logging in, click "Web Hosting" in the menu
2. Find your hosting plan for bdecors.com
3. Click "Manage" next to your hosting plan
4. Scroll down and click "cPanel Admin"

### Step 3: Open File Manager
1. In cPanel, find the "Files" section
2. Click "File Manager"
3. A new tab will open with your file browser

### Step 4: Navigate to the Right Folder

**For subdomain (3d.bdecors.com):**
1. In File Manager, navigate to: `public_html`
2. Create a new folder: Click "New Folder" → Name it `3d`
3. Double-click to enter the `3d` folder

**For main domain (bdecors.com):**
1. Just navigate to `public_html` (this is your website root)

### Step 5: Upload Your Files

**Prepare files on your computer:**
1. On your computer, go to: `3d-printing-website/3d.bdecors/`
2. You need to upload these files:
   - `index.html`
   - `thank-you.html`
   - `DEPLOYMENT.md` (optional)
   - `submit-form.php` (we'll create this next)

**Upload to GoDaddy:**
1. In File Manager, click "Upload" (top menu)
2. Click "Select File" button
3. Select `index.html` from your computer
4. Wait for upload to complete (green checkmark)
5. Repeat for `thank-you.html`
6. Upload is complete!

### Step 6: Test Your Website
1. Open browser
2. Go to: `https://3d.bdecors.com/index.html`
3. Your website should load!

---

## 📧 Setting Up Form Submissions (PHP Method)

Since forms need a backend to send emails, let's create a simple PHP handler.

### Step 1: Create PHP Form Handler

1. In cPanel File Manager, navigate to your website folder (where index.html is)
2. Click "New File" (top menu)
3. Name it: `submit-form.php`
4. Click "Create New File"

### Step 2: Edit the PHP File

1. Right-click on `submit-form.php`
2. Click "Edit"
3. Paste this code:

```php
<?php
// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: /index.html");
    exit;
}

// Sanitize input data
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get form data
$name = clean_input($_POST['name'] ?? '');
$email = clean_input($_POST['email'] ?? '');
$phone = clean_input($_POST['phone'] ?? '');
$projectType = clean_input($_POST['projectType'] ?? '');
$material = clean_input($_POST['material'] ?? '');
$quantity = clean_input($_POST['quantity'] ?? '');
$description = clean_input($_POST['description'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($projectType) || empty($description)) {
    header("Location: /index.html?error=missing_fields");
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: /index.html?error=invalid_email");
    exit;
}

// Your email address (where form submissions will be sent)
$to = "3d@bdecors.com";

// Email subject
$subject = "New 3D Printing Quote Request from " . $name;

// Build email body
$email_body = "=== New Quote Request ===\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Project Type: $projectType\n";
$email_body .= "Material: $material\n";
$email_body .= "Quantity: $quantity\n\n";
$email_body .= "Description:\n$description\n\n";
$email_body .= "---\n";
$email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Handle file uploads
$file_info = "";
if (isset($_FILES['files']) && !empty($_FILES['files']['name'][0])) {
    $file_info = "\n\nFiles uploaded:\n";
    foreach ($_FILES['files']['name'] as $key => $filename) {
        if ($_FILES['files']['error'][$key] === UPLOAD_ERR_OK) {
            $file_info .= "- " . $filename . " (" . round($_FILES['files']['size'][$key] / 1024, 2) . " KB)\n";
        }
    }
    $email_body .= $file_info;
}

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    // Success - redirect to thank you page
    header("Location: /thank-you.html");
    exit;
} else {
    // Failed - redirect back with error
    header("Location: /index.html?error=send_failed");
    exit;
}
?>
```

4. Click "Save Changes" (top right)
5. Close the editor

### Step 3: Update Your HTML Form

Now we need to update `index.html` to use the PHP handler instead of Netlify Forms.

1. In File Manager, right-click `index.html` → "Edit"
2. Find line 688 (the form tag that looks like this):
```html
<form name="quote-request" method="POST" data-netlify="true" action="/thank-you.html" onSubmit={handleSubmit} className="...">
```

3. **Replace it with:**
```html
<form name="quote-request" method="POST" action="/submit-form.php" onSubmit={handleSubmit} className="bg-white border border-cyan-200 rounded-2xl p-8 space-y-6 shadow-lg">
```

4. **Remove these lines** (around lines 690-693):
```html
{/* Hidden fields for Netlify Forms */}
<input type="hidden" name="form-name" value="quote-request" />
<p className="hidden">
  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
</p>
```

5. Click "Save Changes"

### Step 4: Remove Hidden Netlify Form

1. Still in `index.html` editor
2. Find lines 47-57 (the hidden form):
```html
<!-- Hidden form for Netlify detection - DO NOT REMOVE -->
<form name="quote-request" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
  ...
</form>
```

3. **Delete the entire hidden form** (it's only for Netlify)

4. Click "Save Changes"
5. Close editor

---

## ✅ Test Form Submission

1. Go to your website: `https://3d.bdecors.com/index.html`
2. Scroll to "Request a Quote" section
3. Fill out the form with test data
4. Click "Submit Quote Request"
5. You should:
   - Be redirected to thank-you.html
   - Receive an email at 3d@bdecors.com

**If you don't receive the email:**
- Check your spam folder
- Wait 5-10 minutes (some servers delay email)
- Make sure 3d@bdecors.com is set up in your GoDaddy email

---

## 📂 Method 2: Using FTP with FileZilla

If you prefer a desktop application for uploading files:

### Step 1: Get FTP Credentials

1. Log into GoDaddy
2. Go to Web Hosting → Manage
3. Find "FTP" section or click "FTP Accounts"
4. Note down:
   - **FTP Host:** Usually `ftp.bdecors.com`
   - **Username:** Usually your domain or admin username
   - **Password:** Your FTP password (click "Show" or reset if forgotten)
   - **Port:** 21

### Step 2: Download FileZilla

1. Go to [filezilla-project.org](https://filezilla-project.org/)
2. Download FileZilla Client (free)
3. Install it on your computer

### Step 3: Connect to Your Server

1. Open FileZilla
2. Enter at the top:
   - **Host:** ftp.bdecors.com (or your FTP host)
   - **Username:** (your FTP username)
   - **Password:** (your FTP password)
   - **Port:** 21
3. Click "Quickconnect"
4. If prompted about certificate, click "OK"

### Step 4: Navigate to Website Folder

**Left side** = Your computer
**Right side** = Your server

On the **right side (server)**:
1. Navigate to `public_html` folder
2. Create folder `3d` if needed (right-click → Create directory)
3. Enter the `3d` folder

### Step 5: Upload Files

On the **left side (your computer)**:
1. Navigate to: `3d-printing-website/3d.bdecors/`
2. Select these files:
   - `index.html`
   - `thank-you.html`
   - `submit-form.php`
3. Drag and drop them to the right side (server)
4. Wait for upload to complete

### Step 6: Set Permissions

1. On server side (right), right-click `submit-form.php`
2. Click "File permissions"
3. Enter: `644` or check: `rw-r--r--`
4. Click OK

**Your site is now live!**

---

## 🌐 Setting Up Subdomain (3d.bdecors.com)

If you uploaded to a folder called `3d` in public_html:

### Option A: Using cPanel Subdomain Tool

1. In cPanel, find "Domains" section
2. Click "Subdomains"
3. Create new subdomain:
   - **Subdomain:** 3d
   - **Domain:** bdecors.com
   - **Document Root:** public_html/3d
4. Click "Create"
5. Wait 5-10 minutes for DNS to propagate
6. Visit: `https://3d.bdecors.com`

### Option B: Manual DNS (if subdomain tool doesn't work)

1. In GoDaddy, go to "DNS Management" for bdecors.com
2. Add a new record:
   - **Type:** CNAME
   - **Name:** 3d
   - **Value:** bdecors.com
   - **TTL:** 1 Hour
3. Click "Save"
4. Wait 30 minutes - 24 hours for DNS propagation

---

## 🔒 Enable HTTPS/SSL

Most GoDaddy hosting includes free SSL.

### Enable SSL in cPanel:

1. In cPanel, find "Security" section
2. Click "SSL/TLS Status"
3. Find 3d.bdecors.com in the list
4. Click "Run AutoSSL"
5. Wait a few minutes
6. SSL should now be active

**Test:** Visit `https://3d.bdecors.com` (should show padlock)

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Website loads at https://3d.bdecors.com
- [ ] All sections visible (Home, Services, Portfolio, Testimonials, Pricing, FAQ, Quote)
- [ ] Navigation works
- [ ] FAQ accordion expands/collapses
- [ ] Form submission works (test with your email)
- [ ] You receive email at 3d@bdecors.com
- [ ] Thank you page appears after submission
- [ ] SSL certificate is active (padlock icon)
- [ ] Mobile responsive (test on phone)

---

## 🐛 Troubleshooting

### Form doesn't send email

**Problem:** Submitted form but no email received

**Solutions:**
1. Check spam/junk folder
2. Verify 3d@bdecors.com email exists in GoDaddy
3. Check PHP error logs in cPanel
4. Try changing `$to` email to personal Gmail temporarily
5. Contact GoDaddy support - they may need to enable PHP mail()

### "500 Internal Server Error"

**Problem:** Website shows error when submitting form

**Solutions:**
1. Check file permissions on submit-form.php (should be 644)
2. View error logs in cPanel → "Errors"
3. Make sure form action is `/submit-form.php` not `submit-form.php`
4. Verify PHP is enabled on your hosting

### Website not loading

**Problem:** https://3d.bdecors.com doesn't load

**Solutions:**
1. Wait 24-48 hours for DNS propagation
2. Clear browser cache (Ctrl+Shift+R)
3. Verify files are in correct folder (public_html/3d/)
4. Check if subdomain was created in cPanel
5. Try accessing via main domain: bdecors.com/3d/index.html

### Files not uploading

**Problem:** Upload fails in File Manager or FileZilla

**Solutions:**
1. Check available disk space in cPanel
2. Try uploading one file at a time
3. Compress files into .zip and upload, then extract in cPanel
4. Contact GoDaddy support

---

## 📧 Email Setup

Make sure you have email configured:

1. In GoDaddy account, go to "Email"
2. Set up email for: 3d@bdecors.com
3. Or use email forwarding:
   - Forward 3d@bdecors.com → your personal email
4. Test by sending email to yourself

---

## 🔄 Making Future Updates

### Using File Manager:
1. Log into cPanel → File Manager
2. Navigate to your website folder
3. Right-click `index.html` → Edit
4. Make changes
5. Save

### Using FileZilla:
1. Connect to server
2. Edit file locally on your computer
3. Drag updated file to server (overwrites old version)

### Using GitHub:
To enable auto-updates, consider using:
- **Cloudflare Pages** (connects to GitHub)
- **Vercel** (connects to GitHub)

This way, when you push to GitHub, site updates automatically.

---

## 💰 Cost Summary

**GoDaddy Hosting:**
- Shared hosting: ~$5-10/month
- Email: Usually included
- SSL: Free
- Domain: ~$15/year

**Total: ~$5-10/month** (if you already have hosting)

---

## 🆚 When to Switch to Cloudflare Pages

Consider moving to Cloudflare Pages if:
- You want automatic updates from GitHub
- You want faster global performance
- You want to save $5-10/month hosting costs
- You're comfortable with modern deployment tools

**Switching is easy:**
1. Deploy to Cloudflare Pages (free)
2. Update DNS to point to Cloudflare
3. Cancel GoDaddy hosting (keep domain registration)

---

## 📞 Need Help?

**GoDaddy Support:**
- Phone: 1-480-505-8877
- Chat: Available in your account
- Help: support.godaddy.com

**Common issues:**
- PHP mail() not working → Ask to enable it
- File permissions → Ask about correct settings
- SSL not activating → Ask to force SSL certificate

---

## ✨ You're Done!

Your website should now be live at:
- Main URL: `https://3d.bdecors.com`
- Index: `https://3d.bdecors.com/index.html`
- Thank You: `https://3d.bdecors.com/thank-you.html`

**Next steps:**
1. Test everything thoroughly
2. Share link with potential customers
3. Set up Google Analytics (uncomment code in index.html)
4. Monitor email submissions

Good luck with your 3D printing business! 🚀
