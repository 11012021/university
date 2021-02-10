import { API } from './api.js';

const get_btn = document.querySelector('.get')
const post_btn = document.querySelector('.post')
const put_btn = document.querySelector('.put')
const delete_btn = document.querySelector('.delete')

let lastUser;

get_btn.addEventListener('click', () => {
    API.get('https://parseapi.back4app.com/classes/teachers', res => {
        console.log('GET response:', res);

        // 17 строка кода находит АЙДИ ПОСЛЕДНЕГО ЮЗЕРА для DELETE запроса 
        // (который удаляет последнего юзера по умолчанию)

        lastUser = res[res.length - 1].objectId
        console.log('lastUserId:', lastUser);
    })
})

post_btn.addEventListener('click', () => {
    API.post('https://parseapi.back4app.com/classes/teachers',
        {
            "firstname"     : "",
            "lastname"      : "",
            "patronymic"    : "",
            "age"           : "",
            "phonenumber"   : "",
            "whatsnum"      : "",
            "typeofteacher" : "",
            "email"         : "",
            "room"          : ""
        }
    )
})

put_btn.addEventListener('click', () => {
    // АЙДИ ПЕРВОГО ЮЗЕРА === 'snO3WoovkC'
    API.put('https://parseapi.back4app.com/classes/teachers', 'snO3WoovkC',
        JSON.stringify({
            "firstname": "NEWVALUE"
        })
    )
})

delete_btn.addEventListener('click', () => {
    API.get('https://parseapi.back4app.com/classes/teachers', res => {lastUser = res[res.length - 1].objectId})
    API.delete('https://parseapi.back4app.com/classes/teachers', lastUser)
})