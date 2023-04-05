let menuBtn = document.getElementById("menu-btn");
let header = document.getElementById("header");

let butte = document.getElementById("butte");
let thx = document.getElementById("thx");
let form = document.getElementById("form");

butte.addEventListener("click",e=>{
    e.preventDefault();
    thx.classList.toggle("form-hidden");
    form.classList.toggle("form-hidden");
})

menuBtn.addEventListener("click", ()=>{
    header.classList.toggle("nav-open");
    
});
document.addEventListener("scroll",(e)=>{
    //console.log(e);
    let y = window.scrollY;
    // console.log(y);
    header.style.transform = `TranslateY(${y}px)`;
});