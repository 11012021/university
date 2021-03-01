import { API } from '../../HTTP_requests/api.js';


// Navigation buttons
let newsBtn       = document.querySelectorAll('#news_btn');
let teachersBtn   = document.querySelectorAll('#teachers_btn');
let scheduleBtn   = document.querySelectorAll('#schedule_btn');

let teachersBlock = document.getElementById('teachersBlock')
let newsBlock     = document.getElementById('newsBlock')
let scheduleBlock = document.getElementById('scheduleBlock')
// Navigation buttons


// LOAD PAGES STATE
window.addEventListener('load', () => {
  window.location.hash = '';

  if (localStorage.getItem('newsPageState') == 'null') {
    newsBtn.forEach(() => {
      teachersBlock.setAttribute    ('style', localStorage.getItem('teachersPageState').slice(1, -1))
      scheduleBlock.setAttribute    ('style', localStorage.getItem('schedulePageState').slice(1, -1))
      newsBlock.removeAttribute     ('style')
    })
  } else if (localStorage.getItem('teachersPageState') == 'null') {
    teachersBtn.forEach(() => {
      newsBlock.setAttribute        ('style', localStorage.getItem('newsPageState').slice(1, -1))
      scheduleBlock.setAttribute    ('style', localStorage.getItem('schedulePageState').slice(1, -1))
      teachersBlock.removeAttribute ('style')
    })
  } else if (localStorage.getItem('schedulePageState') == 'null') {
    scheduleBtn.forEach(() => {
      teachersBlock.setAttribute    ('style', localStorage.getItem('teachersPageState').slice(1, -1))
      newsBlock.setAttribute        ('style', localStorage.getItem('newsPageState').slice(1, -1))
      scheduleBlock.removeAttribute ('style')
    })
  }
})
// LOAD PAGES STATE


// RERENDER PAGE
newsBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    teachersBlock.setAttribute('style', 'display: none')
    scheduleBlock.setAttribute('style', 'display: none')
    newsBlock.removeAttribute ('style')

    localStorage.setItem('newsPageState',     JSON.stringify(newsBlock.getAttribute('style')))
    localStorage.setItem('teachersPageState', JSON.stringify(teachersBlock.getAttribute('style')))
    localStorage.setItem('schedulePageState', JSON.stringify(scheduleBlock.getAttribute('style')))
  })
})

teachersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    newsBlock.setAttribute        ('style', 'display: none')
    scheduleBlock.setAttribute    ('style', 'display: none')
    teachersBlock.removeAttribute ('style')

    localStorage.setItem('newsPageState',     JSON.stringify(newsBlock.getAttribute('style')))
    localStorage.setItem('teachersPageState', JSON.stringify(teachersBlock.getAttribute('style')))
    localStorage.setItem('schedulePageState', JSON.stringify(scheduleBlock.getAttribute('style')))
  })
})

scheduleBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    teachersBlock.setAttribute    ('style', 'display: none')
    newsBlock.setAttribute        ('style', 'display: none')
    scheduleBlock.removeAttribute ('style')

    localStorage.setItem('newsPageState',     JSON.stringify(newsBlock.getAttribute('style')))
    localStorage.setItem('teachersPageState', JSON.stringify(teachersBlock.getAttribute('style')))
    localStorage.setItem('schedulePageState', JSON.stringify(scheduleBlock.getAttribute('style')))
  })
})
// RERENDER PAGE


// Teachers page
// TEACHERS CARD TEMPLATE
let teacherCard = ''
let teachersBlockRow = document.querySelector('#teachersBlockRow');

function cardTemplateTeachers(firstname, lastname, patronymic, work, imgURL) {
  teacherCard = `
    <div class="col-lg-12 pl-md-5 pr-md-5 p-3">
      <div class="card-body bg-white rounded">
        <div class="d-flex flex-column align-items-center text-center">
          <img src="${imgURL}" alt="..." class="rounded-circle" width="150">
          <div class="mt-3">
            <h4>${lastname} ${firstname} ${patronymic}</h4>
            <p class="mb-0">Преподаваемый урок: ${work}</p>
            <button class="btn btn-success" id="UPDATEteacher">Подробнее</button>
            <button class="btn btn-danger" id="DELETEteacher">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  `
}
// TEACHERS CARD TEMPLATE


// MODAL WINDOW CHANGE INPUTS
const changeLastName    = document.querySelector('#changeLastName')
const changeFirstName   = document.querySelector('#changeFirstName')
const changePatronymic  = document.querySelector('#changePatronymic')
const changeLesson      = document.querySelector('#changeLesson')
const changeAge         = document.querySelector('#changeAge')
const changeRoom        = document.querySelector('#changeRoom')
const changeTel         = document.querySelector('#changeTel')
const changeWAppNumber  = document.querySelector('#changeWAppNumber')
const changeEmail       = document.querySelector('#changeEmail')
const changeAvatar      = document.querySelector('#changeAvatar')
const updateBtn         = document.querySelector('#update')
// MODAL WINDOW CHANGE INPUTS


// API GET, APPEND TEACHERS AND MODAL DATA
API.get('https://parseapi.back4app.com/classes/teachers', res => {
  let arr = []
  let objId = []

  res.forEach(item => {
    objId.unshift(item.objectId)
    cardTemplateTeachers(item.firstname, item.lastname, item.patronymic, item.typeofteacher, item.photo.url)
    arr.push(teacherCard)
  })

  arr.forEach(elem => {
    teachersBlockRow.insertAdjacentHTML('afterbegin', elem)
  })

  let modal           = document.querySelector('#teacherModal')
  let updateTchrsBtns = document.querySelectorAll('#UPDATEteacher');

  updateTchrsBtns.forEach((btn, index) => {
    btn.setAttribute('data-target', `#${objId[index]}`)
    btn.setAttribute('data-toggle', 'modal')

    btn.addEventListener('click', () => {
      let FIO     = changeLastName.previousElementSibling.previousElementSibling;
      let LESSON  = changeLesson.previousElementSibling
      let AGE     = changeAge.previousElementSibling
      let ROOM    = changeRoom.previousElementSibling
      let TEL     = changeTel.previousElementSibling
      let WAPP    = changeWAppNumber.previousElementSibling
      let AVATAR  = changeAvatar.parentElement.previousElementSibling
      let EMAIL   = changeEmail.previousElementSibling

      modal.id = objId[index]
      res.forEach(item => {
        if (objId[index] == item.objectId) {
          FIO.value       = `${item.lastname} ${item.firstname} ${item.patronymic}`
          LESSON.value    = item.typeofteacher
          AGE.value       = item.age
          ROOM.value      = item.room
          TEL.value       = item.phonenumber
          WAPP.value      = item.whatsnum
          EMAIL.value     = item.email
          AVATAR.setAttribute('src', item.photo.url)
        }
      })
    })
  })
})
// API GET, APPEND TEACHERS AND MODAL DATA
// Teachers page


// API PUT MODAL TEACHERS
API.get('https://parseapi.back4app.com/classes/teachers', res => {
  res.forEach(item => {
    updateBtn.addEventListener('click', (e) => {
      if (item.objectId == e.target.parentElement.parentElement.parentElement.parentElement.id) {
        API.put('https://parseapi.back4app.com/classes/teachers', item.objectId,
          JSON.stringify({
            "firstname"     : changeFirstName.value != '' ? changeFirstName.value : item.firstname,
            "lastname"      : changeLastName.value != '' ? changeLastName.value : item.lastname,
            "patronymic"    : changePatronymic.value != '' ? changePatronymic.value : item.patronymic,
            "age"           : createAge.value < 0 ? confirm('Ошибка ввода в поле "Возраст"!') : createAge.value != '' ? createAge.value : item.age,
            "email"         : changeEmail.value != '' ? changeEmail.value : item.email,
            "typeofteacher" : changeLesson.value != '' ? changeLesson.value : item.typeofteacher,
            "room"          : createRoom.value < 0 ? confirm('Ошибка ввода в поле "Кабинет"!') : createRoom.value != '' ? createRoom.value : item.room,
            "phonenumber"   : changeTel.value != '' ? changeTel.value : item.phonenumber,
            "whatsnum"      : changeWAppNumber.value != '' ? changeWAppNumber.value : item.whatsnum

            // "photo"         : new FormData(changeAvatar.parentElement)
            // "photo": { "__type": "File", "name": changeAvatar.split(' ').join(' ') }
          })
        )
        window.location.reload()
      }
    })
  })
})
// API PUT MODAL TEACHERS


// API DELETE TEACHERS
API.get('https://parseapi.back4app.com/classes/teachers', res => {
  let delTchrBtns = document.querySelectorAll('#DELETEteacher');
  delTchrBtns.forEach((btn, index) => {
    btn.addEventListener('click', e => {
      let warn = prompt('Ввеите "УДАЛИТЬ" для подтверждения действия!')
      if (warn == "УДАЛИТЬ") {
        API.delete('https://parseapi.back4app.com/classes/teachers', res[index].objectId)
        e.target.parentElement.parentElement.parentElement.parentElement.remove()
        confirm('Удалено!')
      } else { confirm('Отменено!') }
    })
  })
})
// API DELETE TEACHERS


// MODAL WINDOW CREATE INPUTS
const createLastName    = document.querySelector('#createLastName')
const createFirstName   = document.querySelector('#createFirstName')
const createPatronymic  = document.querySelector('#createPatronymic')
const createLesson      = document.querySelector('#createLesson')
const createAge         = document.querySelector('#createAge')
const createRoom        = document.querySelector('#createRoom')
const createTel         = document.querySelector('#createTel')
const createWAppNumber  = document.querySelector('#createWAppNumber')
const createEmail       = document.querySelector('#createEmail')
const createBtn         = document.querySelector('#create')
// const createAvatar   = document.querySelector('#createAvatar')

// MODAL WINDOW CREATE INPUTS


// API POST
createBtn.addEventListener('click', () => {
  API.post('https://parseapi.back4app.com/classes/teachers',
    JSON.stringify({
      "firstname"     : createFirstName.value != '' ? createFirstName.value : ' ',
      "lastname"      : createLastName.value != '' ? createLastName.value : ' ',
      "patronymic"    : createPatronymic.value != '' ? createPatronymic.value : ' ',
      "age"           : createAge.value < 0 ? confirm('Ошибка ввода в поле "Возраст"!') : createAge.value != '' ? createAge.value : ' ',
      "room"          : createRoom.value < 0 ? confirm('Ошибка ввода в поле "Кабинет"!') : createRoom.value != '' ? createRoom.value : ' ',
      "phonenumber"   : createTel.value != '' ? createTel.value : ' ',
      "whatsnum"      : createWAppNumber.value != '' ? createWAppNumber.value : ' ',
      "typeofteacher" : createLesson.value != '' ? createLesson.value : ' ',
      "email"         : createEmail.value != '' ? createEmail.value : ' '
    })
  )
  window.location.reload()
})
// API POST


// NEWS
let newsCard      = ''
let newsBlockRow  = document.querySelector('#newsBlockRow')
{/* <button class="btn btn-primary" data-target="#newsModalBtn" data-toggle="modal">Новость</button> */ }

// READ NEWS
function cardTemplateNews(title, body, date) {
  newsCard = `
    <div class="col-md-6 p-3">
      <div class="p-3" style="background-color: rgba(255, 255, 255, 0.75); border-radius: 10px;">
        <h4><b>${title}</b></h4>
        <p>${body}</p>
        <div class='d-lg-flex justify-content-between align-items-end border-0'>
          <p class='mb-0'><b>Дата: ${date}</b></p>
          <button class="btn btn-outline-primary" id="newsModalBtn">Подробнее</button>
        </div>
      </div>
    </div>
  `
}


let changeNewsTitle   = document.querySelector('#changeNewsTitle')
let changeNewsPlchldr = document.querySelector('#changeNewsPlchldr')
API.get('https://parseapi.back4app.com/classes/news', res => {
  let newsModal         = document.querySelector('#newsModal')
  let idArray           = []

  res.forEach((item) => {
    idArray.unshift(item.objectId)
    let date = new Date(item.createdAt).toLocaleDateString()
    cardTemplateNews(item.title, item.body, date)
    newsBlockRow.insertAdjacentHTML('afterbegin', newsCard)
  })

  let newsModalBtn = document.querySelectorAll('#newsModalBtn')

  newsModalBtn.forEach((btn, index) => {
    btn.setAttribute('data-target', `#${idArray[index]}`)
    btn.setAttribute('data-toggle', 'modal')
    btn.addEventListener('click', () => {
      newsModal.id  = idArray[index]

      let TITLE     = changeNewsTitle.previousElementSibling
      let TEXTAREA  = changeNewsPlchldr.previousElementSibling

      res.forEach(item => {
        if (idArray[index] == item.objectId) {
          TITLE.value       = item.title
          TEXTAREA.value    = item.body
        }
      })
    })
  })
})
// READ NEWS


// UPDATE NEWS
let updateNews = document.querySelector('#updateNews')
let newsModal  = document.querySelector('#newsModal')
API.get('https://parseapi.back4app.com/classes/news', res => {
  res.forEach(item => {
    updateNews.addEventListener('click', () => {
      if (item.objectId == newsModal.id) {
        API.put('https://parseapi.back4app.com/classes/news', item.objectId,
          JSON.stringify({
            "title" : changeNewsTitle.value != '' ? changeNewsTitle.value : item.title,
            "body"  : changeNewsPlchldr.value != '' ? changeNewsPlchldr.value : item.body
          })
        )
        // window.location.reload()
      }
    })
  })
})
// UPDATE NEWS


// API DELETE NEWS
API.get('https://parseapi.back4app.com/classes/news', res => {
  let delNews = document.querySelectorAll('#delNews');
  delNews.forEach((btn, index) => {
    btn.addEventListener('click', e => {
      console.log(e.target);
      let warn = prompt('Ввеите "УДАЛИТЬ" для подтверждения действия!')
      if (warn == "УДАЛИТЬ") {
        console.log(res[index].objectId);
        API.delete('https://parseapi.back4app.com/classes/news', res[index].objectId)
        // e.target.parentElement.parentElement.parentElement.parentElement.remove()
        confirm('Удалено!')
        window.location.reload()
      } else { confirm('Отменено!') }
    })
  })
})
// API DELETE NEWS


// API CREATE NEWS
let createNews = document.querySelector('#createNews')
createNews.addEventListener('click', () => {
  API.post('https://parseapi.back4app.com/classes/news',
    JSON.stringify({
      "title"     : changeNewsTitle.value != '' ? changeNewsTitle.value : ' ',
      "body"      : changeNewsPlchldr.value != '' ? changeNewsPlchldr.value : ' '
    })
  )
  window.location.reload()
})
// API CREATE NEWS