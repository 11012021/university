// delete scroll to block after reload
window.addEventListener('load', () => {
  window.location.hash = '';
})

// Navigation buttons
let newsBtn = document.querySelectorAll('#news_btn');
let teachersBtn = document.querySelectorAll('#teachers_btn');
let scheduleBtn = document.querySelectorAll('#schedule_btn');

let teachersBlock = document.getElementById('teachersBlock')
let newsBlock = document.getElementById('newsBlock')
let scheduleBlock = document.getElementById('scheduleBlock')

newsBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    teachersBlock.setAttribute('style', 'display: none')
    scheduleBlock.setAttribute('style', 'display: none')
    newsBlock.removeAttribute('style')
  })
})

teachersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    newsBlock.setAttribute('style', 'display: none')
    scheduleBlock.setAttribute('style', 'display: none')
    teachersBlock.removeAttribute('style')
  })
})

scheduleBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    teachersBlock.setAttribute('style', 'display: none')
    newsBlock.setAttribute('style', 'display: none')
    scheduleBlock.removeAttribute('style')
  })
})

// Teachers page
let teachersBlockRow = document.querySelector('#teachersBlockRow');
let newsBlockRow = document.querySelector('#newsBlockRow')

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

function cardTemplate(firstname, lastname, work, imgURL) {
  return card = `
  <div class="col-lg-12 pl-md-5 pr-md-5 p-3">
    <div class="card-body bg-white rounded">
      <div class="d-flex flex-column align-items-center text-center">
        <img src="${imgURL}"
          alt="..." class="rounded-circle" width="150">
        <div class="mt-3">
          <h4>${firstname} ${lastname}</h4>
          <p class="mb-0">${work}</p>
          <button class="btn btn-danger" id="DELETEteacher">Удалить</button>
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
      newsBlockRow.insertAdjacentHTML('afterbegin', newsArray[i])
    }
  })