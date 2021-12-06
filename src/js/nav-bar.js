window.addEventListener('scroll', function(){
    var nav = document.querySelector('nav');
    nav.classList.toggle('black', window.scrollY > 0)
})
        
function enterHamburger(){
    console.log("TEST");
}

function leaveHamburger(){
    
}