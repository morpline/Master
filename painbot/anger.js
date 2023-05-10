let l = e=>console.log(e);

function writeBackwards (text) {
    //Works
    let siwo = text || "!Error - You have to enter some text";
    let done = "";
    for (let i = siwo.length; i>0; i--) {
        const e = siwo.charAt(i-1);
        done += e;
    }
    return done;
}
const words = [
    "that",
    "and",
    "the",
    "if",
    "what",
    "why",
    "this",
    "is",
    "but",
    " a",
    " i",
];
function censorCommon (text) {
    //Works
    let siwo = text || "!Error - You have to enter some text";
    let done = "";
    words.forEach((e,i)=>{
        while(siwo.includes(e))
        {
            siwo = siwo.replace(e,`*${i}`);
        }
    })
    return siwo.trim();
}
function randomSpoiler (text) {
    //Works
    let siwo = text || "!Error - You have to enter some text";
    let done = "";
    let numOfSpoilers = 0;
    //add spoilers
    for (let i = 0; i < siwo.length; i++) {
        const e = siwo.charAt(i);
        // console.log("Test2");
        if(e===" "){
            // console.log("Test3");
            if(Math.random()>0.9)
            {
                console.log("Test4");
                done+="||";
                numOfSpoilers++;
            }
        }
        done += e;
    }
    if(numOfSpoilers%2 == 1){
        done+="||"
    }

    return done;
}
function randomRemoval (text) {
    //Works
    let siwo = text || "!Error - You have to enter some text";
    let done = "";
    // console.log("Test1");
    for (let i = 0; i < siwo.length; i++) {
        const e = siwo.charAt(i);
        // console.log("Test2");
        // if(!(i%10==0))
        if(Math.random()<0.9) {
            done += e;
            // console.log("Test3");

        }
    }
    // console.log("Test4");
    return done;
}

function maximumPain (text) {
    return writeBackwards(randomSpoiler(randomRemoval(censorCommon(text))));
}
async function asyncMaximumPain (text) {
    await setTimeout(() => {}, Math.random()*30000);
    return writeBackwards(randomSpoiler(randomRemoval(censorCommon(text))));
}

/* Painbot Anger.js Usage */
//If it's commented out, don't use it.


console.log(
    writeBackwards("this is a test of words, men.")
);


console.log(
    censorCommon("this is a test of words, men.")
);


console.log(
    randomSpoiler("this is a test of words, men.")
);

console.log(
    randomRemoval("this is a test of words, men.")
);

console.log(
    maximumPain("this is a test of words, men.")
);

const types = [
    "h1",
    "h2",
    "h3",
    "h4",
    "a",
    "p"
];
function webpageBomb () {
    types.forEach(t=>{
        a = document.querySelectorAll(t);
        a.forEach(d => {
            d.textContent = maximumPain(d.textContent);
        });
    });
};
function painimate () {
    requestAnimationFrame(painimate);
    webpageBomb();
    // setTimeout(painimate(),100);
}
if(Math.random()>0.8) {
    painimate();
}