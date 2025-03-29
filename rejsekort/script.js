document.addEventListener("DOMContentLoaded", function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const burgerMenu = document.getElementById("burgerMenu");
    const card = document.querySelector(".card");
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    card.appendChild(overlay);

    burgerMenu.addEventListener("click", function () {
        dropdownMenu.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", function () {
        dropdownMenu.classList.remove("active");
        overlay.classList.remove("active");
    });

    document.addEventListener("click", function (event) {
        if (!dropdownMenu.contains(event.target) && !burgerMenu.contains(event.target) && !overlay.contains(event.target)) {
            dropdownMenu.classList.remove("active");
            overlay.classList.remove("active");
        }
    });

    let timer; // Declare the timer variable outside the event listener

    document.getElementById('swipeButton').addEventListener('click', function () {
        this.classList.toggle('swiped');
        const swipeContainer = document.querySelector('.swipe-container');
        const timerElement = document.getElementById('timer');
        const arrow = this.querySelector('.arrow');

        if (this.classList.contains('swiped')) {
            this.style.backgroundColor = 'red';
            swipeContainer.classList.add('green');
            timerElement.style.display = 'block'; // Show the timer
            arrow.classList.add('rotated'); // Rotate the arrow

            // Reset and start the timer
            clearInterval(timer);
            let seconds = 0;
            timerElement.textContent = '0:00';
            timer = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                timerElement.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
            }, 1000);
        } else {
            this.style.backgroundColor = '#138f70';
            swipeContainer.classList.remove('green');
            timerElement.style.display = 'none'; // Hide the timer
            arrow.classList.remove('rotated'); // Reset the arrow rotation

            // Stop the timer
            clearInterval(timer);
            timerElement.textContent = '0:00';
        }
    });

    const greenButton = document.querySelector('.round-button.green');
    const popup = document.getElementById('popup');

    greenButton.addEventListener('click', function () {
        popup.classList.add('active');
    });

    document.addEventListener('click', function (event) {
        if (!popup.contains(event.target) && !greenButton.contains(event.target)) {
            popup.classList.remove('active');
        }
    });

    const loadingScreen = document.getElementById("loading-screen");
    setTimeout(() => {
        loadingScreen.classList.add("hidden");
    }, 2000); // Adjust the delay as needed

    // New code to handle the button click and update the prize and route
    const btn = document.getElementById('btn');
    const dropdown = document.querySelector('.line select');
    const prizeElement = document.querySelector('.prize .bold');
    const routeElement = document.querySelector('.route');

    btn.addEventListener('click', function () {
        const selectedDestination = dropdown.options[dropdown.selectedIndex].text;
        prizeElement.textContent = '19 kr,-'; // Update the prize
        routeElement.textContent = `Fra Nørrebros runddel st. til ${selectedDestination}`; // Update the route
        popup.classList.remove('active'); // Hide the popup
    });

    /*WIDGET */
    const lockScreenButton = document.getElementById("lockScreenButton");
    const lockScreenPopup = document.getElementById("lockScreenPopup");
    const checkOutButton = document.getElementById("checkOutButton");

    lockScreenButton.addEventListener("click", function () {
        lockScreenPopup.classList.toggle("active");
    });

    lockScreenPopup.addEventListener("click", function (event) {
        if (event.target === lockScreenPopup) {
            lockScreenPopup.classList.remove("active");
        }
    });

    checkOutButton.addEventListener("click", function () {
        alert("Check ud gennemført!");
        lockScreenPopup.classList.remove("active");
    });
});