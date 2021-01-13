// Navbar-toggler animation
let navToggler = document.querySelector('.navbar-toggler');
navToggler.addEventListener('click', () => {
    if (navToggler.hasAttribute('style')) {
        navToggler.removeAttribute('style')
    } else {
        navToggler.setAttribute('style', 'transform: rotate(90deg) !important;')
    }
})

// LOADER
let page = document.querySelectorAll('.page');
let loader = document.querySelector('#loader');

page.forEach(item => {
    item.classList.add('onload')
})
loader.classList.add('loader')

window.addEventListener('load', () => {
    page.forEach(item => {
        item.classList.remove('onload')
    })
    loader.classList.remove('loader')
    loader.setAttribute('style', 'display: none')
})
