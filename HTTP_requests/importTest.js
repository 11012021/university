import { API } from './api.js';

const get_btn = document.querySelector('.get')
const post_btn = document.querySelector('.post')
const put_btn = document.querySelector('.put')
const delete_btn = document.querySelector('.delete')

let lastUser;

get_btn.addEventListener('click', () => {
	API.get('https://parseapi.back4app.com/classes/teachers', res => {
		if(res != undefined){
			console.log('GET response:', res);
			lastUser = res[res.length - 1].objectId
			console.log('lastUserId:', lastUser);
		}else if(res == undefined){
			document.body.insertAdjacentHTML('beforeend', `
				<h1 style="color: red">response ${res} (проверь ограничения класса в back4app)</h1>
			`)
		}
	})
})

post_btn.addEventListener('click', () => {
	API.post('https://parseapi.back4app.com/classes/teachers',
		JSON.stringify({
			"firstname"			: " ",
			"lastname"			: " ",
			"patronymic"		: " ",
			"age"						: " ",
			"phonenumber"		: " ",
			"whatsnum"			: " ",
			"typeofteacher"	: " ",
			"email"					: " ",
			"room"					: " "
		})
	)
})

put_btn.addEventListener('click', () => {
	API.put('https://parseapi.back4app.com/classes/teachers', 'snO3WoovkC',
		JSON.stringify({
			"firstname": "NEWVALUE"
		})
	)
})

delete_btn.addEventListener('click', () => {
	API.get('https://parseapi.back4app.com/classes/teachers', res => { lastUser = res[res.length - 1].objectId })
	API.delete('https://parseapi.back4app.com/classes/teachers', lastUser)
})