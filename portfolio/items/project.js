// Function to get the project ID from URL query parameter
function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("project");
}

// Function to fetch project data
async function fetchProjectData() {
    const response = await fetch("projects-data.json");
    const projects = await response.json();
    return projects;
}

// Function to load the project details
async function loadProjectDetails() {
    const projectId = getProjectId();
    if (!projectId) {
        document.getElementById("project-title").innerText = "Project Not Found";
        return;
    }

    const projects = await fetchProjectData();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        document.getElementById("project-title").innerText = "Project Not Found";
        return;
    }

    // Populate the HTML with the project data
    document.getElementById("project-title").innerText = project.title;
    document.getElementById("project-subtitle").innerText = project.subtitle;

    // Populate project description
    const descriptionElement = document.getElementById("project-description");
    descriptionElement.innerHTML = ""; // Clear previous content
    project.description.forEach(paragraph => {
        const p = document.createElement("p");
        p.innerText = paragraph;
        descriptionElement.appendChild(p);
    });

    // Populate project description
    const descriptionElement2 = document.getElementById("project-description2");
    descriptionElement2.innerHTML = ""; // Clear previous content
    project.description2.forEach(paragraph => {
        const p = document.createElement("p");
        p.innerText = paragraph;
        descriptionElement2.appendChild(p);
    });

    // Insert iframe into HTML
    const iframeContainer = document.getElementById("iframe-container");
    const responsiveIframeContainer = document.querySelector(".responsive-iframe-container");
    if (project.iframe) {
        iframeContainer.innerHTML = project.iframe;
        iframeContainer.style.display = "block";
        responsiveIframeContainer.style.display = "block";
    } else {
        iframeContainer.style.display = "none";
        responsiveIframeContainer.style.display = "none";
    }

    // Insert iframe2 into HTML
    const iframeContainer2 = document.getElementById("iframe-container2");
    const responsiveIframeContainer2 = document.querySelector(".responsive-iframe-container2");
    if (project.iframe2) {
        iframeContainer2.innerHTML = project.iframe2;
        iframeContainer2.style.display = "block";
        responsiveIframeContainer2.style.display = "block";
    } else {
        iframeContainer2.style.display = "none";
        responsiveIframeContainer2.style.display = "none";
    }

    // Insert url into HTML
    const urlElement = document.getElementById("url");
    if (project.url) {
        urlElement.innerHTML = project.url;
        urlElement.style.display = "block";
    } else {
        urlElement.style.display = "none";
    }

    // Populate the gallery
    const galleryElement = document.getElementById("gallery");
    galleryElement.innerHTML = ""; // Clear previous content
    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(image => {
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("gallery-item");

            const img = document.createElement("img");
            img.src = image;
            img.alt = project.title;

            imgDiv.appendChild(img);
            galleryElement.appendChild(imgDiv);
        });
        galleryElement.style.display = "block";
    } else {
        galleryElement.style.display = "none";
    }

    // Add event listeners for gallery images
    addGalleryEventListeners();
}

// Function to add event listeners to gallery images
function addGalleryEventListeners() {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const galleryItems = document.querySelectorAll(".gallery-item img");

    galleryItems.forEach(function (item) {
        item.onclick = function () {
            modal.style.display = "flex";
            modalImg.src = this.src;
        }
    });

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside of the image
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Load project details when the page loads
window.onload = loadProjectDetails;