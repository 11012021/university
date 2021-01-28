// delete scroll to block after reload
window.addEventListener('load', () => {
  window.location.hash = '';
})

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
let teachersBlockRow = document.querySelector('#teachersBlockRow');

function cardTemplate(firstname, lastname, work, imgURL) {
  return card = `
  <div class="col-lg-12 pl-lg-5 pr-lg-5 p-3">
    <div class="card-body bg-white rounded">
      <div class="d-flex flex-column align-items-center text-center">
        <img src="${imgURL}"
          alt="..." class="rounded-circle" width="150">
        <div class="mt-3">
          <h4>${firstname} ${lastname}</h4>
          <p class="text-secondary mb-0">${work}</p>
          <button class="btn btn-danger" id="DELETEteacher">Удалить</button>
          <button class="btn btn-primary">Подробнее</button>
          <button class="btn btn-success">Редактировать</button>
        </div>
      </div>
    </div>
  </div>
`
}

//GET
fetch('https://parseapi.back4app.com/classes/teachers',
  {
    headers: {
      'X-Parse-Application-Id': 'Sbmh1dqC6y29EhgLdXZsC0UfuG5Ij5LZqTXgmgWz',
      'X-Parse-REST-API-Key': 'igRmoVIOsA7YH0O31rB3nSkrE7dxMLu0VVHa6rVy'
    }
  })
  .then(response => response.json())
  .then(json => {
    json.results.forEach(item => {
      cardTemplate(item.firstname, item.lastname, item.typeofteacher, item.photo.url)
      teachersBlockRow.insertAdjacentHTML('beforeend', card)
    })
  })