import { API } from '../HTTP_requests/api.js'

// LOADER
let page = document.querySelectorAll('.page');
let loader = document.querySelector('#loader');
page.forEach(item => { item.classList.add('onload') })
loader.classList.add('loader')

window.addEventListener('load', () => {
	page.forEach(item => { item.classList.remove('onload') })
	loader.classList.remove('loader')
	loader.setAttribute('style', 'display: none')

	// delete scroll to block after reload
	window.location.hash = '';
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


// TEACHERS
let teachersCard = ''
function cardTemplateTeachers(firstname, lastname, patronymic, typeofteacher, imgUrl) {
	teachersCard = `
	<div class="col-lg-4 col-md-5 col-sm-12 p-lg-5 p-3">
		<div class="card">
			<div class="card-body p-0">
				<img class="w-100" src="${imgUrl}" alt="...">
				<h5 id="fullname"><b>${lastname} ${firstname} ${patronymic}</b></h5>
				<p><b>Урок:</b> ${typeofteacher}</p>
				<button class="btn btn-secondary w-100" id="learnMoreBtn">Подробнее</button>
			</div>
		</div>
	</div>
`
}

API.get('https://parseapi.back4app.com/classes/teachers', res => {
	let teachersBlock = document.querySelector('#teachersBlock')
	let modalWindow = document.querySelector('#teachersModal')
	let modalBody = document.querySelector('#teachersModalBody')
	let idArray = [];
	let cardArray = [];

	res.forEach((item) => {
		cardTemplateTeachers(item.firstname, item.lastname, item.patronymic, item.typeofteacher, item.photo.url)
		idArray.push(item.objectId)
		cardArray.unshift(teachersCard)
	})

	cardArray.forEach(item => { teachersBlock.insertAdjacentHTML('afterbegin', item) })

	let learnMoreBtn = document.querySelectorAll('#learnMoreBtn');
	learnMoreBtn.forEach((button, index) => {
		button.setAttribute('data-target', `#${idArray[index]}`)
		button.setAttribute('data-toggle', 'modal')
		button.addEventListener('click', () => {
			modalWindow.id = idArray[index]
			modalBody.innerHTML = `
				<h3>${res[index].lastname} ${res[index].firstname} ${res[index].patronymic}</h3>
				<h6>Преподаваемый урок: ${res[index].typeofteacher}</h6>
				<h6>Кабинет № ${res[index].room}</h6>
				<h6>Возраст: ${res[index].age}</h6>
				<h6>Номер телефона: ${res[index].phonenumber}</h6>
				<h6>Номер WhatsApp: ${res[index].whatsnum}</h6>
				<h6>Email: ${res[index].email}</h6>
		`})
	})
})
// TEACHERS


// NEWS
let newsCard = ''
function cardTemplateNews(title, body, date) {
	newsCard = `
	<div class="col-md-6 p-3">
		<div class="p-3" style="background-color: rgba(255, 255, 255, 0.75); border-radius: 10px;">
			<h4>${title}</h4>
			<p>${body}</p>
			<p class="date"><b>Дата:</b> ${date}</p>
		</div>
	</div>
`
}

API.get('https://parseapi.back4app.com/classes/news', res => {
	let newsBlock = document.querySelector('#newsBlock')
	let cardArray = [];

	res.forEach((item) => {
		let date = new Date(item.createdAt).toLocaleDateString()
		cardTemplateNews(item.title, item.body, date)
		cardArray.unshift(newsCard)
	})

	cardArray.forEach(item => { newsBlock.insertAdjacentHTML('afterbegin', item) })
})

// GET (news)
// fetch('https://parseapi.back4app.com/classes/news',
//     {
//         headers: {
//             'X-Parse-Application-Id': 'Sbmh1dqC6y29EhgLdXZsC0UfuG5Ij5LZqTXgmgWz',
//             'X-Parse-REST-API-Key': 'igRmoVIOsA7YH0O31rB3nSkrE7dxMLu0VVHa6rVy'
//         }
//     })
//     .then(response => response.json())
//     .then(json => {
//         let newsArray = []
//         json.results.forEach(item => {
//             let date = new Date(item.updatedAt).toLocaleDateString()
//             cardTemplateNews(item.title, item.body, date)
//             newsArray.unshift(card)
//         })
//         for (let i = 0; i < newsArray.length; i++) {
//             newsBlock.insertAdjacentHTML('afterbegin', newsArray[i])
//         }
//     })
// NEWS