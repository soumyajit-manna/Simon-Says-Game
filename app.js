let gameSeq= [];
let userSeq= [];
let btns= ["green","yellow","red","blue"];

let started= false;
let level= 0;
let highestScore=0;

let h2= document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started= true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function (){
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`;
    
    let randIdx= Math.floor(Math.random()*3);
    let randColor= btns[randIdx];
    let randBtn= document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);

    if (level > highestScore) {
        highestScore = level;
        document.getElementById('highest-Score').innerText = `Highest Score: ${highestScore}`;
    }
}

function check(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML= `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="white";
        },180)
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn)

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    check(userSeq.length-1);
}

let allbtns= document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=0;
    gameSeq=[];
    userSeq=[];
    level= 0;
}