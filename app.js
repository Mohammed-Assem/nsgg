import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.16.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'https://www.gstatic.com/firebasejs/10.16.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.16.0/firebase-firestore.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.16.0/firebase-storage.js';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: 'AIzaSyBBkAKJDrwmsmJ2XKl87ovwhnieUSf1J0g',
  authDomain: 'nasser-scouts.firebaseapp.com',
  projectId: 'nasser-scouts',
  storageBucket: 'nasser-scouts.firebasestorage.app',
  messagingSenderId: '684957258982',
  appId: '1:684957258982:web:5466b5c1e5583'
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Enable persistence
setPersistence(auth, browserLocalPersistence).catch(err => {
  console.warn('Persistence setup warning:', err);
});

// Expose Auth globally for inline route-protection check scripts
window.firebaseAuthInstance = auth; 

// --- GLOBAL AUTH STATE SETUP ---
let globalAuthState = null;

function initGlobalAuthObserver() {
  onAuthStateChanged(auth, (user) => {
    globalAuthState = user;
    window.currentAuthUser = user;
    console.log('✓ Auth state synced:', user ? user.email : 'No active user session');
    updateNavbar(user);
  });
}

// Start observing auth state immediately
initGlobalAuthObserver();

// --- NAVBAR AUTH UI ---
function updateNavbar(user) {
  const navLinksContainer = document.querySelector('.navlinks');
  if (!navLinksContainer) return;

  // Clean up existing dynamic elements
  navLinksContainer.querySelectorAll('.dynamic-auth').forEach(el => el.remove());

  // Determine relative paths depending on active directory
  const isInApplications = window.location.pathname.includes('/applications/');
  const loginPath = isInApplications ? '../login.html' : 'login.html';
  const profilePath = isInApplications ? '../profile.html' : 'profile.html';
  const indexPath = isInApplications ? '../index.html' : 'index.html';

  if (user) {
    // Logged in - render Profile tab & Logout action
    const profileLi = document.createElement('li');
    profileLi.className = 'dynamic-auth';
    profileLi.innerHTML = `<a href="${profilePath}" style="background: var(--accent); color: var(--accent-text); padding: 6px 14px; border-radius: 6px; font-weight:600;">Profile</a>`;
    
    const logoutLi = document.createElement('li');
    logoutLi.className = 'dynamic-auth';
    logoutLi.innerHTML = `<a href="#" id="auth-logout-btn" style="color: #ff6b6b; margin-left: 10px;">Logout</a>`;

    navLinksContainer.appendChild(profileLi);
    navLinksContainer.appendChild(logoutLi);

    document.getElementById('auth-logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        window.location.href = indexPath;
      }).catch(err => console.error('Logout error:', err));
    });
  } else {
    // Not logged in - show standard Login link
    const loginLi = document.createElement('li');
    loginLi.className = 'dynamic-auth';
    loginLi.innerHTML = `<a href="${loginPath}">Login</a>`;
    navLinksContainer.appendChild(loginLi);
  }
}

// --- SIGN UP FORM HANDLER ---
function setupSignupForm() {
  const form = document.getElementById('signup-form');
  console.log('📝 setupSignupForm called. Form found?', !!form);
  if (!form) {
    console.warn('❌ signup-form not found in DOM');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('📝 Signup form submitted');

    const fullName = document.getElementById('signup-fullname')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const password = document.getElementById('signup-password')?.value;
    const termsChecked = form.querySelector('.terms input[type="checkbox"]')?.checked;
    const errorDiv = document.getElementById('signup-error');
    const submitBtn = form.querySelector('button[type="submit"]');

    console.log('Form values:', { fullName, email, password: '***', termsChecked });

    if (errorDiv) errorDiv.textContent = '';

    if (!fullName || !email || !password) {
      const msg = '⚠️ Please fill out all fields.';
      console.warn('Validation error:', msg);
      if (errorDiv) errorDiv.textContent = msg;
      return;
    }
    if (!termsChecked) {
      const msg = '⚠️ You must agree to the terms.';
      console.warn('Terms not checked:', msg);
      if (errorDiv) errorDiv.textContent = msg;
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Creating account...';
      }
      
      console.log('🔐 Creating Firebase auth user with email:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ Firebase user created:', user.uid);

      console.log('💾 Writing to Firestore users collection...');
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: fullName,
        email: email,
        createdAt: serverTimestamp(),
        applicationSubmitted: false,
        role: null,
        status: null,
        scoutingStage: 'Not Registered'
      });
      console.log('✅ User document saved to Firestore');

      alert('✅ Account created successfully!');
      window.location.href = 'index.html';
    } catch (err) {
      console.error('❌ Signup error:', err.code, err.message);
      if (errorDiv) {
        if (err.code === 'auth/email-already-in-use') {
          errorDiv.textContent = '❌ This email is already registered.';
        } else if (err.code === 'auth/weak-password') {
          errorDiv.textContent = '❌ Password must be at least 6 characters.';
        } else {
          errorDiv.textContent = '❌ ' + err.message;
        }
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
      }
    }
  });
}

// --- LOGIN FORM HANDLER ---
function setupLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    const errorDiv = document.getElementById('login-error');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (errorDiv) errorDiv.textContent = '';

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Signing in...';
      }

      await signInWithEmailAndPassword(auth, email, password);
      alert('✅ Welcome back!');
      
      // Determine redirect location based on position
      const isInApplications = window.location.pathname.includes('/applications/');
      window.location.href = isInApplications ? '../index.html' : 'index.html';
    } catch (err) {
      console.error('Login error:', err);
      if (errorDiv) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          errorDiv.textContent = '❌ Invalid email or password.';
        } else if (err.code === 'auth/too-many-requests') {
          errorDiv.textContent = '❌ Too many failed attempts. Try again later.';
        } else {
          errorDiv.textContent = '❌ ' + err.message;
        }
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
      }
    }
  });
}

// --- ASYNC FILE UPLOADER ---
async function uploadFileAsync(file, folderName, userId) {
  if (!file) return null;
  const uniqueName = `${userId}_${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `${folderName}/${uniqueName}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

// --- SETUP APPLICATION FORMS ---
function setupApplicationForms() {
  setupMemberForm();
  // Leader and Parent function setups hook in here as built
}

function setupMemberForm() {
  const form = document.getElementById('member-application-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('❌ You must be logged in to submit an application.');
      window.location.href = '../login.html';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Uploading files...';
      }

      const photoFile = document.getElementById('upload-personal-photo')?.files[0];
      const idCertFile = document.getElementById('upload-id-cert')?.files[0];

      const [photoUrl, idCertUrl] = await Promise.all([
        uploadFileAsync(photoFile, 'member_photos', user.uid),
        uploadFileAsync(idCertFile, 'member_documents', user.uid)
      ]);

      const appData = {
        uid: user.uid,
        fullName: document.getElementById('full-name').value.trim(),
        nationalId: document.getElementById('id-number').value.trim(),
        phone: document.getElementById('telephone').value.trim(),
        email: document.getElementById('email').value.trim(),
        birthDate: `${document.getElementById('birth-day').value}/${document.getElementById('birth-month').value}/${document.getElementById('birth-year').value}`,
        scoutingStage: document.getElementById('scouting-stage').value,
        personalPhotoUrl: photoUrl || '',
        idCertificateUrl: idCertUrl || '',
        status: 'Pending Review',
        submittedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'member_applications'), appData);
      
      await updateDoc(doc(db, 'users', user.uid), {
        applicationSubmitted: true,
        role: 'member',
        status: 'Pending Review',
        nationalId: appData.nationalId,
        phone: appData.phone,
        scoutingStage: appData.scoutingStage
      });

      alert('✅ Member application submitted successfully!');
      window.location.href = '../index.html';
    } catch (err) {
      console.error('Member submission error:', err);
      alert('❌ Submission failed: ' + err.message);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
      }
    }
  });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  setupSignupForm();
  setupLoginForm();
  setupApplicationForms();
});