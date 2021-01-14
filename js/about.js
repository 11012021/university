// SWIPER items
let swiperWrapper = document.querySelector('.swiper-wrapper');

function cardTemplate(imgUrl, teacherLink, ic) {
  return card = `
    <div class="swiper-slide">
    <div class="card">
        <div class="card-body p-0">
            <img class="rounded-circle" src="${imgUrl}" alt="...">
            <p>${ic + 1} Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
            Lorem ipsum dolor sit amet.</p>
            <a href="${teacherLink}"><button class="btn btn-primary w-100">Подробнее</button></a>
        </div>
    </div>
    </div>
`
}

for (let i = 0; i < 8; i++) {
  cardTemplate('https://cutt.ly/OjcRP6y', '/html/profile.html', i)
  swiperWrapper.insertAdjacentHTML('afterbegin', card)
}

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
    delay: 3000,
    disableOnInteraction: false,
  },
});

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