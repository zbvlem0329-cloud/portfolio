document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Code Tabs Interaction
    const tabContainers = document.querySelectorAll('.tab-container');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-btn');
        const tabPanes = container.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTabId = button.getAttribute('data-tab');
                
                // Remove active classes from buttons and panes in this container
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and target pane
                button.classList.add('active');
                const targetPane = container.querySelector(`#${targetTabId}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    });

    // 2. Scroll-Spy and Active Navigation Link Highlights
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const navItems = document.querySelectorAll('.nav-item');

    function highlightNavigation() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        // Offset scroll position to match the header or top area
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset for headers
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // If we scroll to the top or hero, active the overview section
        if (scrollPosition < 300) {
            currentSectionId = 'overview';
        }

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === currentSectionId) {
                    item.classList.add('active');
                }
            });
        }
    }

    // Bind scroll listener
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run on load

    // 3. Smooth scrolling for sidebar navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
                
                // Update active item manually
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
});

// 4. Copy Code to Clipboard Utility
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    if (!codeElement) return;

    const codeText = codeElement.innerText;
    
    // Copy to clipboard
    navigator.clipboard.writeText(codeText).then(() => {
        // Find the button adjacent to the copy action
        const button = codeElement.closest('.code-panel').querySelector('.btn-copy') || 
                       codeElement.closest('.tab-pane').querySelector('.btn-copy');
                       
        if (button) {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fa-solid fa-check" style="color: #4caf50;"></i> 복사됨!';
            button.style.borderColor = '#4caf50';
            
            // Revert after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.borderColor = '';
            }, 2000);
        }
    }).catch(err => {
        console.error('클립보드 복사 실패: ', err);
        alert('복사하지 못했습니다. 수동으로 드래그해 복사해 주세요.');
    });
}
