const name = '05 - bubbles'
const range = 50;
const colors = ['#b53bce', '#3bcec7'];
const iris = true;

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
        translate(width/2, height/2);
        
        noFill();
        for (let k = 0 ; k < (iris ? 2 : 1); k ++){
            rotate(PI/32);
            stroke((iris ? colors[k] : 0));
            let rad = 0;
            let z = (height/2) - range;

            while (z > 100){
                const step = TWO_PI/ (z * 1.25  );
                for (let w = 0; w < TWO_PI ; w += step){
                    let x = z * cos(w);
                    let y = z * sin(w)
                    let radius = abs(range * cos(rad)) < 10 ? 10 : range * cos(rad);
                    ellipse(x, y, radius);
                    rad += step * 4;
                }
                z -= range;
            }
        }

    pop();
}

function keyPressed(){
    if (keyCode == ENTER){
        console.log('cool')
        render();
    }
    
    if (keyCode == SHIFT){
        console.log('restart')
        background(255)
        drawing();
    }
}

function render() {
    createCanvas(width, height, SVG);
    drawing();

    save(name + '--' + new Date()); // give file name
}