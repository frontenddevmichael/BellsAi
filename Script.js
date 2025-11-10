// ========================================
// BELLS AI - DARK MODE & INTERACTIVITY
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // ========== DARK MODE FUNCTIONALITY ==========
    const darkModeToggle = document.querySelector('.icon-btn[aria-label="Toggle Dark Mode"]');
    const body = document.body;
    const darkModeIcon = darkModeToggle.querySelector('i');

    // Check for saved dark mode preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    }

    // Dark mode toggle event
    darkModeToggle.addEventListener('click', function () {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });

    // ========== SIDEBAR TOGGLE (MOBILE) ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // ========== CHAT FUNCTIONALITY ==========
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const welcomeSection = document.getElementById('welcome-section');
    const typingIndicator = document.getElementById('typing-indicator');

    // Handle popular question buttons
    const questionButtons = document.querySelectorAll('.question-btn');
    questionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const questionText = this.querySelector('span').textContent;
            userInput.value = questionText;
            handleChatSubmit(questionText);
        });
    });

    // Handle category cards click
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const firstExample = this.querySelector('.example-queries li');
            if (firstExample) {
                const exampleText = firstExample.textContent.replace(/['"]/g, '');
                userInput.value = exampleText;
                userInput.focus();
            }
        });
    });

    // Handle form submission
    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const message = userInput.value.trim();

        if (message) {
            handleChatSubmit(message);
            userInput.value = '';
        }
    });

    function handleChatSubmit(message) {
        // Hide welcome section and show chat
        welcomeSection.classList.add('hidden');
        chatMessages.classList.remove('hidden');

        // Add user message
        addUserMessage(message);

        // Show typing indicator
        if (typingIndicator) {
            typingIndicator.classList.remove('hidden');
        }

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            if (typingIndicator) {
                typingIndicator.classList.add('hidden');
            }
            addAssistantMessage(generateMockResponse(message));

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);

        // Scroll to bottom after adding user message
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }

    function addUserMessage(message) {
        const messageGroup = document.createElement('div');
        messageGroup.className = 'message-group user-group';

        const time = getCurrentTime();

        messageGroup.innerHTML = `
            <div class="message user-message">
                <div class="message-content">${escapeHtml(message)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        chatMessages.appendChild(messageGroup);
    }

    function addAssistantMessage(message) {
        const messageGroup = document.createElement('div');
        messageGroup.className = 'message-group assistant-group';

        const time = getCurrentTime();

        messageGroup.innerHTML = `
            <div class="assistant-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message assistant-message">
                <div class="message-content">${message}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        chatMessages.appendChild(messageGroup);
    }

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function generateMockResponse(query) {
        // Simple mock responses (willreplace  with actual AI integration)
        //Michael: i'll handle this with realtime 
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('library') || lowerQuery.includes('close') || lowerQuery.includes('open')) {
            return `
                <p>The Main Library is open until <strong>10:00 PM</strong> today.</p>
                <div class="info-card">
                    <h4><i class="fas fa-book"></i> Main Library Hours</h4>
                    <ul>
                        <li><strong>Mon-Thu:</strong> 7:00 AM - 10:00 PM</li>
                        <li><strong>Fri:</strong> 7:00 AM - 6:00 PM</li>
                        <li><strong>Sat-Sun:</strong> 9:00 AM - 5:00 PM</li>
                    </ul>
                </div>
                <p class="helpful-note"><i class="fas fa-lightbulb"></i> The 24-hour study room is always available!</p>
            `;
        } else if (lowerQuery.includes('event') || lowerQuery.includes('happening')) {
            return `
                <p>Here are the upcoming events this week:</p>
                <div class="info-card">
                    <h4><i class="fas fa-calendar-alt"></i> This Week's Events</h4>
                    <ul>
                        <li><strong>Tuesday, 3:00 PM:</strong> Tech Career Fair - Student Center</li>
                        <li><strong>Wednesday, 6:00 PM:</strong> AI Workshop - Lab 204</li>
                        <li><strong>Thursday, 2:00 PM:</strong> Student Council - Building A</li>
                        <li><strong>Friday, 7:00 PM:</strong> Jazz Night - Campus Auditorium</li>
                    </ul>
                </div>
                <p class="helpful-note"><i class="fas fa-lightbulb"></i> Register at the student portal!</p>
            `;
        } else if (lowerQuery.includes('registr') || lowerQuery.includes('office')) {
            return `
                <p>The Registrar's Office is located in <strong>Administration Building, Room 105</strong>.</p>
                <div class="info-card">
                    <h4><i class="fas fa-door-open"></i> Office Information</h4>
                    <ul>
                        <li><strong>Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM</li>
                        <li><strong>Phone:</strong> (555) 123-4567</li>
                        <li><strong>Email:</strong> registrar@university.edu</li>
                    </ul>
                </div>
            `;
        } else if (lowerQuery.includes('wifi') || lowerQuery.includes('internet')) {
            return `
                <p>To connect to campus WiFi, follow these steps:</p>
                <div class="info-card">
                    <h4><i class="fas fa-wifi"></i> WiFi Connection Guide</h4>
                    <ul>
                        <li><strong>1.</strong> Select "Campus-WiFi" network</li>
                        <li><strong>2.</strong> Enter your student ID</li>
                        <li><strong>3.</strong> Use your portal password</li>
                        <li><strong>4.</strong> Accept the terms of service</li>
                    </ul>
                </div>
                <p class="helpful-note"><i class="fas fa-lightbulb"></i> For issues, contact IT Help Desk at ext. 2000</p>
            `;
        } else {
            return `
                <p>Thank you for your question! I'm here to help you with information about:</p>
                <div class="info-card">
                    <h4><i class="fas fa-info-circle"></i> What I Can Help With</h4>
                    <ul>
                        <li>Academic schedules and course information</li>
                        <li>Department locations and contact details</li>
                        <li>Campus events and activities</li>
                        <li>Facilities and services</li>
                    </ul>
                </div>
                <p class="helpful-note"><i class="fas fa-lightbulb"></i> Try asking about library hours, upcoming events, or department locations!</p>
            `;
        }
    }

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    userInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    document.addEventListener('keydown', function (e) {
        // CMD/CTRL + K to focus search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            userInput.focus();
        }

        // ESC to close sidebar on mobile
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top hidden';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('🔔 Bells AI initialized successfully!');
});