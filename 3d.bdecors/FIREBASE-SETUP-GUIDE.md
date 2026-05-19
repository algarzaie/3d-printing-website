# Firebase Setup Guide for PrintPro 3D

This guide will help you set up Firebase for user authentication, database, and discount code management.

## Prerequisites
- Google Account (free)
- GitHub account (you already have this)

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `printpro-3d` (or your preferred name)
4. Click **Continue**
5. **Google Analytics**: You can disable this for now (optional)
6. Click **Create project**
7. Wait for project creation (~30 seconds)
8. Click **Continue** when ready

---

## Step 2: Enable Google Authentication

1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click the **"Sign-in method"** tab
4. Click **"Google"** from the providers list
5. Toggle **"Enable"** switch to ON
6. Select a **"Project support email"** (use your email)
7. Click **"Save"**

✅ Google Sign-In is now enabled!

---

## Step 3: Create Firestore Database

1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. **Security rules**: Select **"Start in production mode"**
4. Click **"Next"**
5. **Location**: Choose closest to Saudi Arabia (e.g., `asia-south1` Mumbai or `europe-west1` Belgium)
6. Click **"Enable"**
7. Wait for database creation (~1 minute)

### Set Up Security Rules

1. Click the **"Rules"** tab in Firestore
2. Replace the rules with this code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Users can read and write their own projects
    match /projects/{projectId} {
      allow read: if request.auth != null &&
                     (request.auth.uid == resource.data.userId ||
                      request.auth.token.email == 'your-admin-email@example.com');
      allow create: if request.auth != null;
      allow update: if request.auth.token.email == 'your-admin-email@example.com';
    }

    // Users can read their own reviews
    match /reviews/{reviewId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }

    // Users can read and validate their own discount codes
    match /discountCodes/{codeId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

3. **Replace** `your-admin-email@example.com` with your actual email (the one you use to manage projects)
4. Click **"Publish"**

---

## Step 4: Register Your Web App

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>`
5. **App nickname**: Enter `PrintPro 3D Website`
6. **Check** the box: "Also set up Firebase Hosting" (optional, we're using GitHub Pages)
7. Click **"Register app"**
8. You'll see Firebase SDK configuration like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...your-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

9. **COPY THIS ENTIRE OBJECT** - you'll need it in Step 5
10. Click **"Continue to console"**

---

## Step 5: Add Firebase Config to Your Website

1. Open the file: `docs/firebase-config.js`
2. Replace the placeholder config with YOUR config from Step 4
3. Save the file

**Example:**
```javascript
// docs/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyA...YOUR_ACTUAL_KEY",
  authDomain: "printpro-3d.firebaseapp.com",
  projectId: "printpro-3d",
  storageBucket: "printpro-3d.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## Step 6: Deploy Updated Website

1. Commit and push your changes to GitHub:
```bash
git add docs/firebase-config.js
git commit -m "Add Firebase configuration"
git push origin claude/website-review-01CHtfijCxpcxMuWMNUmiPyJ
```

2. Wait 2-3 minutes for GitHub Pages to rebuild
3. Visit your site: `https://algarzaie.github.io/3d-printing-website/`

---

## Step 7: Test Authentication

1. Go to your website
2. Click **"Sign In"** button in the header
3. Click **"Sign in with Google"**
4. Select your Google account
5. You should be redirected back and see your name in the header
6. Click on your name to access the Dashboard

---

## Step 8: Managing Projects (Admin)

When customers submit quotes through Web3Forms, you need to manually add them to Firestore:

### Option A: Firebase Console (Manual)

1. Go to Firebase Console → Firestore Database
2. Click **"Start collection"**
3. Collection ID: `projects`
4. Add a document with these fields:
   - `userId`: (customer's Firebase UID - get from Users collection)
   - `name`: Customer name
   - `email`: Customer email
   - `projectType`: Type of project
   - `description`: Project description
   - `status`: "completed" (when finished)
   - `createdAt`: Timestamp
   - `hasReview`: false

### Option B: Automated (Recommended - Future Enhancement)

We can create a Cloud Function or webhook to automatically create projects when Web3Forms submissions arrive. Let me know if you want this!

---

## Step 9: How Customers Get Discount Codes

1. Customer signs in with Google
2. Customer sees their completed projects in Dashboard
3. Customer clicks **"Write a Review"** on a completed project
4. Customer submits 1-5 star review with text
5. System automatically generates a unique discount code:
   - Format: `REVIEW10-XXXXX`
   - 10% discount
   - Expires in 30 days
   - One-time use only
6. Code appears in Dashboard under "My Discount Codes"
7. Customer copies code and uses it when requesting a new quote

---

## Costs

**Firebase Free Tier (Spark Plan):**
- ✅ 50K reads/day
- ✅ 20K writes/day
- ✅ 1GB storage
- ✅ Google Authentication (unlimited)
- ✅ Perfect for small to medium traffic

**When you exceed free tier:**
- Pay-as-you-go (Blaze Plan)
- ~$0.06 per 100K reads
- ~$0.18 per 100K writes
- Usually stays under $5-10/month for small businesses

---

## Security Notes

- ✅ All data is encrypted
- ✅ Users can only see their own data
- ✅ Admin (your email) can see all projects
- ✅ Discount codes can't be duplicated
- ✅ Expired codes automatically invalid

---

## Support

If you encounter issues:
1. Check Firebase Console → Authentication → Users (verify users are being created)
2. Check Firestore Database → Data (verify documents are being saved)
3. Open browser console (F12) to see JavaScript errors
4. Check Firebase Console → Authentication → Settings → Authorized domains (should include your GitHub Pages domain)

---

## Next Steps After Setup

1. Test the full flow:
   - Sign in with Google
   - View Dashboard
   - Admin: Mark a test project as "completed"
   - Submit a review
   - Verify discount code generation
   - Use discount code in quote form

2. Customize:
   - Add your logo to sign-in page
   - Customize review form
   - Add email notifications (optional)

Let me know when you've completed Steps 1-4 and I'll help you with the rest!
