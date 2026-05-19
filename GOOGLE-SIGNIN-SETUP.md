# Why Google Sign-In Doesn't Work Yet

## Current Status: ⚠️ Not Configured

Google Sign-In is **implemented in the code** but requires **Firebase configuration** to work.

---

## Why It's Not Working

The website is currently a **static HTML site** with Firebase integration code, but:

1. ❌ No Firebase project created yet
2. ❌ No Firebase API keys added
3. ❌ No Google OAuth configured
4. ❌ `firebase-config.js` file has placeholder values

When you click "Sign in with Google", the button tries to connect to Firebase, but since there's no Firebase project configured, it fails silently.

---

## How to Fix It (Required Steps)

### Step 1: Create Firebase Project (~10 minutes)

Follow the complete guide in:
```
docs/FIREBASE-SETUP-GUIDE.md
```

This guide walks you through:
- Creating a free Firebase account
- Setting up Google authentication
- Creating a Firestore database  
- Getting your Firebase API keys

### Step 2: Add Your Firebase Config

Once you complete the Firebase setup, you'll get a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...YOUR_ACTUAL_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

Open `docs/firebase-config.js` and replace the placeholder with YOUR actual config.

### Step 3: Update GitHub Pages

After adding your Firebase config:

```bash
git add docs/firebase-config.js
git commit -m "Add Firebase configuration"
git push origin feature/claude-design-integration
```

Wait 2-3 minutes for GitHub Pages to rebuild.

### Step 4: Test Google Sign-In

Visit your site and click "Sign in with Google" - it should now work!

---

## What Features Need Firebase

These features are **already built** but require Firebase setup:

- ✅ **Google Sign-In** - User authentication
- ✅ **User Dashboard** - View projects and discount codes
- ✅ **Review System** - Submit reviews on completed projects
- ✅ **Discount Codes** - Auto-generate 10% codes when users review
- ✅ **Project History** - Track all user quote requests

---

## Cost

**Firebase Free Tier (Spark Plan):**
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day  
- ✅ 1GB storage
- ✅ Unlimited Google Sign-Ins
- ✅ $0/month for small businesses

You won't pay anything unless you exceed these limits (unlikely for a small 3D printing business).

---

## Alternative: Skip Firebase (Simple Option)

If you don't want user accounts, you can:

1. **Remove the "Sign in with Google" button** from the header
2. **Keep Web3Forms** for the quote form (already working)
3. **Skip the discount code system**

This makes the site 100% static with no backend required. Quote requests will still arrive via email through Web3Forms.

---

## Recommended Approach

✅ **Do the Firebase setup** - it takes 10-15 minutes and unlocks:
- Professional user accounts
- Discount code rewards system
- Customer dashboard
- Review collection system

All of this is already coded and ready to go - you just need to add your Firebase keys!

---

## Need Help?

If you get stuck on any Firebase setup step, let me know which step and I'll help you through it.
