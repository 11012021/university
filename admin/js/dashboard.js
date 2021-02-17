import { API } from '../../HTTP_requests/api.js';


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

function cardTemplateTeachers(firstname, lastname, work, imgURL) {
  teacherCard = `
    <div class="col-lg-12 pl-md-5 pr-md-5 p-3">
      <div class="card-body bg-white rounded">
        <div class="d-flex flex-column align-items-center text-center">
          <img src="${imgURL}"
            alt="..." class="rounded-circle" width="150">
          <div class="mt-3">
            <h4>${firstname} ${lastname}</h4>
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


// MODAL WINDOW INPUTS
const changeLastName = document.querySelector('#changeLastName')
changeLastName.addEventListener('input', () => {
  console.log(changeLastName.value);
  console.log(typeof (changeLastName));
})
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

// MODAL WINDOW INPUTS

// API GET, APPEND TEACHERS AND MODAL DATA
API.get('https://parseapi.back4app.com/classes/teachers', res => {
  let arr = []
  let objId = []
  res.forEach(item => {
    objId.push(item.objectId)
    cardTemplateTeachers(item.firstname, item.lastname, item.typeofteacher, item.photo.url)
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
      console.log(FIO);
      let LESSON = changeLesson.previousElementSibling
      let AGE = changeAge.previousElementSibling
      let ROOM = changeRoom.previousElementSibling
      let TEL = changeTel.previousElementSibling
      let WAPP = changeWAppNumber.previousElementSibling
      let AVATAR = changeAvatar.parentElement.previousElementSibling
      let EMAIL = changeEmail.previousElementSibling

      modal.id = objId[index]
      console.log(objId[index]);
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
updateBtn.addEventListener('click', () => {
  API.put('https://parseapi.back4app.com/classes/teachers', 'mJBRnw7fHX',
    JSON.stringify(
      {
        "firstname": `${changeFirstName}`,
        "lastname": `${changeLastName}`,
        "patronymic": `${changePatronymic}`,
        "age": `${changeAge}`,
        "email": `${changeEmail}`,
        "typeofteacher": `${changeLesson}`,
        "room": `${changeRoom}`,
        "phonenum": `${changePatronymic}`,
        "whatsnum": `${changeWAppNumber}`,
        "photo": { "__type": "File", "name": `${changeAvatar}` }
      }
    )
  )
})
// API PUT MODAL


// API DELETE
let deleteTchrBtns = document.querySelectorAll('#DELETEteacher');
deleteTchrBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('click');
    let warn = prompt('Ввеите "УДАЛИТЬ" для подтверждения')
    warn == "УДАЛИТЬ" ? API.delete('https://parseapi.back4app.com/classes/teachers', 'mJBRnw7fHX') : ''
  })
})
// API DELETE

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