function callAPI() {
	const ApplicationID = 'OCFWE5r3xskeuQpVGhoKINmNi8w9qN1BO0JBL4VU',
		ApiKey = 'mUi85dEsMS5B4A6cw5kRVgDlC1WmsMbu8XQv61CP';

	return {
		get: function (URL, func) {
			fetch(URL,
				{
					headers: {
						'X-Parse-Application-Id': ApplicationID,
						'X-Parse-REST-API-Key': ApiKey,
						'Content-Type': 'application/json'
					}, redirect: 'follow'
				})
				.then(response => response.json())
				.then(res => func(res.results))
				.catch(error => console.log('error', error));
		},

		post: function (URL, body) {
			fetch(URL,
				{
					method: 'POST',
					headers: {
						'X-Parse-Application-Id': ApplicationID,
						'X-Parse-REST-API-Key': ApiKey,
						'Content-Type': 'application/json'
					}, body, redirect: 'follow'
				})
				.then(response => response.json())
				.then(res => console.log('POST response:', res))
				.catch(error => console.log('error', error));
		},

		put: function (URL, UID, body) {
			fetch(URL + `/${UID}`,
				{
					method: 'PUT',
					headers: {
						'X-Parse-Application-Id': ApplicationID,
						'X-Parse-REST-API-Key': ApiKey,
						'Content-Type': 'application/json'
					}, body, redirect: 'follow'
				})
				.then(response => response.json())
				.then(res => console.log('PUT response:', res))
				.catch(error => console.log('error', error));
		},

		delete: function (URL, UID) {
			fetch(URL + `/${UID}`,
				{
					method: "DELETE",
					headers: {
						'X-Parse-Application-Id': ApplicationID,
						'X-Parse-REST-API-Key': ApiKey,
						'Content-Type': 'application/json'
					}
				})
				.then(response => response.json())
				.then(res => console.log('DELETE response:', res))
				.catch(error => console.log('error', error));
		}
	}
}

// https://parseapi.back4app.com/classes/teachers
// https://parseapi.back4app.com/classes/news

// API.get('https://parseapi.back4app.com/classes/teachers', res => {
//     console.log(res);
// })

// API.post('https://parseapi.back4app.com/classes/teachers',
//     {
//         "firstname"     : "",
//         "lastname"      : "",
//         "patronymic"    : "",
//         "age"           : "",
//         "phonenumber"   : "",
//         "whatsnum"      : "",
//         "typeofteacher" : "",
//         "email"         : "",
//         "room"          : ""
//     }
// )

// put_btn.addEventListener('click', () => {
//     API.put(`https://parseapi.back4app.com/classes/teachers`, 'UID',
//         JSON.stringify({ 
//             "firstname": "ELMURAT_NEW" 
//         })
//     )
// })

// API.delete('https://parseapi.back4app.com/classes/teachers', 'UID')

let API = callAPI()
export { API }