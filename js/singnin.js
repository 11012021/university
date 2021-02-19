// const button_send = document.querySelector('.button_send');
// const input_e = document.querySelector(".input");
// const input_p = document.querySelector('.pass');


// button_send.addEventListener('click', ()=>{
//     if(input_e.value == true){
//         console.log(input_e);
//     }
// })


// LOADER
let page = document.querySelectorAll('.page');
let loader = document.querySelector('#loader');
page.forEach(item => { item.classList.add('onload') })
loader.classList.add('loader')

window.addEventListener('load', () => {
	page.forEach(item => { item.classList.remove('onload') })
	loader.classList.remove('loader')
	loader.setAttribute('style', 'display: none')
})
