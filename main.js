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

function scrollFunction() {
    if (isViewportLessThan700px()) return;

    const navigationButton = document.getElementsByClassName('image-nav-bar-container')[0];
    const navigationContent = document.getElementsByClassName('image-nav-bar-content')[0];
    const header_log = document.getElementById('header-nav');
    const navBarRect = navigationButton.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (!(navBarRect.top >= 0 && navBarRect.bottom <= windowHeight)) {
        navigationContent.classList.add('sticky-nav');
        header_log.style.display="flex";
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
                galleryHeight = galleryHeight > 600 ? 600 : galleryHeight;
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
        img.style.height = '400px';
        gallerySection.style.marginTop = '300px';
    });

    img.addEventListener('mouseleave', function() {
        img.style.height = ''; 
        gallerySection.style.marginTop = '80px';
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














