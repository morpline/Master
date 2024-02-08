const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const customError = require("../middleware/custom-error");
const db = require("../db/firebase-config");
const { collection, getDocs, DocumentReference, Firestore, getAll, FieldPath } = require("@google-cloud/firestore");






const getTasks = asyncWrapper(async (req,res)=>{
    // let col = db.collection("tasks")
    // let docref = db.doc("crud/tasks");
    // console.log(docref.path);
    // let docs;
    // await db.getAll(docref).then(dcs => {
    //     console.log(dcs);
    //     docs+=dcs;
    // })

    let col = db.collection("tasks")
    const snapshot = await col.get()
    const f = await col.listDocuments()
    // const document = await firestore.doc("crud/tasks")
    // console.log(f);
    // const tasks = await Task.find({});
    res.status(200).json({data: snapshot.docs.map(doc=>{
        let d = doc.data()
        // console.log(d);
        let b = {
            name : d.name,
            completed: d.completed,
            id: doc.id
        }
        return b;
    })});
    // res.status(200).json({data: f.map( async (doc)=>{
    //     let d = await doc.get().then(()=>{
            
    //     })
    //     console.log(d);
    //     let b = {
    //         name : d.name,
    //         completed: d.completed,
    //         id: "np"
    //     }
    //     return b;
    // })});
});
const createTask = asyncWrapper(async (req,res)=>{
    const snapshot = await db.collection("tasks").doc()
    let task;
    snapshot.create({
        name:req.body.name,
        completed:false,
    }).then(ress=>{
        task=ress;
    }).catch(err=>{
        res.status(505)
    })
    res.status(201).json({ task });
    // const task = await Task.create(req.body);
    
    

});
const getTask = asyncWrapper(async (req,res)=>{
   console.log("getting task with params: ",req.params);
    // const task = await Task.findOne({ _id: req.params.id});
    const snapshot = await db.collection("tasks").doc(req.params.id)
    // const data = snapshot.docs.map(doc=>doc.data())
    const task = await snapshot.get()
    // console.log(task);
    if(!task.exists) {
        // return (customError.createCustomError(`No task with id: ${req.params.id}`,404));
        res.status(500)
        // return res.status(404).json({msg: })
    } else {
        res.status(200).json(task.data());

    }
    
});
const updateTask = asyncWrapper(async (req,res)=>{
    const snapshot = await db.collection("tasks").doc(req.params.id)
    await snapshot.update(req.body)
    task = await snapshot.get()
    // const task = await Task.findOneAndUpdate({ _id: req.params.id},req.body,{new:true,runValidators:true});
    if(!task.exists) {
        return next(customError.createCustomError(`No task with id: ${req.params.id}`,404));
        // return res.status(404).json({msg: })
    } else {
        res.status(200).json(task.data());

    }
});
const deleteTask = asyncWrapper( async (req,res)=>{
    const snapshot = await db.collection("tasks").doc(req.params.id)
    await snapshot.delete()
    task = await snapshot.get()
    if(!task) {
        return res.status(404).json({msg: "*ded*"})
    } else {
        res.status(200).json(task.data());

    }
});

module.exports = {getTasks, createTask, getTask, updateTask, deleteTask};