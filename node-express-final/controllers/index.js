// Easy Debug Library
const L = require("../../L.js/L");
L.debug = true;
// const Product = require("../models/product");
// ^^ This file does not exist yet
let games = {
    "Test":{
        //^ DOES have to be unique
        // bc of how a single game is retrieved
        game:"TIC",
        //^ Can support other games in the future
        players:[
            "e",
            "w"
        ],
        //^ used to check who's playing
        status:[
            0,1,2,1,2,2,1,0,0
        ],
        //^ the status of the game.
        turn:1,
        //^ Who's turn it is, and if complete, the winner.
        complete:false
    },
    "Test2":{
        game:"TIC",
        players:[
            "e",
            "w"
        ],
        status:[
            0,0,0,0,0,0,0,0,0
        ],
        turn:0,
        complete:false
    },
    "Test3":{
        game:"TIC",
        players:[
            "w"
        ],
        status:[0,0,0,0,0,0,0,0,0],
        turn:-1,
        complete:false,
    }
};
let passwords = {
    "Test":false,
    "Test2":false,
    "Test3":"test",
}
// latest generated tokens for specific users
let users = {
    w:{
        password:"w",
        token:"3041",
        exp:1629
    },
    e:{
        password:"e",
        token:"3041",
        exp:1629
    }
};
const getAll = async (req,res,next)=>{
    L.ld("\n\nGetall");
    const newQuery = req.body;
    // const newQuery = {user:"w",token:"3041"};
    L.ld(req.body);
    if(newQuery.token == "" || newQuery.token == undefined) {
        L.ld("\nNo token")
        res.status(401).json({response: "Unauthorized",games:{}});
        
    } else {
        L.ld("\nToken exists")
        L.ld(users)
        L.ld(newQuery.user)
        L.ld(users[newQuery.user])
        L.ld(users[newQuery.user].token)
        if(newQuery.token == users[newQuery.user].token) {
            res.status(200).json({response: "Recieved",games});
        } else {
            res.status(401).json({response: "Unauthorized",games:{}});
            //User token doesnt match the server copy for that username
        }
    }
    L.ld("got it\n\n");
    // L.ld(req);
    next();
};
const signin = async (req,res)=>{
    L.ld("\n\nSignin");
    const newQuery = req.body;
    L.ld(req.body);
    if(!newQuery.user || !newQuery.pass) {
        res.status(400).json({response: "Bad Request",games:[]});
        return;
    }
    if(users[newQuery.user]) {
        //Check is pasword is correct
        if(users[newQuery.user].password == newQuery.pass) {
            //User is correct, return token
            res.status(200).json({response: "Accepted",token:users[newQuery.user].token});
        } else {
            res.status(401);
        }
    } else {
        users[newQuery.user] = {
            password:newQuery.pass,
            token:""+Math.round(Math.random()*10000),
            exp:0
        };
        res.status(201).json({response: "Created",token:users[newQuery.user].token});

    }
    L.ld("got it");
    L.ld(users)
};
function Evaluator (game) {
    // Game should be a complete TIC game object.
    let combos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [1,4,8],
        [2,4,6]
    ];
    for (let index = 0; index < combos.length; index++) {
        const element = combos[index];
        if(game.status[element[0]]==game.status[element[1]] && game.status[element[2]] == game.status[element[0]]){
            //If combo that could win matches all three
            if(game.status[element[0]]==0){
                //It's all 0s, do nothing.
            } else {
                //They all match, set complete to true, trun to winner.
                game.complete = true;
                game.turn = game.status[element[0]-1];
            }
        }
    }
};
function Input (req,res) {
    const {
        nemp,
        where,
        user,
        token
    } = req.body;
    L.ld(req.body);
    if(token == "" || token == undefined) {
        // L.ld("TOKEN:"+token);
        res.status(401).json({response: "Unauthorized",games:[]});
        
    } else {
        if(token == users[user].token) {
            let job = games[nemp];

            if(!job) {
                return res.status(404).json({response: "No game kek"})
            } else {
                games[nemp].status[where] = games[nemp].turn+1;
                games[nemp].turn = (games[nemp].turn==1)?0:1;
                Evaluator(games[nemp]);
                res.status(200).json({job});
            }
        } else {
            
        }
    }
};
function CreateGame (req,res) {
    const {user,token,name,password} = req.body;
    if(token == "" || token == undefined) {
        res.status(401).json({response: "Unauthorized"});
    } else {
        if(token == users[user].token) {
            let g = {
                game:"TIC",
                players:[user],
                status:[0,0,0,0,0,0,0,0,0],
                turn:-1,
                complete:false,
            };
            games[name] = g;
            passwords[name] = password?password:false;
            res.status(201).json({response: "Created",game:g});
        } else {
            res.status(401).json({response: "Unauthorized"});
            //User token doesnt match the server copy for that username
        }
    }
}
function GetGame(req,res) {
    // const job = await Job.findOne({ _id: req.params.id,createdBy: req.user.userId});
    let job = games[req.query.name];
    // games.forEach((e,i)=>{
    //     // console.log("\n",e);
    //     if(`"${e.name}"` === req.query.name /*&& !job*/){
    //         job = e;
    //         // L.ld(`${e.name} looks like ${req.query.name}`)
    //     }
    // })
    // L.ld("\nGet game");
    // L.ld(req.query);
    // L.ld(job)
    if(!job) {
        // return next(customError.createCustomError(`No job with id: ${req.params.id}`,404));
        return res.status(404).json({response: "No game kek"})
    } else {
        res.status(200).json({job});

    }
};
function joinGame(req,res) {
    const {user,token,name,password} = req.body;
    if(token == "" || token == undefined) {
        res.status(400).json({response: "No token provided"});
    } else {
        if(token == users[user].token) {
            let job = games[name];
            // let job = games[0];
            // games.forEach((e,i)=>{
            //     if(`"${e.name}"` === name){
            //         job = e;
            //     }
            // })
            if(!job) {
                console.log(404,"No game kek");
                return res.status(404).json({response: "No game kek"})
            } else {
                console.log("\n",job);
                if(job.players.length != 2) {
                    if(password == passwords[name] || !password){
                        if(job.players.includes(user)){
                            console.log(409,"Already joined");
                            res.status(409).json({response:"Already joined"})
                        } else {
                            job.players.push(user);
                            job.turn = 0;
                            console.log(202,"joined");
                            res.status(202).json({response:"joined"})
                        }
                    } else {
                        if(password) {
                            console.log(400,"Password incorrect");
                            res.status(400).json({response:"Password incorrect"})
                        } else {
                            console.log(400,"Game requires Password");
                            res.status(400).json({response:"Game requires Password"})
                        }
                    }
                } else {
                    console.log(409,"Game Full");
                    res.status(409).json({response:"Game Full"})
                }
            }
        } else {
            console.log(401);
            res.status(401).json({response: "Unauthorized"});
        }
    }
}
module.exports = {getAll, signin, Input, GetGame,joinGame,CreateGame};
