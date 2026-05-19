// Firebase Configuration
// IMPORTANT: Replace this with YOUR actual Firebase config from Firebase Console
// See FIREBASE-SETUP-GUIDE.md Step 4 for instructions

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase (don't modify this part)
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
}
