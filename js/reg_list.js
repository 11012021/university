// Navbar-toggler animation
let navToggler = document.querySelector('.navbar-toggler');
navToggler.addEventListener('click', () => {
    if (navToggler.hasAttribute('style')) {
        navToggler.removeAttribute('style')
    } else {
        navToggler.setAttribute('style', 'transform: rotate(90deg) !important;')
    }
})

// creating teachersBlock
let teachersBlock = document.querySelector('#teachersBlock')

function cardTemplate(imgUrl, teacherLink) {
    return card = `
<div class="col-lg-4 col-md-5 col-sm-12 p-lg-5 p-3">
    <div class="card">
        <div class="card-body p-0">
            <img class="w-100" src="${imgUrl}" alt="...">
            <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
            <a href="${teacherLink}"><button class="btn btn-secondary w-100">Подробнее</button></a>
        </div>
    </div>
</div>
`
}

for (let i = 0; i < 8; i++) {
    cardTemplate('https://cutt.ly/OjcRP6y', '/html/profile.html')
    teachersBlock.insertAdjacentHTML('afterbegin', card)
}

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

    // delete scroll to block after reload
    window.location.hash = 'schedule';
})
