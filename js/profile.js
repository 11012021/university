// Navbar-toggler animation
let navToggler = document.querySelector('.navbar-toggler');
navToggler.addEventListener('click', () => {
    if (navToggler.hasAttribute('style')) {
        navToggler.removeAttribute('style')
    } else {
        navToggler.setAttribute('style', 'transform: rotate(90deg) !important;')
    }
})