const name = '02 - grid'
const step = 100;
const colors = [
    '#8a06a5',
    '#062ba5'
]

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

    for (let y = 0 ; y < height / step ; y ++){
        for (let x = 0 ; x < width / step ; x ++){
            push();
                translate(x * step, y * step);
                noFill();
                for (let z = 0 ; z < step ; z += 6){
                    let i = random(1) > .5 ? 0 : 1 ;
                    strokeWeight(2)
                    stroke(colors[i]);

                    let k = y % 2 ? x : x + 1;
                    if (y % 2 == 0){
                        if (k % 2  == 0){
                            line(step, z, step - z, step);
                        } else {
                            line(0, z, z, step);
                        }
                    } else {
                        if (k % 2 == 0){
                            line(0, step - z, z, 0);
                        } else {
                            line(step - z, 0, step, step - z);
                        }
                    }
                }
            pop();
        }
    }

    pop();
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