config={
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        altInput:true,
        altFormat: "F j, Y (h:S K)"
        }

flatpickr("input[type=datetime-local]", config);

function isViewportLessThan700px() {
    return window.innerWidth < 700;
}
const button = document.getElementById('image_button');
const introImage = document.querySelector('.intro-content');
const logoImage = document.querySelector('.logo-image');
let logo_container="assets/morning-palm.png";
// Toggle dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.classList.toggle('dark-mode');
    });
    logoImage.style.opacity = '0';
    button.style.opacity = '0';
    setTimeout(function() {
        if (button.getAttribute('src') === "assets/night-button.png") {
            button.src = "assets/morning-button.png";
            introImage.style.backgroundImage = 'url("assets/summer-dark-mode.jpg")';
            logoImage.src = "assets/night-fire.png";
            logo_container = "assets/night-fire.png";
        } else {
            button.src = "assets/night-button.png";
            introImage.style.backgroundImage = 'url("assets/summerlight.png")';
            logoImage.src = "assets/morning-palm.png";
            logo_container = "assets/morning-palm.png";
        }
        button.style.opacity = '1';
        logoImage.style.opacity = '1';
    }, 500);
}
// End here

function scrollFunction() {
    if (isViewportLessThan700px()) return;

    const navigationButton = document.getElementsByClassName('image-nav-bar-container')[0];
    const navigationContent = document.getElementsByClassName('image-nav-bar-content')[0];
    const header_log = document.getElementById('header-nav');
    const logo_Image2 = document.getElementById('second-logo');
    const navBarRect = navigationButton.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (!(navBarRect.top >= 0 && navBarRect.bottom <= windowHeight)) {
        navigationContent.classList.add('sticky-nav');
        header_log.style.display="flex";
        logo_Image2.src = logo_container;
        logo_Image2.style.width="50px"
        logo_Image2.style.height="50px"
    } else {
        navigationContent.classList.remove('sticky-nav');
        header_log.style.display="none";
    }
}

if (!isViewportLessThan700px()) {
    window.onscroll = scrollFunction;
}

document.addEventListener("DOMContentLoaded", function() {
    const showMoreButton = document.getElementById('showMoreButton');
    const hiddenImages = document.querySelectorAll('.gallery-content img:nth-child(n+4)');
    const serviceContent = document.getElementById('serviceContent');
    const jumpGallery = document.getElementById('jump-gallery');
    const gallerySection = document.querySelector('.gallery-section');
    let isHidden = true;

    function toggleHiddenImages() {
        hiddenImages.forEach(img => {
            img.style.display = isHidden ? 'block' : 'none';
        });

        if (isHidden) {
            if (isViewportLessThanOrEqualTo700px()) {
                let galleryHeight = gallerySection.scrollHeight;
                galleryHeight = galleryHeight > 0 ? 0 : galleryHeight;
                serviceContent.style.marginTop = `${galleryHeight}px`;
            }
        } else {
            serviceContent.style.marginTop = '0';
            
            // Scroll to the jump-gallery anchor element after hiding images
            jumpGallery.scrollIntoView({ behavior: 'smooth' });
        }

        showMoreButton.textContent = isHidden ? 'Hide' : 'Show More';
        isHidden = !isHidden;
    }

    showMoreButton.addEventListener('click', function() {
        toggleHiddenImages();
    });

    // Set initial image visibility based on viewport width
    if (isViewportLessThanOrEqualTo700px()) {
        hiddenImages.forEach(img => {
            img.style.display = 'none';
        });
    } else {
        hiddenImages.forEach(img => {
            img.style.display = 'block';
        });
    }

    // Function to check if viewport width is less than or equal to 700px
    function isViewportLessThanOrEqualTo700px() {
        return window.innerWidth <= 700;
    }
    
    // Add event listener for hovering on .price-content .offers img
    const priceContentOffersImgs = document.querySelectorAll('.price-content .offers img');

    priceContentOffersImgs.forEach(img => {
        img.addEventListener('mouseenter', function() {
            if (isViewportLessThanOrEqualTo700px()) {
                img.style.height = '400px';
                gallerySection.style.marginTop = '300px';
            }
        });

        img.addEventListener('mouseleave', function() {
            img.style.height = ''; 
            gallerySection.style.marginTop = '40px';
            if (isHidden && isViewportLessThanOrEqualTo700px()) {
                let galleryHeight = gallerySection.scrollHeight;
                galleryHeight = galleryHeight > 600 ? 600 : galleryHeight;
                serviceContent.style.marginTop = `${galleryHeight}px`;
            } else {
                gallerySection.style.marginTop = '0';
            }
        });
    });
});















