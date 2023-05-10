// L.js

// A quick and simple log function for node and browser projects
// Either require("L") or <script src="L.js">
// Browser projects don't work completely correctly, but there is a workaround.

// Why L.js?

// console.log() has one problem: it doesn't return anything.
// But L.l() DOES return what you give it, so you can insert it into normal functions like:
// let b = L.lc(a,"setting b");

// What do the functions do?

// L.l() is just a quick log function that adds no additional context.
// L.lc() does give context in the form of an extra string you give
// L.lb() is L.lc() but it is for booleans
// L.ld() and
// L.lcd() are L.l() and L.lc() but they only log things out when L.debug is set to true.
//          They DO return what you give them though, so you can just leave L.debug as false and have
//          the console empty while the code still works.

const L = {
    l : function(e){
        console.log(e);
        return e;
    },
    lc : function (e,context){
        console.log(context,e);
        return e;
    },
    lb : function (b,name){
        console.log(`${name} is set to ${b?"true":"false"}`)
        return b;
    },
    debug : false,
    ld : function (e){
        if(this.debug){
            console.log(e);
        }
        return e;
    },
    lcd : function (e,context){
        if(this.debug){
            console.log(context,e);
        }
        return e;
    }
}

module.exports = L;