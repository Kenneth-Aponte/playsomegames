//canvas and context setup
const canvas = document.getElementById("gS");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight - (document.getElementById('navbar').clientHeight+1);

//Images
var selectorImg = document.getElementById('gameSelectorImg'); 
var arrowKeys = document.getElementById('arrowKeys');
var enterKey = document.getElementById('enterKey');
var g_CS = document.getElementById('comingSoonImg');

//resize setup
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


//classes
class Game {
    constructor(name,id,x,onScreen){
        this.name = name;
        this.pictureId = id;
        this.x = x;
        this.onScreen = onScreen;
    }
    
    draw(){
        ctx.drawImage(this.pictureId,this.x,yPos,imageW,imageW);
    } 
    
    move(dir){
        this.x+=dir*moveSpeed;//dir just changes if it is left or right with --> -1 or 1
    }
}


//vars
let imageW = canvas.width/5;
let dist = imageW/4;
let yPos = canvas.height/8;
let moveSpeed = dist;//you read that right
let gameList = [];
let gameSelected = 2;
let moveDir = "N";  //N for NULL, L for LEFT, and R for RIGHT
let moving = false;
let maxMove = 5;//5*dist == imageW + dist

//mainloop
function animate(){
    setTimeout(() => {        
        requestAnimationFrame(animate);//recursion
        ctx.clearRect(0,0,canvas.width,canvas.height);//clears the screen for redrawing
        
        //---TICKS and MOVEMENT---
        //only change if the tab has been resized or went in to fs or not
        if(canvas.width != innerWidth){
            canvas.width = innerWidth;
            imageW = canvas.width/5;
            dist = imageW/4;
            moveSpeed = dist;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
            //resize game images
            resizeGames();
        }
        if(canvas.height != innerHeight - (document.getElementById('navbar').clientHeight+1)){
            canvas.height = innerHeight - (document.getElementById('navbar').clientHeight+1);
            yPos = canvas.height/8;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
            //resize game images
            resizeGames();
        }   

        //game thumbnail movement
        if(moving){
            if(moveDir == "L"){
                if(maxMove <= 0){
                    maxMove = 5;
                    moving = false; 

                    //once its done, the image on the right is outside of the screen, hence
                    if(gameSelected < gameList.length-3){
                        gameList[gameSelected+3].onScreen = false;
                    }        
                }
                else{
                    gameList.forEach((game) => {
                        game.move(1);
                    });
                    maxMove-=1;
                }
            }

            else if(moveDir == "R"){//redundant i know, but just in case lol
                if(maxMove <= 0){
                    maxMove = 5;
                    moving = false; 
                    
                    //once its done, the image on the left is outside of the screen, hence
                    if(gameSelected >= 3){
                        gameList[gameSelected-3].onScreen = false;
                    }
                }
                else{
                    gameList.forEach((game) => {
                        game.move(-1);
                    });
                    maxMove-=1;
                }
            }
        }


        //---DRAWING---
        //games
        gameList.forEach((game) =>{
            if(game.onScreen){game.draw();}
        });

        //selector 
        ctx.drawImage(selectorImg, (canvas.width/2 - imageW/2) - canvas.height/100, yPos - canvas.height/100, imageW + canvas.height/50, imageW + canvas.height/50);
        
        //Game Name Bar
        ctx.fillStyle = 'rgb(220,20,60)';
        ctx.fillRect(0, yPos + imageW + canvas.height/12, canvas.width,canvas.height/10);
        ctx.lineWidth= "4";
        ctx.strokeStyle = 'black';
        ctx.strokeRect(-4, yPos + imageW + canvas.height/12, canvas.width+8,canvas.height/10);
        ctx.fillStyle = 'rgb(200,80,110)';
        ctx.fillRect(0,yPos + imageW + canvas.height/12,canvas.width,5);
        ctx.fillStyle = 'rgb(148,15,44)';
        ctx.fillRect(0,yPos+imageW+canvas.height/12+canvas.height/10-6,canvas.width,5);
        
        //Game Name Text
        ctx.font = "900 "+ (canvas.height/15).toString() + "px Aldrich";
        ctx.textAlign = "center"
        ctx.fillStyle = "black";
        ctx.fillText(gameList[gameSelected].name, canvas.width/2,yPos+imageW+canvas.height/12+canvas.height/14);
        
        //Footer
        ctx.fillStyle="black";
        ctx.fillRect(0,canvas.height - canvas.height/7-13,canvas.width,canvas.height/4);
        ctx.fillStyle="rgb(89,100,108)";
        ctx.fillRect(0,canvas.height - canvas.height/7-10,canvas.width,canvas.height/4);
        ctx.fillStyle = "rgb(80,90,100)";
        ctx.fillRect(0,canvas.height - canvas.height/7,canvas.width,canvas.height/4);
        ctx.fillStyle= "rgb(53,65,79)";
        ctx.fillRect(0,canvas.height - 10,canvas.width,10);
        
        //Buttons in footer
        ctx.drawImage(arrowKeys,canvas.width/24,canvas.height-(canvas.height/7+10),canvas.height/7,canvas.height/7);
        ctx.drawImage(enterKey,canvas.width - canvas.width/4.5,canvas.height-(canvas.height/8+15), canvas.height/8, canvas.height/8);
        
        //Text in footer
        ctx.font = "100 "+ (canvas.width/55).toString() + "px Aldrich";
        ctx.textAlign = "start";
        ctx.fillStyle = "rgb(0,0,0)"; 
        ctx.fillText("Browse Games",canvas.width/8,canvas.height-canvas.height/14);
        ctx.textAlign = "end"
        ctx.fillText("Start Game",canvas.width - canvas.width/24,canvas.height-canvas.height/14);
        
    }, 16); //16ms ~ 60fps
}

//gamneListCreation
function populateGameList(){
    gameList.push(new Game("Space Survival", g_CS, -imageW/2, true));
    gameList.push(new Game("Coming Soon", g_CS, (imageW/2 + dist), true));
    gameList.push(new Game("Coming Soon", g_CS, (imageW + imageW/2 + dist*2), true));
    gameList.push(new Game("Coming Soon", g_CS, (imageW*2 + imageW/2 + dist*3), true));
    gameList.push(new Game("Coming Soon", g_CS, (imageW*3 + imageW/2 + dist*4),true));
    gameList.push(new Game("Coming Soon", g_CS, (imageW*4 + imageW/2 + dist*5), false));
    gameList.push(new Game("Coming Soon", g_CS, (imageW*5 + imageW/2 + dist*6), false));
    gameList.push(new Game("Coming Soon", g_CS, (imageW*6 + imageW/2 + dist*7), false));
}


function resizeGames(){
    //if the screen was resized, apart from changing the size of the game thumbnails I have to change the x pos,
    //this is what this function does, to every image, onScreen or not
    let indexChange = -1*gameSelected+2;

    gameList.forEach((game) => {
        game.x = (indexChange-1)*imageW + imageW/2 + dist*(indexChange);//see populateGameList funct. for ref.
        indexChange++;
    });
}


addEventListener('keyup', (event) =>{
    var name = event.key;
    
    //click left arrow = move all games to the right
    if(!moving && name == "ArrowLeft" && gameSelected > 0){
        moving = true;
        moveDir = "L";
        gameSelected--;
        //the one on the left is outside the screen, hence
        if(gameSelected >= 2){
            gameList[gameSelected-2].onScreen = true;
        }
    }
    //same as above but alreves 
    if(!moving && name == "ArrowRight" && gameSelected < gameList.length-1){
        moving = true;
        moveDir = "R";
        gameSelected++;
        //the one on the right is outside the screen, hence
        if(gameSelected <= gameList.length-3){
            gameList[gameSelected+2].onScreen = true;
        }
    }
    
    //starts the game
    if(name == "Enter"){
        window.location.replace("/Games/" + gameList[gameSelected].name.replaceAll(" ",'') + '/' + gameList[gameSelected].name.replaceAll(" ",'').toLowerCase() +  ".html")
    }

    // console.log(gameList);
});


function start(){
    populateGameList();
    animate();
}


start();