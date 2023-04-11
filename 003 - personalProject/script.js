const year = document.getElementById("year");
const tall = document.getElementById("tall");
const sleep = document.getElementById("sleep");
const weight = document.getElementById("weight");
const buton = document.getElementById("buton");
const endType = document.getElementById("endType");
const strength = document.getElementById("strength");
const typeDescriptino = document.getElementById("typeDescriptino");
let type = -1;
const types = ["Rounty","Acronus","Barneth","Launter"];
const typeDescriptinos = [
    "Rounties possess the ability to move objects, both laterally and vertically, but not at the same time. They can also create electricity from their fingertips, enough to light small fires.",
    "Acronuses are able to create golems, animated objects with simple intelligence. They also are able to grow plants at will, but not out of thin air.",
    "Barneths are able to control the surface tension of liquids. This lets them walk on water, but only if they keep moving. They can also control the nitrogen molecules in the air, but only subconsiously.",
    "Launters possess the uncanny ability to change their appearance, but not drastically. If they are strong enough, they can also transform small animals into other animals, and also set them on fire."
];

function CalculateEurchidth(year,height,sleep,weight){
    let score = 0;
    let strength = 0;
    score += Math.sin(year/200)*2+2;
    score += Math.sin(height-5)*2+2;
    score += Math.sin(sleep*8)*2+2;
    score += Math.sin(weight*4)*2+2;
    console.log(score/4-1);
    return (score/4-1);
}

buton.addEventListener("click",e=>{
    e.preventDefault();
    type = CalculateEurchidth(year.value,tall.value,sleep.value,weight.value);
    endType.textContent = types[Math.round(type)];
    strength.textContent = ` Strength: ${Math.trunc((type-Math.trunc(type))*100)}f`;
    typeDescriptino.textContent = typeDescriptinos[Math.round(type)];
})