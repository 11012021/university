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

function cardTemplate(firstname, lastname, age, typeofteacher, room, imgUrl, teacherLink) {
    return card = `
<div class="col-lg-4 col-md-5 col-sm-12 p-lg-5 p-3">
    <div class="card">
        <div class="card-body p-0">
            <img class="w-100" src="${imgUrl}" alt="...">
            <p><b>${firstname} ${lastname} ${age} лет</b></p>
            <p><b>Должность:</b> ${typeofteacher}</p>
            <p><b>Кабинет:</b> ${room}</p>
            <a href="${teacherLink}"><button class="btn btn-secondary w-100">Подробнее</button></a>
        </div>
    </div>
</div>
`
}

fetch('https://parseapi.back4app.com/classes/teachers',
    {
        headers: {
            'X-Parse-Application-Id': 'Sbmh1dqC6y29EhgLdXZsC0UfuG5Ij5LZqTXgmgWz',
            'X-Parse-REST-API-Key': 'igRmoVIOsA7YH0O31rB3nSkrE7dxMLu0VVHa6rVy'
        }
    })
    .then(response => response.json())
    .then(json => {
        let teachersArray = []
        json.results.forEach(item => {
            cardTemplate(item.firstname, item.lastname, item.age, item.typeofteacher, item.room, item.photo.url, '/html/profile.html')
            teachersArray.unshift(card)
        })
        for (let i = 0; i < teachersArray.length; i++) {
            teachersBlock.insertAdjacentHTML('afterbegin', teachersArray[i])
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

    // delete scroll to block after reload
    window.location.hash = 'schedule';
})
