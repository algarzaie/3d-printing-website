# Web3Forms Setup Instructions

Your website is configured to use Web3Forms for form submissions. Follow these steps to complete the setup:

## Step 1: Get Your Access Key

1. Go to: https://web3forms.com
2. Enter your email: **3d@bdecors.com**
3. Click "Create Access Key"
4. **Copy** the access key (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

## Step 2: Add Access Key to Your Website

1. Open `3d.bdecors/index.html`
2. Find line 914 (search for: `YOUR_WEB3FORMS_ACCESS_KEY_HERE`)
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual access key
4. Save the file

**Example:**
```html
<!-- BEFORE -->
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />

<!-- AFTER (with your key) -->
<input type="hidden" name="access_key" value="a1b2c3d4-e5f6-7890-abcd-ef1234567890" />
```

## Step 3: Commit and Push to GitHub

```bash
git add 3d.bdecors/index.html
git commit -m "Add Web3Forms access key"
git push
```

## Step 4: Test Your Form

1. Go to your website
2. Fill out the quote request form
3. Submit it
4. Check your email (3d@bdecors.com) for the submission

## Troubleshooting

### Form doesn't submit
- Verify access key is correct (no extra spaces)
- Check browser console for errors (F12 → Console)
- Try incognito/private mode

### Not receiving emails
- Check spam folder
- Verify email address on Web3Forms dashboard
- Check Web3Forms submissions log: https://web3forms.com/dashboard

### Files not attaching
- Web3Forms supports file uploads up to 5MB total
- Only common file types are allowed
- For large CAD files, users should email them separately

## Features

✅ **Unlimited submissions** (100% free)
✅ **File uploads** (up to 5MB)
✅ **Email notifications** to 3d@bdecors.com
✅ **Auto-redirect** to thank-you page
✅ **No backend needed**

## Support

If you have issues:
- Web3Forms docs: https://docs.web3forms.com
- Support: support@web3forms.com
