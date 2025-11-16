/* =============================
   Element SDK Configuration
   ============================= */

const defaultConfig = {
    company_name: "LoanPro",
    tagline: "Track payments, monitor balances, and stay on top of your financial commitments with our comprehensive loan management platform.",
    welcome_message: "Welcome to your loan management dashboard"
};

async function onConfigChange(config) {
    const companyNameEl = document.getElementById('company-name');
    if (companyNameEl) {
        companyNameEl.textContent = config.company_name || defaultConfig.company_name;
    }
}

function mapToCapabilities() {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["company_name", config.company_name || defaultConfig.company_name],
        ["tagline", config.tagline || defaultConfig.tagline],
        ["welcome_message", config.welcome_message || defaultConfig.welcome_message]
    ]);
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}


/* =============================
   Tab Switching Logic
   ============================= */

const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

signinTab.addEventListener('click', () => {
    signinTab.classList.add('bg-blue-600', 'text-white');
    signinTab.classList.remove('text-gray-600');

    signupTab.classList.remove('bg-blue-600', 'text-white');
    signupTab.classList.add('text-gray-600');

    signinForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('bg-blue-600', 'text-white');
    signupTab.classList.remove('text-gray-600');

    signinTab.classList.remove('bg-blue-600', 'text-white');
    signinTab.classList.add('text-gray-600');

    signupForm.classList.remove('hidden');
    signinForm.classList.add('hidden');
});


/* =============================
   Sign In Handler
   ============================= */

document.getElementById('signin-form-element')
    .addEventListener('submit', function (e) {

    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (email && password) {

        localStorage.setItem('loanpro_user', JSON.stringify({
            email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        }));

        showSuccessAndRedirect();
    }
});


/* =============================
   Sign Up Handler
   ============================= */

document.getElementById('signup-form-element')
    .addEventListener('submit', function (e) {

    e.preventDefault();

    const firstName = document.getElementById('signup-first-name').value;
    const lastName = document.getElementById('signup-last-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        showInlineMessage("Passwords do not match!");
        return;
    }

    localStorage.setItem('loanpro_user', JSON.stringify({
        email,
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        loginTime: new Date().toISOString()
    }));

    showSuccessAndRedirect();
});


/* =============================
   Success Message + Redirect
   ============================= */

function showSuccessAndRedirect() {
    const successMessage = document.getElementById('success-message');
    successMessage.classList.remove('hidden');

    successMessage.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 2000);
}


/* =============================
   Inline Error Messages
   ============================= */

function showInlineMessage(message, type = "error") {
    const el = document.createElement("div");

    el.className = `mt-4 p-3 rounded-lg text-sm ${
        type === "error"
        ? "bg-red-50 text-red-800 border border-red-200"
        : "bg-green-50 text-green-800 border border-green-200"
    }`;

    el.textContent = message;

    const activeForm = document.querySelector('#signin-form:not(.hidden), #signup-form:not(.hidden)');
    if (activeForm) {
        activeForm.appendChild(el);

        setTimeout(() => el.remove(), 5000);
    }
}


/* =============================
   Social Login (Demo Mode)
   ============================= */

document.querySelectorAll('button')
    .forEach(btn => {

    if (btn.textContent.includes("Google") || btn.textContent.includes("Facebook")) {

        btn.addEventListener("click", function () {

            const provider = this.textContent.includes('Google') 
                             ? "Google" 
                             : "Facebook";

            localStorage.setItem('loanpro_user', JSON.stringify({
                email: `user@${provider.toLowerCase()}.com`,
                name: `${provider} User`,
                provider,
                loginTime: new Date().toISOString()
            }));

            showSuccessAndRedirect();
        });
    }
});


/* =============================
   Auto-redirect if logged in
   ============================= */

const existingUser = localStorage.getItem('loanpro_user');
if (existingUser) {
    window.location.href = "dashboard.html";
}
