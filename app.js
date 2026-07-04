// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: 'AIzaSyBBkAKJDrwmsmJ2XKl87ovwhnieUSf1J0g',
  authDomain: 'nasser-scouts.firebaseapp.com',
  projectId: 'nasser-scouts',
  storageBucket: 'nasser-scouts.firebasestorage.app',
  messagingSenderId: '684957258982',
  appId: '1:684957258982:web:5466b5c1e55839954c5727'
};

// Initialize Firebase Services (Compat SDK)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// Enable persistence
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(err) {
  console.warn('Persistence setup warning:', err);
});

window.firebaseAuthInstance = auth;

// --- GLOBAL AUTH STATE ---
var globalAuthState = null;

function initGlobalAuthObserver() {
  auth.onAuthStateChanged(function(user) {
    globalAuthState = user;
    window.currentAuthUser = user;
    updateNavbar(user);
  });
}

initGlobalAuthObserver();

// --- NAVBAR AUTH UI ---
function updateNavbar(user) {
  var navLinksContainer = document.querySelector('.navlinks');
  if (!navLinksContainer) return;

  var existing = navLinksContainer.querySelectorAll('.dynamic-auth');
  for (var i = 0; i < existing.length; i++) { existing[i].remove(); }

  var isInApplications = window.location.pathname.indexOf('/applications/') !== -1;
  var loginPath = isInApplications ? '../login.html' : 'login.html';
  var profilePath = isInApplications ? '../profile.html' : 'profile.html';
  var indexPath = isInApplications ? '../index.html' : 'index.html';

  // Toggle the hardcoded Sign In/Up button
  var signinBtn = document.getElementById('signin-btn');
  if (signinBtn) {
    signinBtn.style.display = user ? 'none' : '';
  }

  if (user) {
    var profileLi = document.createElement('li');
    profileLi.className = 'dynamic-auth';
    profileLi.innerHTML = '<a href="' + profilePath + '" style="background: var(--accent); color: var(--accent-text); padding: 6px 14px; border-radius: 6px; font-weight:600;">Profile</a>';

    var logoutLi = document.createElement('li');
    logoutLi.className = 'dynamic-auth';
    logoutLi.innerHTML = '<a href="#" id="auth-logout-btn" style="color: #ff6b6b; margin-left: 10px;">Logout</a>';

    navLinksContainer.appendChild(profileLi);
    navLinksContainer.appendChild(logoutLi);

    setTimeout(function() {
      var btn = document.getElementById('auth-logout-btn');
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          auth.signOut().then(function() {
            window.location.href = indexPath;
          });
        });
      }
    }, 0);
  } else {
    var loginLi = document.createElement('li');
    loginLi.className = 'dynamic-auth';
    loginLi.innerHTML = '<a href="' + loginPath + '">Login</a>';
    navLinksContainer.appendChild(loginLi);
  }
}

// --- SIGN UP ---
function setupSignupForm() {
  var form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var fullName = document.getElementById('signup-fullname') ? document.getElementById('signup-fullname').value.trim() : '';
    var email = document.getElementById('signup-email') ? document.getElementById('signup-email').value.trim() : '';
    var password = document.getElementById('signup-password') ? document.getElementById('signup-password').value : '';
    var termsCheckbox = form.querySelector('.terms input[type="checkbox"]');
    var termsChecked = termsCheckbox ? termsCheckbox.checked : false;
    var errorDiv = document.getElementById('signup-error');
    var submitBtn = form.querySelector('button[type="submit"]');

    if (errorDiv) errorDiv.textContent = '';

    if (!fullName || !email || !password) {
      if (errorDiv) errorDiv.textContent = 'Please fill out all fields.';
      return;
    }
    if (!termsChecked) {
      if (errorDiv) errorDiv.textContent = 'You must agree to the terms.';
      return;
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Creating...'; }

    auth.createUserWithEmailAndPassword(email, password).then(function(userCredential) {
      var user = userCredential.user;
      return db.collection('users').doc(user.uid).set({
        uid: user.uid,
        fullName: fullName,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        applicationSubmitted: false,
        role: null,
        status: null,
        scoutingStage: 'Not Registered'
      }).then(function() {
        window.location.href = 'profile.html';
      });
    }).catch(function(err) {
      if (errorDiv) {
        if (err.code === 'auth/email-already-in-use') { errorDiv.textContent = 'This email is already registered.'; }
        else if (err.code === 'auth/weak-password') { errorDiv.textContent = 'Password must be at least 6 characters.'; }
        else { errorDiv.textContent = err.message; }
      }
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Register'; }
    });
  });
}

// --- LOGIN ---
function setupLoginForm() {
  var form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var email = document.getElementById('login-email') ? document.getElementById('login-email').value.trim() : '';
    var password = document.getElementById('login-password') ? document.getElementById('login-password').value : '';
    var errorDiv = document.getElementById('login-error');
    var submitBtn = form.querySelector('button[type="submit"]');

    if (errorDiv) errorDiv.textContent = '';

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Signing in...'; }

    auth.signInWithEmailAndPassword(email, password).then(function() {
      window.location.href = 'profile.html';
    }).catch(function(err) {
      if (errorDiv) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          errorDiv.textContent = 'Invalid email or password.';
        } else if (err.code === 'auth/too-many-requests') {
          errorDiv.textContent = 'Too many failed attempts. Try again later.';
        } else {
          errorDiv.textContent = err.message;
        }
      }
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Login'; }
    });
  });
}

// --- PROFILE PAGE ---
function setupProfilePage() {
  var nameEl = document.getElementById('profile-name');
  if (!nameEl) return;

  auth.onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    db.collection('users').doc(user.uid).get().then(function(doc) {
      if (!doc.exists) return;
      var data = doc.data();

      if (document.getElementById('profile-name')) document.getElementById('profile-name').textContent = data.fullName || user.email;
      if (document.getElementById('profile-nationalid')) document.getElementById('profile-nationalid').textContent = data.nationalId || '--';
      if (document.getElementById('profile-phone')) document.getElementById('profile-phone').textContent = data.phone || '--';
      if (document.getElementById('profile-stage')) document.getElementById('profile-stage').textContent = data.scoutingStage || 'Not Registered';

      if (document.getElementById('profile-display-img') && data.personalPhotoUrl) {
        document.getElementById('profile-display-img').src = data.personalPhotoUrl;
      }
    }).catch(function(err) {
      console.error('Profile load error:', err);
    });
  });
}

// --- ASYNC FILE UPLOADER (ImgBB - free, no credit card) ---
var IMGBB_API_KEY = '9718aaf3d1c1b2a615e5c6b4e2f1cdc1';

function uploadFileAsync(file) {
  if (!file) return Promise.resolve(null);
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onloadend = function() {
      var base64 = reader.result.split(',')[1];
      var formData = new FormData();
      formData.append('key', IMGBB_API_KEY);
      formData.append('image', base64);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgbb.com/1/upload', true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var res = JSON.parse(xhr.responseText);
          resolve(res.data.url);
        } else {
          reject(new Error('Upload failed: ' + xhr.status));
        }
      };
      xhr.onerror = function() { reject(new Error('Upload network error')); };
      xhr.send(formData);
    };
    reader.onerror = function() { reject(new Error('File read failed')); };
    reader.readAsDataURL(file);
  });
}

// --- APPLICATION FORMS ---
function setupApplicationForms() {
  setupMemberForm();
  setupLeaderForm();
  setupParentForm();
}

function setupLeaderForm() {
  var form = document.getElementById('leader-application-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var user = auth.currentUser;
    if (!user) { alert('You must be logged in.'); window.location.href = '../login.html'; return; }

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Uploading...'; }

    var photoFile = document.getElementById('upload-personal-photo') ? document.getElementById('upload-personal-photo').files[0] : null;
    var idCertFile = document.getElementById('upload-id-cert') ? document.getElementById('upload-id-cert').files[0] : null;

    Promise.all([
      uploadFileAsync(photoFile),
      uploadFileAsync(idCertFile)
    ]).then(function(urls) {
      var photoUrl = urls[0] || '';
      var idCertUrl = urls[1] || '';

      var appData = {
        uid: user.uid,
        fullName: document.getElementById('full-name') ? document.getElementById('full-name').value.trim() : '',
        nationalId: document.getElementById('id-number') ? document.getElementById('id-number').value.trim() : '',
        phone: document.getElementById('telephone') ? document.getElementById('telephone').value.trim() : '',
        email: document.getElementById('email') ? document.getElementById('email').value.trim() : '',
        birthDate: (document.getElementById('birth-day') ? document.getElementById('birth-day').value : '') + '/' + (document.getElementById('birth-month') ? document.getElementById('birth-month').value : '') + '/' + (document.getElementById('birth-year') ? document.getElementById('birth-year').value : ''),
        personalPhotoUrl: photoUrl,
        idCertificateUrl: idCertUrl,
        status: 'Pending Review',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      return db.collection('leader_applications').add(appData).then(function() {
        return db.collection('users').doc(user.uid).update({
          applicationSubmitted: true,
          role: 'leader',
          status: 'Pending Review',
          nationalId: appData.nationalId,
          phone: appData.phone
        });
      }).then(function() {
        alert('Leader application submitted successfully!');
        window.location.href = '../index.html';
      });
    }).catch(function(err) {
      console.error('Leader submission error:', err);
      alert('Submission failed: ' + err.message);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Application'; }
    });
  });
}

function setupParentForm() {
  var form = document.getElementById('parent-application-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var user = auth.currentUser;
    if (!user) { alert('You must be logged in.'); window.location.href = '../login.html'; return; }

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; }

    var childNameInputs = document.querySelectorAll('.child-name-field');
    var childNames = [];
    for (var i = 0; i < childNameInputs.length; i++) {
      if (childNameInputs[i].value.trim()) childNames.push(childNameInputs[i].value.trim());
    }

    var appData = {
      uid: user.uid,
      parentName: document.getElementById('parent-name') ? document.getElementById('parent-name').value.trim() : '',
      nationalId: document.getElementById('parent-id') ? document.getElementById('parent-id').value.trim() : '',
      phone: document.getElementById('parent-phone') ? document.getElementById('parent-phone').value.trim() : '',
      email: document.getElementById('parent-email') ? document.getElementById('parent-email').value.trim() : '',
      childrenCount: document.getElementById('children-count') ? parseInt(document.getElementById('children-count').value, 10) : 0,
      childrenNames: childNames,
      status: 'Pending Review',
      submittedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('parent_applications').add(appData).then(function() {
      return db.collection('users').doc(user.uid).update({
        applicationSubmitted: true,
        role: 'parent',
        status: 'Pending Review',
        phone: appData.phone
      });
    }).then(function() {
      alert('Parent application submitted successfully!');
      window.location.href = '../index.html';
    }).catch(function(err) {
      console.error('Parent submission error:', err);
      alert('Submission failed: ' + err.message);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Application'; }
    });
  });
}

function setupMemberForm() {
  var form = document.getElementById('member-application-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var user = auth.currentUser;
    if (!user) { alert('You must be logged in.'); window.location.href = '../login.html'; return; }

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Uploading...'; }

    var photoFile = document.getElementById('upload-personal-photo') ? document.getElementById('upload-personal-photo').files[0] : null;
    var idCertFile = document.getElementById('upload-id-cert') ? document.getElementById('upload-id-cert').files[0] : null;

    Promise.all([
      uploadFileAsync(photoFile),
      uploadFileAsync(idCertFile)
    ]).then(function(urls) {
      var photoUrl = urls[0] || '';
      var idCertUrl = urls[1] || '';

      var appData = {
        uid: user.uid,
        fullName: document.getElementById('full-name') ? document.getElementById('full-name').value.trim() : '',
        nationalId: document.getElementById('id-number') ? document.getElementById('id-number').value.trim() : '',
        phone: document.getElementById('telephone') ? document.getElementById('telephone').value.trim() : '',
        email: document.getElementById('email') ? document.getElementById('email').value.trim() : '',
        birthDate: (document.getElementById('birth-day') ? document.getElementById('birth-day').value : '') + '/' + (document.getElementById('birth-month') ? document.getElementById('birth-month').value : '') + '/' + (document.getElementById('birth-year') ? document.getElementById('birth-year').value : ''),
        scoutingStage: document.getElementById('scouting-stage') ? document.getElementById('scouting-stage').value : '',
        personalPhotoUrl: photoUrl,
        idCertificateUrl: idCertUrl,
        status: 'Pending Review',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      return db.collection('member_applications').add(appData).then(function() {
        return db.collection('users').doc(user.uid).update({
          applicationSubmitted: true,
          role: 'member',
          status: 'Pending Review',
          nationalId: appData.nationalId,
          phone: appData.phone,
          scoutingStage: appData.scoutingStage
        });
      }).then(function() {
        alert('Member application submitted successfully!');
        window.location.href = '../index.html';
      });
    }).catch(function(err) {
      console.error('Member submission error:', err);
      alert('Submission failed: ' + err.message);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Application'; }
    });
  });
}

// --- INIT ---
setupSignupForm();
setupLoginForm();
setupApplicationForms();
setupProfilePage();
