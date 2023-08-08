// Tic tac toe games are an array on numbers 0, 1, or 2.
// [0,0,0,1,1,2,0,0,2]
// is the same as
//  | |
// X|X|O
//  | |O

//   They are stored as an object like:
// {
//     name:"Test",
//     game:"TIC",
//     players:[
//         "HERO413",
//         "Mr.TUBLAR"
//     ],
//     status:[
//         0,1,2,1,2,2,1,0,0
//     ],
//     turn:0,
//     complete:false
// }

//  Functions I need:

// Evaluator - Server side
// Update - Client side
// Automatic refresh -  Client side 
// Input - Client side
//

let Game = {
    name:"0",
    game:"0",
    players:[
        "0",
        "1"
    ],
    status:[
        0,0,0,0,0,0,0,0,0
    ],
    turn:0,
    complete:false
};

let gameId = -1;

let user = "";
let token = "";

function loadLocalData () {
    user = localStorage.getItem("user");
    token = localStorage.getItem("token");
}
function addSymbol (where) {
    console.log("Addsymbol at ",where);
    const ct = Game.players.indexOf(user);
    // console.log(,ct);
    if(ct == -1){
        console.error("Not in game");
        return;
    }
    if(Game.complete){
        console.error("Game is over");
        return;
    }
    if(Game.status[where]!= 0) {
        console.error("Already taken")
        return;
    }
    if(Game.turn == ct) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const nemp = urlParams.get('id');
        axios.post("app/game/tic",{nemp,where,user,token})
        // Game.turn = Game.players[(ct)?0:1];
        return;
    } else {
        console.error("Not your turn");
        return;
    }
}
const buttons = document.getElementById("buttons");
const turn = document.getElementById("turn");
const tats = document.getElementById("status");
for (let I = 0; I < 9; I++) {
    const button = buttons.childNodes[I*2+1];
    // console.log(button);
    button.addEventListener("click",()=>addSymbol(I))
}
const main = document.getElementById("main");
const form = document.getElementById("form");
const enter = document.getElementById("enter");
const p = document.getElementById("p");
function update () {
    let ct = -1;
    if(Game){
        ct = Game.players.indexOf(user);
    } else {
        return;
    }
    console.log("CT:",ct);
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams);
    const nemp = urlParams.get('id');
    // console.log(nemp);
    if(!Game.complete){
        axios.get(`/app/game/tic?id=${nemp}`)
        .then(result => {
            // console.log(result.data);
            Game = result.data.job[0];
        })
    }
    if(Game.players.length==1) {
        form.style.display="inherit";
        // main.style.display="none";
    } else {
        // main.style.display="inherit";
        form.style.display="none";
        const symbs = ["_","O","X"];
        for (let I = 0; I < 9; I++) {
            const button = buttons.childNodes[I*2+1];
            button.childNodes[1].value = symbs[Game.status[I]];
            // console.log(button.childNodes[1].value);
        }
        if(ct==-1){
            tats.textContent = "";
        } else {
            tats.textContent = symbs[ct+1];
    
        }
        if(Game.complete){
            turn.textContent = "Game is over, "+((Game.turn==-1)?"you stalemated.":((Game.turn==ct)?"you won.":"you lost."));
        } else {
            turn.textContent = (Game.turn==ct)?"It is your turn":`It is ${Game.players[(ct)?0:1]}'s turn`;
        }

    }
}
async function join () {
    try{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const nemp = urlParams.get('id');
        const request = {
            user,
            token,
            _id:nemp,
            password:p.value
        }
        console.log(request);
        await axios.post("app/game/tic/join",request).then((response)=>{
            // console.log("r");
        })
        console.log("Joining");

    } catch (error){
        console.error(error);
        console.error();
    }
}
enter.addEventListener("click",join);
loadLocalData();
update();
setInterval(() => {
    update();
}, 1000);