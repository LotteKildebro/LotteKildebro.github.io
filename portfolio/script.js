// Toggle burger menu on mobile
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const burgerIcon = document.getElementById('burger');
    menu.classList.toggle('open');
    burgerIcon.classList.toggle('open');
}

// Auto-close the menu when clicking on a menu item
document.querySelectorAll('.menu li a').forEach(item => {
    item.addEventListener('click', () => {
        const menu = document.querySelector('.menu');
        const burgerIcon = document.getElementById('burger');
        menu.classList.remove('open');
        burgerIcon.classList.remove('open');
    });
});

// Filtering based on categories
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        const items = document.querySelectorAll('.portfolio-item');

        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Search Functionality
document.getElementById('search-input').addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const items = document.querySelectorAll('.portfolio-item');

    items.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});