let burger = document.querySelector('.header__burger');
let dropMenu = document.querySelector('.header__drop-menu');

burger.addEventListener('click', function(ev) {
    if(burger.classList.contains('active')) {
        burger.classList.remove('active');
        dropMenu.style.display = 'none';
        console.log(ev);
    }
    else {
        burger.classList.add('active');
        dropMenu.style.display = 'block';
    }

})

// по кліку поза областю випадаючого вікна випадаюче вікно закриється
document.addEventListener('click', function(ev) {
    if (!ev.target.closest(".header__drop-menu") && !ev.target.closest(".header__burger")) {
        burger.classList.remove('active');
        dropMenu.style.display = 'none';
    }
})