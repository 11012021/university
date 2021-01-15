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
function cardTemplate(firstname, lastname, work, imgURL) {
  return card = `
  <div class="card mt-4" id="${Date.now()}">
    <div class="card-body">
      <div class="d-flex flex-column align-items-center text-center">
        <img src="${imgURL}"
          alt="..." class="rounded-circle" width="150">
        <div class="mt-3">
          <h4>${firstname} ${lastname}</h4>
          <p class="text-secondary mb-3">${work}</p>
          <button class="btn btn-danger" id="DELETEteacher">Удалить</button>
          <button class="btn btn-primary m-2">Отзывы</button>
          <button class="btn btn-success">Редактировать</button>
        </div>
      </div>
    </div>
  </div>
`
}



let teacherBlock = document.querySelector('.teachers');

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
        let teachersArray = []
        json.results.forEach(item => {
            cardTemplate(item.firstname, item.lastname, item.age, item.typeofteacher, item.room, item.photo.url, '/html/profile.html')
            teachersArray.unshift(card)
        })
        for (let i = 0; i < teachersArray.length; i++) {
          teacherBlock.insertAdjacentHTML('beforeend', teachersArray[i])
        }
    })




























// on load draw teachers in main page
// for (let i = 0; i <= 10; i++) {
//   cardTemplate(i + 10, i + 100, 'Teacher', 'https://cutt.ly/sjcRGGs');
//   teachersBlock.insertAdjacentHTML('beforeend', card)
//   teachersBlock.lastElementChild.classList.add('mb-5')
// }

// CRUD Teachers
// let DELETEteacher = document.querySelectorAll('#DELETEteacher')
// let CREATEteacher = document.querySelector('#CREATEteacher')

// CREATE Teacher
// CREATEteacher.addEventListener('click', () => {
//   cardTemplate(prompt('Имя', 'qwerty'), prompt('Фамилия', '123'),
//     'Teacher', prompt('Фото', 'https://cutt.ly/sjcRGGs'));
//   teachersBlock.insertAdjacentHTML('beforeend', card)
//   teachersBlock.lastElementChild.classList.add('mb-5')
// })

// DELETE Teacher
// DELETEteacher.forEach(item => {
//   item.addEventListener('click', (e) => {
//     let teacherName = e.target.previousElementSibling.previousElementSibling.textContent;
//     let teachersBlockItem = e.target.parentElement.parentElement.parentElement.parentElement;

//     let ask = confirm('Вы действительно хотите удалить учителя?')
//     if (ask) {
//       teachersBlockItem.remove()
//       teachersBlock.lastElementChild.classList.add('mb-5')
//       alert(`Учитель ${teacherName} удалён!`)
//     }
//   })
// })





// PUT (update teachers data)
// fetch('https://parseapi.back4app.com/classes/teachers/C8doEph3UN', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     "X-Parse-Application-Id": 'rSH7h3XKubJC41kGP5HpR9ZZxk6rIBn4wH4OPxvn',
//     'X-Parse-REST-API-Key': ' w7OBKLeup2Cv965yIpsYJUzuIZw2dUPnc9yJWUbL'
//   },
//   body: JSON.stringify({
//     "Age": 2021
//   })
// })

// GET (show teachers data)
// fetch('https://parseapi.back4app.com/classes/teachers',
//   {
//     headers: {
//       'X-Parse-Application-Id': 'Sbmh1dqC6y29EhgLdXZsC0UfuG5Ij5LZqTXgmgWz',
//       'X-Parse-REST-API-Key': 'igRmoVIOsA7YH0O31rB3nSkrE7dxMLu0VVHa6rVy'
//     }
//   })
//   .then(response => response.json())
//   .then(json => {console.log(json.results);})
