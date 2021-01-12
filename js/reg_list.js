// Navbar-toggler animation
let navToggler = document.querySelector('.navbar-toggler');
navToggler.addEventListener('click', () => {
    if (navToggler.hasAttribute('style')) {
        navToggler.removeAttribute('style')
    } else {
        navToggler.setAttribute('style', 'transform: rotate(90deg) !important;')
    }
})

// delete scroll to block after reload
window.addEventListener('load', () => {
   window.location.hash = '';
})

let teachersBlock = document.querySelector('#teachersBlock')

function cardTemplate(imgUrl, teacherLink) {
    return card = `
<div class="col-md-5 col-sm-12 p-lg-5 p-3">
    <div>
        <img class="w-100" src="${imgUrl}" alt="...">
        <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
        <a href="${teacherLink}"><button class="btn btn-primary w-100">Подробнее</button></a>
    </div>
</div>
`
}

for (let i = 0; i < 10; i++) {
    cardTemplate('https://cutt.ly/OjcRP6y', '/html/profile.html')
    teachersBlock.insertAdjacentHTML('afterbegin', card)
}
