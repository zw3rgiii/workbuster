window.addEventListener('scroll', function(){
    var nav = document.querySelector('nav');
    nav.classList.toggle('black', window.scrollY > 0)
})
        
function enterHamburger(){
    var nav = document.querySelector('.logo');
    var menu = document.querySelector('.hamburger-menu');

    nav.classList.toggle("nav-hamburger-opened");
    menu.classList.toggle("menu-hamburger-opened");

    nav.classList.toggle("nav-hamburger-closed");
    menu.classList.toggle("menu-hamburger-closed");
}