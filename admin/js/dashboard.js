import { API } from '../../HTTP_requests/api.js';


// delete URL#...
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
// Navigation buttons


// RERENDER PAGE
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
          <img src="${imgURL}"
            alt="..." class="rounded-circle" width="150">
          <div class="mt-3">
            <h4>${firstname} ${lastname} ${patronymic}</h4>
            <p class="mb-0">${work}</p>
            <button class="btn btn-danger" id="DELETEteacher">Удалить</button>
            <button class="btn btn-success" id="UPDATEteacher">Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  `
}
// TEACHERS CARD TEMPLATE


// MODAL WINDOW CHANGE INPUTS
const changeLastName = document.querySelector('#changeLastName')
const changeFirstName = document.querySelector('#changeFirstName')
const changePatronymic = document.querySelector('#changePatronymic')
const changeLesson = document.querySelector('#changeLesson')
const changeAge = document.querySelector('#changeAge')
const changeRoom = document.querySelector('#changeRoom')
const changeTel = document.querySelector('#changeTel')
const changeWAppNumber = document.querySelector('#changeWAppNumber')
const changeEmail = document.querySelector('#changeEmail')
const changeAvatar = document.querySelector('#changeAvatar')
const updateBtn = document.querySelector('#update')
// MODAL WINDOW CHANGE INPUTS


// API GET, APPEND TEACHERS AND MODAL DATA
API.get('https://parseapi.back4app.com/classes/teachers', res => {
  let arr = []
  let objId = []
  res.forEach(item => {
    objId.push(item.objectId)
    cardTemplateTeachers(item.firstname, item.lastname, item.patronymic, item.typeofteacher, item.photo.url)
    arr.unshift(teacherCard)
  })

  arr.forEach(elem => {
    teachersBlockRow.insertAdjacentHTML('afterbegin', elem)
  })

  let modal = document.querySelector('.modal')
  let updateTchrsBtns = document.querySelectorAll('#UPDATEteacher');

  updateTchrsBtns.forEach((btn, index) => {
    btn.setAttribute('data-target', `#${objId[index]}`)
    btn.setAttribute('data-toggle', 'modal')

    btn.addEventListener('click', () => {
      let FIO = changeLastName.previousElementSibling.previousElementSibling;
      let LESSON = changeLesson.previousElementSibling
      let AGE = changeAge.previousElementSibling
      let ROOM = changeRoom.previousElementSibling
      let TEL = changeTel.previousElementSibling
      let WAPP = changeWAppNumber.previousElementSibling
      let AVATAR = changeAvatar.parentElement.previousElementSibling
      let EMAIL = changeEmail.previousElementSibling

      modal.id = objId[index]
      res.forEach(item => {
        if (objId[index] == item.objectId) {
          FIO.value = `${item.lastname} ${item.firstname} ${item.patronymic}`
          LESSON.value = item.typeofteacher
          AGE.value = item.age
          ROOM.value = item.room
          TEL.value = item.phonenumber
          WAPP.value = item.whatsnum
          EMAIL.value = item.email
          AVATAR.setAttribute('src', item.photo.url)
        }
      })
    })
  })
})
// API GET, APPEND TEACHERS AND MODAL DATA
// Teachers page


// API PUT MODAL
API.get('https://parseapi.back4app.com/classes/teachers', res => {
  updateBtn.addEventListener('click', (e) => {
    API.put('https://parseapi.back4app.com/classes/teachers', e.target.parentElement.parentElement.parentElement.parentElement.id,
      JSON.stringify({
        "firstname": changeFirstName.value != '' ? changeFirstName.value : ' ',
        "lastname": changeLastName.value != '' ? changeLastName.value : ' ',
        "patronymic": changePatronymic.value != '' ? changePatronymic.value : ' ',
        "age": changeAge.value != '' ? changeAge.value : ' ',
        "email": changeEmail.value != '' ? changeEmail.value : ' ',
        "typeofteacher": changeLesson.value != '' ? changeLesson.value : ' ',
        "room": changeRoom.value != '' ? changeRoom.value : ' ',
        "phonenumber": changePatronymic.value != '' ? changePatronymic.value : ' ',
        "whatsnum": changeWAppNumber.value != '' ? changeWAppNumber.value : ' '

        // "photo"         : new FormData(changeAvatar.parentElement)

        // "photo": { "__type": "File", "name": changeAvatar.split(' ').join(' ') }
      })
    )
    confirm('Обновления вступят в силу после перезагрузки страницы.')
  })
})
// API PUT MODAL


// API DELETE
API.get('https://parseapi.back4app.com/classes/teachers', res => {
  let delTchrBtns = document.querySelectorAll('#DELETEteacher');
  delTchrBtns.forEach((btn, index) => {
    btn.addEventListener('click', e => {
      let warn = prompt('Ввеите "УДАЛИТЬ" для подтверждения действия!')
      if (warn == "УДАЛИТЬ") {
        API.delete('https://parseapi.back4app.com/classes/teachers', (res[index].objectId).split(' ').join(' '))
        e.target.parentElement.parentElement.parentElement.parentElement.remove()
      }
    })
  })
})
// API DELETE


// MODAL WINDOW CREATE INPUTS
const createLastName = document.querySelector('#createLastName')
const createFirstName = document.querySelector('#createFirstName')
const createPatronymic = document.querySelector('#createPatronymic')
const createLesson = document.querySelector('#createLesson')
const createAge = document.querySelector('#createAge')
const createRoom = document.querySelector('#createRoom')
const createTel = document.querySelector('#createTel')
const createWAppNumber = document.querySelector('#createWAppNumber')
const createEmail = document.querySelector('#createEmail')
// const createAvatar = document.querySelector('#createAvatar')
const createBtn = document.querySelector('#create')
// MODAL WINDOW CREATE INPUTS


// API POST
createBtn.addEventListener('click', () => {
  console.log(createFirstName.value);
  API.post('https://parseapi.back4app.com/classes/teachers',
    JSON.stringify({
      "firstname": createFirstName.value != '' ? createFirstName.value : ' ',
      "lastname": createLastName.value != '' ? createLastName.value : ' ',
      "patronymic": createPatronymic.value != '' ? createPatronymic.value : ' ',
      "age": createAge.value != '' ? createAge.value : ' ',
      "phonenumber": createTel.value != '' ? createTel.value : ' ',
      "whatsnum": createWAppNumber.value != '' ? createWAppNumber.value : ' ',
      "typeofteacher": createLesson.value != '' ? createLesson.value : ' ',
      "email": createEmail.value != '' ? createEmail.value : ' ',
      "room": createRoom.value != '' ? createRoom.value : ' '
    })
  )
  confirm('Обновления вступят в силу после перезагрузки страницы.')
})
// API POST


// NEWS
let newsCard = ''
let newsBlockRow = document.querySelector('#newsBlockRow')

function cardTemplateNews(title, body, date) {
  newsCard = `
    <div class="col-md-6 p-3">
        <div class="p-3" style="background-color: rgba(255, 255, 255, 0.75); border-radius: 10px;">
            <h4><b>${title}</b></h4>
            <p>${body}</p>
            <div class='d-lg-flex justify-content-between align-items-end border-0'>
              <p class='mb-0'><b>Дата: ${date}</b></p>
              <button class="btn btn-outline-primary">Подробнее</button>
            </div>
        </div>
    </div>
  `
}

API.get('https://parseapi.back4app.com/classes/news', res => {
  res.forEach((item) => {
    let date = new Date(item.createdAt).toLocaleString()
    cardTemplateNews(item.title, item.body, date)
    newsBlockRow.insertAdjacentHTML('afterbegin', newsCard)
  })
})