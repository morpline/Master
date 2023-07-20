const main = document.querySelector("#main");
const rf = document.querySelector("#rf");
let token = "" || localStorage.getItem("token");
let user = "" || localStorage.getItem("user");
const showTasks = async () => {
    try {
        const headers = {
            token:token,
            user:user
        }
        console.log(headers);
        // const {data} = await axios.get('/app/app',headers)
         await axios.post('/app/app', headers)
          .then(function (response) {
            data = response;
          })
        let bee3n = data.data;
        console.log(bee3n);
        if (bee3n.games.length < 1) {
            main.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
            return
        }
        let allTasks = "";
        for (const key in bee3n.games) {
            if (Object.hasOwnProperty.call(bee3n.games, key)) {
                const task = bee3n.games[key];
                console.log(task);
                allTasks+=`<div class="game" >
                <a href="./game.html?name=${key}">${key}</a>
                <h4>Tic - tac - toe</h5>
                <h4>${task.players}</h4>
                </div>`;
            }
        }
    //     const allTasks = bee3n.games
    //         .map((task) => {
    //             return `<div class="game" >
    // <a href="./game.html?name=${task.name}">${task.name}</a>
    // <h4>Tic - tac - toe</h5>
    // <h4>${task.players}</h4>
    // </div>`
    //         })
    //         .join('')
        main.innerHTML = allTasks
    } catch (error) {
        console.error(error);
        main.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
}
const signing = document.querySelector("#signin");
const username = signing.querySelector("#username"); 
const password = signing.querySelector("#password"); 
const enter = signing.querySelector("#enter"); 
const signIn = async () => {
    try{
        const {data} = await axios.post("/app/signing",{
            user:username.value,
            pass:password.value
        });
        console.log(data);
        user = username.value;
        token = data.token;
        localStorage.setItem("user",username.value);
        localStorage.setItem("token",data.token);
    } catch (error) {
        console.error(error);
    }
}
const nname = document.querySelector("#nname");
const npassword = document.querySelector("#npassword");
const nenter = document.querySelector("#nenter"); 

const createGame = async () => {
    try{
        if(nname.value == "") {
            console.error("enter a name");
            return;
        }
        await axios.post("/app/game/tic/new",{
            user,token,name:nname.value,password:npassword.value
        });
        showTasks();
    } catch (error) {
        console.error(error);
    }
}

enter.addEventListener("click",signIn);
nenter.addEventListener("click",createGame);
rf.addEventListener("click",showTasks);
console.log("TEST");
// showTasks();
if(user) {
    showTasks();
}