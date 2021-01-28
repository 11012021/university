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
let newsBlock = document.querySelector('#newsBlock')

function cardTemplateTeachers(firstname, lastname, patronymic, age, typeofteacher, room, imgUrl) {
    return card = `
<div class="col-lg-4 col-md-5 col-sm-12 p-lg-5 p-3">
    <div class="card">
        <div class="card-body p-0">
            <img class="w-100" src="${imgUrl}" alt="...">
            <p id="fullname"><b>${firstname} ${lastname} ${patronymic} ${age} лет</b></p>
            <p><b>Должность:</b> ${typeofteacher}</p>
            <p><b>Кабинет:</b> ${room}</p>
            <a href="/html/profile.html" target="_blank"><button class="btn btn-secondary w-100">Подробнее</button></a>
        </div>
    </div>
</div>
`
}

function cardTemplateNews(title, body, date) {
    return card = `
    <div class="col-md-6 p-3">
        <div class="p-3" style="background-color: rgba(255, 255, 255, 0.75); border-radius: 10px;">
            <h4>${title}</h4>
            <p>${body}</p>
            <p class="date"><b>Date:</b> ${date}</p>
        </div>
    </div>
`
}

// GET (teachers)
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
            console.log(item);
            cardTemplateTeachers(item.firstname, item.lastname, item.patronymic, item.age, item.typeofteacher, item.room, item.photo.url)
            teachersArray.unshift(card)
        })
        for (let i = 0; i < teachersArray.length; i++) {
            teachersBlock.insertAdjacentHTML('afterbegin', teachersArray[i])
        }
    })

// GET (news)
fetch('https://parseapi.back4app.com/classes/news',
    {
        headers: {
            'X-Parse-Application-Id': 'Sbmh1dqC6y29EhgLdXZsC0UfuG5Ij5LZqTXgmgWz',
            'X-Parse-REST-API-Key': 'igRmoVIOsA7YH0O31rB3nSkrE7dxMLu0VVHa6rVy'
        }
    })
    .then(response => response.json())
    .then(json => {
        let newsArray = []
        json.results.forEach(item => {
            let date = new Date(item.updatedAt).toLocaleDateString()
            cardTemplateNews(item.title, item.body, date)
            newsArray.unshift(card)
        })
        for (let i = 0; i < newsArray.length; i++) {
            newsBlock.insertAdjacentHTML('afterbegin', newsArray[i])
        }
    })