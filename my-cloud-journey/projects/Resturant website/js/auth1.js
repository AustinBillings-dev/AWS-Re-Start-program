// ===================== CONFIG =====================
// REPLACE THESE WITH YOUR ACTUAL AWS COGNITO VALUES
const COGNITO_CONFIG = {
  UserPoolId: 'eu-north-1_aTKy5XPpR',      // Your Cognito User Pool ID
  ClientId: '7bvpssjmur14n610rsorjg3vfu',  // Your Cognito App Client ID
  Region: 'eu-north-1'                      // Your AWS Region
};

// ===================== STATE =====================
let currentUser = null;
let cognitoUser = null;

// ===================== COGNITO SETUP =====================
const poolData = {
  UserPoolId: COGNITO_CONFIG.UserPoolId,
  ClientId: COGNITO_CONFIG.ClientId
};
let userPool;
try {
  userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
} catch(e) {
  console.warn('Cognito not loaded yet - will retry on login page');
}

// ===================== AUTH FUNCTIONS =====================
function doSignup() {
  if (!userPool) { alert('Cognito not configured. Please set your UserPoolId and ClientId in js/auth.js'); return; }
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const msg = document.getElementById('signup-msg');

  if (!name || !email || !password) { msg.textContent = 'Please fill in all fields'; msg.className = 'auth-msg error'; return; }
  if (password.length < 6) { msg.textContent = 'Password must be at least 6 characters'; msg.className = 'auth-msg error'; return; }

  const attrList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name', Value: name })
  ];

  userPool.signUp(email, password, attrList, null, (err, result) => {
    if (err) { msg.textContent = err.message || 'Sign up failed'; msg.className = 'auth-msg error'; return; }
    msg.textContent = 'Account created! Please check your email to verify.';
    msg.className = 'auth-msg success';
    setTimeout(() => { if(typeof showPanel === 'function') showPanel('login'); msg.textContent = ''; }, 2000);
  });
}

function doLogin() {
  if (!userPool) { alert('Cognito not configured. Please set your UserPoolId and ClientId in js/auth.js'); return; }
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const msg = document.getElementById('login-msg');

  if (!email || !password) { msg.textContent = 'Please enter email and password'; msg.className = 'auth-msg error'; return; }

  const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({ Username: email, Password: password });
  const userData = { Username: email, Pool: userPool };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) => {
      const accessToken = result.getAccessToken().getJwtToken();
      const idToken = result.getIdToken().getJwtToken();
      const payload = JSON.parse(atob(idToken.split('.')[1]));
      currentUser = { email: payload.email, name: payload.name || payload.email.split('@')[0] };
      localStorage.setItem('tastybistro_user', JSON.stringify(currentUser));
      localStorage.setItem('tastybistro_token', accessToken);
      updateUI();
      // Redirect to home or previous page
      const redirect = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
      window.location.href = redirect;
    },
    onFailure: (err) => { msg.textContent = err.message || 'Login failed'; msg.className = 'auth-msg error'; }
  });
}

function doLogout() {
  if (cognitoUser) cognitoUser.signOut();
  currentUser = null;
  localStorage.removeItem('tastybistro_user');
  localStorage.removeItem('tastybistro_token');
  updateUI();
  window.location.reload();
}

function checkSession() {
  const saved = localStorage.getItem('tastybistro_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    updateUI();
    if (typeof renderBookings === 'function') renderBookings();
  }
}

function updateUI() {
  const nameEl = document.getElementById('user-name');
  const loginBtn = document.getElementById('btn-login');
  const logoutBtn = document.getElementById('btn-logout');
  if (!nameEl) return;

  if (currentUser) {
    nameEl.textContent = 'Hello, ' + currentUser.name;
    nameEl.style.display = 'inline';
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  } else {
    nameEl.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

// ===================== BOOKING HELPERS =====================
function getBookings() {
  if (!currentUser) return [];
  const key = 'tastybistro_bookings_' + currentUser.email;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveBookingLocal(booking) {
  if (!currentUser) return;
  const key = 'tastybistro_bookings_' + currentUser.email;
  const bookings = getBookings();
  bookings.unshift(booking);
  localStorage.setItem(key, JSON.stringify(bookings));
}
