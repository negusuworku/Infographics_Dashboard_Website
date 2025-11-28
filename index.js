document.addEventListener("DOMContentLoaded", function() {
    const paragraph = document.getElementById("homeParagraph");
    const text = paragraph.textContent;
    paragraph.textContent = "";

    // Split text into words and wrap each in a span
    const words = text.split(" ");
    words.forEach(word => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.className = "word";
        paragraph.appendChild(span);
    });

    // Animate words one by one
    const spans = paragraph.querySelectorAll(".word");
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add("show");
            // Remove highlight after a short delay
            setTimeout(() => {
                span.style.backgroundColor = "transparent";
            }, 800);
        }, index * 150); // delay between words
    });
});

function renderAuthPanel() {
    const user = localStorage.getItem('loggedInUser');
    const authContent = document.getElementById('authContent');

    if(user){
        authContent.innerHTML = `Welcome, ${user} | <a href="#" id="logoutBtn" style="color:#1829e6;text-decoration:none;font-weight:bold;">Logout</a>`;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html'; // go back to login page
        });
    } else {
        authContent.innerHTML = `<a href="login.html" style="color:#1829e6;text-decoration:none;font-weight:bold;">Login</a>`;
    }
}

// Run on page load
renderAuthPanel();
// -----------------------------
// LOGIN MODAL FUNCTIONS
// -----------------------------
function openLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}
function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

// -----------------------------
// AUTH PANEL & ACCESS CONTROL
// -----------------------------
function renderAuthPanel() {
    const user = localStorage.getItem('loggedInUser');
    const authContent = document.getElementById('authContent');
    const mainContent = document.getElementById('mainContent');

    if(user) {
        // Show page content
        mainContent.style.display = 'block';
        authContent.innerHTML = `Welcome, ${user} | <a href="#" id="logoutBtn">Logout</a>`;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            location.reload(); // reload page to hide content
        });
    } else {
        // Hide content until login
        mainContent.style.display = 'none';
        authContent.innerHTML = `<a href="#" onclick="openLogin()">Login</a>`;
    }
}

// -----------------------------
// LOGIN BUTTON
// -----------------------------
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPass').value;
    const message = document.getElementById('loginMessage');

    const validUsername = "GEBRMICHAEL";
    const validPassword = "Negusu123";

    if(username === validUsername && password === validPassword) {
        localStorage.setItem('loggedInUser', username);
        message.textContent = `Welcome, ${username}!`;
        message.style.color = 'green';
        setTimeout(() => {
            document.getElementById('loginModal').style.display = 'none';
            renderAuthPanel(); // show content
        }, 500);
    } else {
        message.textContent = 'Invalid username or password';
        message.style.color = 'red';
    }
});

// -----------------------------
// INITIALIZE PAGE
// -----------------------------
window.onload = renderAuthPanel;