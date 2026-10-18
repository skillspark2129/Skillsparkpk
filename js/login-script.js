function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggle = document.querySelector('.password-toggle');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggle.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggle.textContent = '👁️';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.querySelector('.login-button');

    const ADMIN_EMAILS = [
        'as2129wq@gmail.com'
    ];
    const ADMIN_PASSWORD = 'SparkAdmin2026@.';

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        loginButton.textContent = 'Checking...';
        loginButton.disabled = true;

        if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
            localStorage.setItem('skillspark_admin', JSON.stringify({
                email: email,
                role: 'admin',
                loginTime: new Date().toISOString()
            }));
            alert('✅ Admin Login Successful! Welcome Sir!');
            window.location.href = 'admin-logs.html';
        } else {
            alert('❌ Access Denied! Wrong Email or Password!');
            loginButton.textContent = 'Login to SkillSparkPK';
            loginButton.disabled = false;
        }
    });
});
