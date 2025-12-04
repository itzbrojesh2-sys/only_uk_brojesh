// -------- Custom Alert Notification --------
const customAlert = document.getElementById('custom-alert');

// Function to show the alert
function showAlert() {
    if (customAlert) {
        customAlert.classList.add('show');

        // Automatically hide the alert after 5 seconds
        setTimeout(() => {
            closeAlert();
        }, 5000);
    }
}

// Function to close the alert
function closeAlert() {
    if (customAlert) {
        customAlert.classList.remove('show');
    }
}

// Show the alert when the page has finished loading
document.addEventListener('DOMContentLoaded', showAlert);

// -------- Mobile Menu Functionality --------
const navMenu = document.getElementById('navmenus');
const openMenuBtn = document.getElementById('menu-open-btn');
const closeMenuBtn = document.getElementById('menu-close-btn');

if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => {
        navMenu.style.right = "0";
    });
}
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        navMenu.style.right = "-300px";
    });
}

// -------- FAQ Accordion --------
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        question.classList.toggle('active');
        icon.classList.toggle('rotate');
        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
    });
});

// -------- On-Page Search Functionality --------
const searchInput = document.getElementById('search-input');
let markInstance;

if (searchInput) {
    // Dynamically load the mark.js library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js';
    script.onload = () => {
        // Initialize Mark.js once the script is loaded
        markInstance = new Mark(document.querySelector("body"));
    };
    document.head.appendChild(script);

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        if (markInstance) {
            // Remove previous highlights and then apply new ones
            markInstance.unmark({
                done: () => {
                    if (searchTerm.length > 1) { // Only search for terms longer than 1 character
                        markInstance.mark(searchTerm, {
                            element: 'mark',
                            className: 'highlight'
                        });
                    }
                }
            });
        }
    });
}
// (Removed unused payment modal code — page has no `#payment-modal` element.)
// -------- Order Status Tracker Functionality --------
const statusSteps = document.querySelectorAll('.status-step');
const progressBar = document.getElementById('progress-bar');

if (statusSteps.length > 0 && progressBar) {
    statusSteps.forEach(step => {
        step.addEventListener('click', () => {
            const currentStep = parseInt(step.dataset.step);

            statusSteps.forEach((s, index) => {
                const stepNum = index + 1;
                s.classList.remove('active', 'completed');
                if (stepNum < currentStep) {
                    s.classList.add('completed');
                } else if (stepNum === currentStep) {
                    s.classList.add('active');
                }
            });

            const progressWidth = ((currentStep - 1) / (statusSteps.length - 1)) * 100;
            progressBar.style.width = progressWidth + '%';
        });
    });
}

// -------- Show Order Status Section on Click --------
const orderStatusBtn = document.querySelector('a[href="#order-status"]');
const orderStatusSection = document.getElementById('order-status');

if (orderStatusBtn && orderStatusSection) {
    orderStatusBtn.addEventListener('click', (e) => {
        // Prevent the default anchor link jump
        e.preventDefault();

        // Toggle the section's visibility
        orderStatusSection.style.display = 'block';

        // Smoothly scroll to the section
        orderStatusSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// -------- Link QR Code to Payment Status --------
// Payment QR code handlers removed — payment option section was deleted from HTML.