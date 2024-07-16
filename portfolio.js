document.addEventListener('DOMContentLoaded', function() {
    const roles = ["Data Engineer", "Data Analyst", "Software Engineer"];
    let currentRoleIndex = 0;
    let charIndex = 0;
    const typedRolesElement = document.getElementById('typed-roles');
    const cursorElement = document.getElementById('cursor');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const waitTime = 2000;

    function typeRole() {
        if (charIndex < roles[currentRoleIndex].length) {
            typedRolesElement.textContent += roles[currentRoleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, typingSpeed);
        } else {
            setTimeout(deleteRole, waitTime);
        }
    }

    function deleteRole() {
        if (charIndex > 0) {
            typedRolesElement.textContent = roles[currentRoleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteRole, deletingSpeed);
        } else {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, typingSpeed);
        }
    }

    typeRole();

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load the user's preferred theme from local storage
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme) {
        body.classList.add(preferredTheme);
    }

    themeToggle.addEventListener('click', function() {
        body.classList.add('transition');
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
        window.setTimeout(() => {
            body.classList.remove('transition');
        }, 500);
    });

    // Add event listener for flipping cards on mobile
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardInner = this.querySelector('.project-card-inner');
            cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });
});
