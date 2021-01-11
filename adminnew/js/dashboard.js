// Navigation buttons
let newsBtn = document.getElementById('news_btn');
let teachersBtn = document.getElementById('teachers_btn');
let scheduleBtn = document.getElementById('schedule_btn');

let teachersBlock = document.getElementById('teachersBlock')
let newsBlock = document.getElementById('newsBlock')
let scheduleBlock = document.getElementById('scheduleBlock')

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

// Teachers page
function cardTemplate(firstname, lastname, work, imgURL) {
  return card = `
<div class="card mt-4" id="${Date.now()}">
<div class="card-body">
  <div class="d-flex flex-column align-items-center text-center">
    <img src="${imgURL}"
      alt="Admin" class="rounded-circle" width="150">
    <div class="mt-3">
      <h4>${firstname} ${lastname}</h4>
      <p class="text-secondary mb-3">${work}</p>
      <button class="btn btn-outline-danger" id="DELETEteacher">Удалить</button>
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
  cardTemplate( i+10, i+100, 'Teacher', 'https://cutt.ly/sjcRGGs');
  teachersBlock.insertAdjacentHTML('afterbegin', card)
}
teachersBlock.lastElementChild.classList.add('mb-5')

// CRUD Teachers
let DELETEteacher = document.querySelectorAll('#DELETEteacher')

// DELETE Teacher
DELETEteacher.forEach(item => {
  item.addEventListener('click', (e) => {
    let teacherName = e.target.previousElementSibling.previousElementSibling.textContent;
    let teachersBlockItem = e.target.parentElement.parentElement.parentElement.parentElement;
    
    let ask = confirm('Вы действительно хотите удалить учителя?')
    if (ask) {
      teachersBlockItem.remove()
      teachersBlock.lastElementChild.classList.add('mb-5')
      alert(`Учитель ${teacherName} удалён!`)
    }
  })
})
