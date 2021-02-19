import { API } from '../HTTP_requests/api.js'

// SWIPER items
let card = ''
function cardTemplate(imgUrl, firstname, lastname, patronymic) {
  card = `
    <div class="swiper-slide">
      <div class="card w-100">
        <div class="card-body p-0 pt-3" style='height: 55vh !important;'>
          <img class="rounded-circle" src="${imgUrl}" alt="...">
          <h5 class="mt-4 pl-2 pr-2">${lastname} ${firstname} ${patronymic}</h5>
          <button class="btn btn-primary" id="learnMoreBtn">Подробнее</button>
        </div>
      </div>
    </div>
  `
}

API.get('https://parseapi.back4app.com/classes/teachers', res => {
  let swiperWrapper = document.querySelector('.swiper-wrapper');
  let modalWindow = document.querySelector('.modal')
  let modalBody = document.querySelector('.modal-body')
  let idArray = [];
  let cardArray = [];

  res.forEach((item) => {
    cardTemplate(item.photo.url, item.firstname, item.lastname, item.patronymic)
    idArray.push(item.objectId)
    cardArray.unshift(card)
  })

  cardArray.forEach(item => {
    swiperWrapper.insertAdjacentHTML('afterbegin', item)
  })

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

  // SWIPER.JS options
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
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

// LOADER
let page = document.querySelectorAll('.page');
let loader = document.querySelector('#loader');
page.forEach(item => { item.classList.add('onload') })
loader.classList.add('loader')

window.addEventListener('load', () => {
  page.forEach(item => { item.classList.remove('onload') })
  loader.classList.remove('loader')
  loader.setAttribute('style', 'display: none')
})