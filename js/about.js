import { API } from '../HTTP_requests/api.js'

// SWIPER items
let card = ''
function cardTemplate(imgUrl, firstname, lastname, patronymic, age) {
  card = `
    <div class="swiper-slide">
      <div class="card w-100">
        <div class="card-body p-0" style='height: 60vh !important'>
          <img class="rounded-circle" src="${imgUrl}" alt="...">
          <h4>${firstname} ${lastname} ${patronymic}</h4>
          <p>Возраст: ${age}</p>
          <button class="btn btn-primary w-100" style="position: absolute; bottom: 0; left: 0;" id="learnMoreBtn">Подробнее</button>
        </div>
      </div>
    </div>
  `
}

API.get('https://parseapi.back4app.com/classes/teachers', res => {
  let swiperWrapper = document.querySelector('.swiper-wrapper');
  let modalWidow = document.querySelector('.modal')
  let modalBody = document.querySelector('.modal-body')
  let idArray = [];

  res.forEach(item => {
    cardTemplate(item.photo.url, item.firstname, item.lastname, item.patronymic, item.age)
    swiperWrapper.insertAdjacentHTML('afterbegin', card)

    idArray.push(item.objectId)
  })
  
  let learnMoreBtn = document.querySelectorAll('#learnMoreBtn');
  learnMoreBtn.forEach((button, index) => {
    button.setAttribute('data-target', `#${idArray[index]}`)
    button.setAttribute('data-toggle', 'modal')
    button.addEventListener('click', () => {
      modalWidow.id = idArray[index]
      console.log(idArray[index], modalWidow.id, modalWidow);
      modalBody.innerHTML = `<h1>${res[index].objectId}</h1> \n <h2>${res[index].firstname}</h2>`
    })
  })

  // SWIPER.JS options
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
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
      delay: 300000,
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