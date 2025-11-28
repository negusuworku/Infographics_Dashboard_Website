document.addEventListener("DOMContentLoaded", function() {
    const user = localStorage.getItem('loggedInUser');
    const mainContent = document.getElementById('mainContent');
    const authContent = document.getElementById('authContent');

    function renderAuthPanel() {
        if(user) {
            mainContent.style.display = 'block'; // show content
            authContent.innerHTML = `Welcome, ${user} | <a href="#" id="logoutBtn">Logout</a>`;
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                location.reload();
            });
        } else {
            mainContent.style.display = 'none'; // hide content
            authContent.innerHTML = `<a href="#" onclick="openLogin()">Login</a>`;
        }
    }

    renderAuthPanel();

    // Word animation
    const paragraph = document.getElementById("homeParagraph");
    if(paragraph){
        const text = paragraph.textContent;
        paragraph.textContent = "";
        const words = text.split(" ");
        words.forEach(word => {
            const span = document.createElement("span");
            span.textContent = word + " ";
            span.className = "word";
            paragraph.appendChild(span);
        });

        const spans = paragraph.querySelectorAll(".word");
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add("show");
                setTimeout(() => {
                    span.style.backgroundColor = "transparent";
                }, 800);
            }, index * 150);
        });
    }

    // Login button in modal
    document.getElementById('loginBtn').addEventListener('click', function() {
        const username = document.getElementById('loginUser').value;
        const password = document.getElementById('loginPass').value;
        const message = document.getElementById('loginMessage');

        const validUsername = "GEBRMICHAEL";
        const validPassword = "Negusu123";

        if(username === validUsername && password === validPassword){
            localStorage.setItem('loggedInUser', username);
            message.textContent = `Welcome, ${username}!`;
            message.style.color = 'green';
            setTimeout(() => {
                document.getElementById('loginModal').style.display = 'none';
                location.reload(); // refresh page to show content
            }, 500);
        } else {
            message.textContent = 'Invalid username or password';
            message.style.color = 'red';
        }
    });
});