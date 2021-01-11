// Navigation buttons
let newsBtn = document.getElementById('news_btn');
let teachersBtn = document.getElementById('teachers_btn');
let scheduleBtn = document.getElementById('schedule_btn');

let teachersBlock = document.getElementById('teachersBlock')
let newsBlock = document.getElementById('newsBlock')
let scheduleBlock = document.getElementById('scheduleBlock')

// Teachers page
function cardTemplate(firstname, lastname, work, imgURL) {
    return card = `
<div class="card mt-4">
<div class="card-body">
  <div class="d-flex flex-column align-items-center text-center">
    <img src="${imgURL}"
      alt="Admin" class="rounded-circle" width="150">
    <div class="mt-3">
      <h4>${firstname} ${lastname}</h4>
      <p class="text-secondary mb-3">${work}</p>
      <button class="btn btn-outline-danger">Удалить</button>
      <button class="btn btn-outline-primary">Отзывы</button>
      <button class="btn btn-outline-success">Редактировать</button>
    </div>
  </div>
</div>
</div>
`
}

// draw teachers in main page
for (let i = 0; i < 10; i++) {
    cardTemplate('Mirsaid', 'Narumbaev', 'Teacher', 
    'https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png');
    teachersBlock.insertAdjacentHTML('afterbegin', card)
}
teachersBlock.lastElementChild.classList.add('mb-5')


// CRUD Teachers
newsBtn.addEventListener('click', () => {
    teachersBlock.setAttribute('style', 'display: none')
    scheduleBlock.setAttribute('style', 'display: none')
    newsBlock.removeAttribute('style')
})
teachersBtn.addEventListener('click', () => {
    newsBlock.setAttribute('style', 'display: none')
    scheduleBlock.setAttribute('style', 'display: none')
    teachersBlock.removeAttribute('style')
})
scheduleBtn.addEventListener('click', () => {
    teachersBlock.setAttribute('style', 'display: none')
    newsBlock.setAttribute('style', 'display: none')
    scheduleBlock.removeAttribute('style')
})
