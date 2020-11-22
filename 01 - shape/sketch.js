const name = '01 - shape'
const start = 0;
const step = 3;
const limits = [5, 50];

let length = (window.innerHeight - (start * 2)) * 3 / 4;
let direction = 'RIGHT';
let i = 0;
let factor = 1;
let size = limits[0];
let pos;


function setup(){
    createCanvas(windowWidth, windowHeight);
    noLoop();
    pixelDensity(1);

    drawing();
}

function draw(){
    // drawing();
}


function drawing(){
    push();
    // setup variables
    length = (window.innerHeight - (start * 2)) * 3 / 4;
    i = 0;
    direction = 'RIGHT';
    factor = 1;
    size = limits[0];
    pos = createVector(start, start);
    
    // background(0);
    translate((window.innerWidth - length) /2, (window.innerHeight - length) / 2)

    noFill();
    stroke(0);
    strokeWeight(1);

    smooth();

    while (length - (i*limits[1]) > 50){

        ellipse(pos.x, pos.y, size, size);

        factor = size >= limits[1] && factor == 1 ?
            - 1 :  
            size <= limits[0] && factor == -1 ?
            1 : 
            factor;
        size = factor == 1 ?
            size + exp((limits[1] - size)/2) :
            size - exp((limits[0] - size)/2) ;


        if (['LEFT', 'RIGHT'].includes(direction) && (pos.x - 3 <= start + (i*limits[1]) || pos.x + 3 >= start + length)){
            console.log('moving to', direction)
            defineMove();
        } else if (['UP', 'DOWN'].includes(direction) && (pos.y - 3 <= start + (i*limits[1]) || pos.y + 3 >= start + length)){
            console.log('moving to', direction)
            defineMove();
        }

        switch (direction) {
            case 'LEFT':
                pos.x -= step ;
                break;
            case 'RIGHT':
                pos.x += step;
                break;
            case 'UP':
                pos.y -= step;
                break;
            case 'DOWN':
                pos.y += step;
                break;
        }
    }   
    pop();
    console.log('done !', length, (i*limits[1]), length - (i*limits[1]) < 100)
}


function defineMove(){
    if (direction == 'RIGHT' && pos.x >= start + length) direction = 'DOWN';
    if (direction == 'DOWN' && pos.y >= start + length) direction = 'LEFT';
    if (direction == 'LEFT' && pos.x <= start + (i*limits[1]) ) {
        direction = 'UP';
        length -= limits[1];
        i ++;
    }
    if (direction == 'UP' && pos.y <= start + (i*limits[1]) ) direction = 'RIGHT';
}


function keyPressed(){
    if (keyCode == ENTER){
        console.log('cool')
        render();
    }
}

function render() {
    createCanvas(width, height, SVG);
    drawing();

    save(name + '--' + new Date()); // give file name
}