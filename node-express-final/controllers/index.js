// Easy Debug Library
const L = require("../../L.js/L");
L.debug = true;
//^ Turning this to false will disable all L.ld() calls.
const User = require("../schemas/user");
const Game = require("../schemas/game");
// const mongodb = require("../db/connect");
// const game = require("../schemas/game");


async function verify (user,token){
    // const query = {user};
    try{
        const result = await User.findOne({name:user})
        // L.ld(result);
        if(result){
            return true;

        } else {
            return false;
        }
    } catch (err) {
        L.ld(err);
        return false;
    }
}

const getAll = async (req,res,next)=>{
    L.ld("\n\nGetall");
    const newQuery = req.body;
    // const newQuery = {user:"w",token:"3041"};
    L.ld(req.body);
    if(newQuery.token == "" || newQuery.token == undefined || newQuery.token == "undefined") {
        L.ld("\nNo token")
        L.ld("sending header unauth (A)");
            // L.ld("sending header recieved");
        res.status(401).json({response: "Unauthorized",games:{}});
        
    } else {
        if (verify(newQuery.user,newQuery.token)){
            // const result = await mongodb.getDb().db().collection("students").find();
            const result = await Game.find({});
            // L.ld(result);
            L.ld("sending header recieved");
            // L.ld("sending header recieved");
            res.status(200).json({response: "Recieved",games:result});
        } else {
            L.ld("sending header unauth (B)");
            // L.ld("sending header recieved");
            res.status(401).json({response: "Unauthorized",games:{}});
            //User token doesnt match the server copy for that username
        }
    }
    L.ld("got it");
    // L.ld(req);
    next();
};
const signin = async (req,res)=>{
    L.ld("\n\nSignin");
    const newQuery = req.body;
    L.ld(req.body);
    if(!newQuery.user || !newQuery.pass) {
            L.ld("sending header bad request");
        res.status(400).json({response: "Bad Request",games:[]});
        return;
    }
    L.ld("user:");
    const use = await User.findOne({name:newQuery.user});
    L.ld(use);
    if(use || use == {}) {
        //Check is pasword is correct
        if(use.password == newQuery.pass) {
            //User is correct, return token
            L.ld("sending header accepted");
            res.status(200).json({response: "Accepted",token:use.token});
        } else {
            L.ld("sending header 401");
            res.status(401);
        }
    } else {
        let newUser = {
            name:newQuery.user,
            password:newQuery.pass,
            token:""+Math.round(Math.random()*10000),
            exp:0
        };
        await User.create(newUser);
        L.ld("sending header created");
        res.status(201).json({response: "Created",token:newUser.token});

    }
    L.ld("got it");
    // L.ld(users)
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
async function Input (req,res) {
    const {
        nemp,
        where,
        user,
        token
    } = req.body;
    L.ld(req.body);
    if(token == "" || token == undefined) {
        // L.ld("TOKEN:"+token);
        L.ld("sending header unauth");
        res.status(401).json({response: "Unauthorized",games:[]});
        
    } else {
        // if(token == users[user].token) {
        if(await verify(user,token)) {
            // let job = games[nemp];
            let job = await Game.findOne({_id:nemp});

            if(!job) {
                L.ld("sending header no game kek");
                return res.status(404).json({response: "No game kek"})
            } else {
                // games[nemp].status[where] = games[nemp].turn+1;
                // games[nemp].turn = (games[nemp].turn==1)?0:1;
                job.status[where]=job.turn+1;
                job.turn = (job.turn==1)?0:1
                Evaluator(job);
                if(job.complete){
                    await Game.findOneAndDelete({ _id: nemp});
                }
                await Game.findOneAndUpdate({_id:nemp},job);
                L.ld("sending header 200");
                res.status(200).json({job});
            }
        } else {
            
        }
    }
};
async function CreateGame (req,res) {
    const {user,token,name,password} = req.body;
    if(token == "" || token == undefined) {
            L.ld("sending header recieved");
        res.status(401).json({response: "Unauthorized"});
    } else {
        if(await verify(user,token)) {
            let g = {
                name:name,
                game:"TIC",
                players:[user],
                status:[0,0,0,0,0,0,0,0,0],
                turn:-1,
                complete:false,
            };
            // games[name] = g;
            // passwords[name] = password?password:false;
            await Game.create(g);
            L.ld("sending header recieved");
            res.status(201).json({response: "Created",game:g});
        } else {
            L.ld("sending header recieved");
            res.status(401).json({response: "Unauthorized"});
            //User token doesnt match the server copy for that username
        }
    }
}
async function GetGame(req,res) {
    // const job = await Job.findOne({ _id: req.params.id,createdBy: req.user.userId});
    // let job = games[req.query.name];
    let job = await Game.find({_id:req.query.id});
    // games.forEach((e,i)=>{
    //     // L.ld("\n",e);
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
        L.ld("sending header no game kek");
        return res.status(404).json({response: "No game kek"})
    } else {
        // L.ld("sending header 200");
        res.status(200).json({job});

    }
};
async function joinGame(req,res) {
    L.ld("\n JoinGame()")
    const {user,token,_id,password} = req.body;
    if(token == "" || token == undefined) {
            L.ld("sending header no token");
        res.status(400).json({response: "No token provided"});
    } else {
        if(await verify(user, token)) {
            let jobs = await Game.find({_id:_id});
            let job = jobs[0];
            // let job = games[0];
            // games.forEach((e,i)=>{
            //     if(`"${e.name}"` === name){
            //         job = e;
            //     }
            // })
            if(!job || job == []) {
                L.ld("sending header no game kek");
                return res.status(404).json({response: "No game kek"})
            } else {
                L.ld("PLayers: v")
                console.log(job.players);
                L.ld("PLayers: ^")
                if(job.players.length != 2) {
                    // if(password == passwords[name] || !password){
                        if(job.players.includes(user)){
                            L.ld("sending header already joined");
                            res.status(409).json({response:"Already joined"})
                        } else {
                            job.players.push(user);
                            job.turn = 0;
                            L.ld("updated game:");
                            L.ld(job);
                            await Game.findOneAndUpdate({_id:_id},job);
                            L.ld("sending header joined");
                            res.status(202).json({response:"joined"})
                        }
                    // } else {
                    //     if(password) {
                    //         L.ld("sending header password wrong");
                    //         res.status(400).json({response:"Password incorrect"})
                    //     } else {
                    //         L.ld("sending header needs password");
                    //         res.status(400).json({response:"Game requires Password"})
                    //     }
                    // }
                } else {
                    L.ld("sending header game full");
                    res.status(409).json({response:"Game Full"})
                }
            }
        } else {
            L.ld("sending header unauth");
            res.status(401).json({response: "Unauthorized"});
        }
    }
}
module.exports = {getAll, signin, Input, GetGame,joinGame,CreateGame};
