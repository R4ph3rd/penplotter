const name = '03 - generative pattern'
const step = 100;
const size = 30; 

const margin = {
    x: 200 + window.innerWidth - Math.floor(window.innerWidth / step) * step,
    y: 50 + window.innerHeight - Math.floor(window.innerHeight / step) * step
}

// marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
// marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;

console.log(margin.x, margin.y)
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

    /* line(margin.x, 0, margin.x, height)
    line(width - margin.x, 0, width - margin.x, height)
    line(0, margin.y, width, margin.y)
    line(0, height - margin.y, width, height - margin.y) */

    

    for (let y = margin.y ; y < height - margin.y ; y += step){
        for (let x = margin.x ; x < width - margin.x ; x += step){
            push();
                translate(x + (step/3), y);
                /* push()
                fill(255,0,0)
                ellipse(0,0,30,30)
                pop() */
                noFill();
                stroke(0);
                strokeWeight(1);

                push();
                    let i = random(1);
                    i = i < .25 ?
                    0 :
                    i < .5 ?
                    PI / 4 : 
                    i < .75 ? 
                    PI / 2 :
                    PI * 3 / 4;
                    rotate(i);
                    line(-size/2, 0, size/2, 0);

                    if(random(1) > .5 ){
                        line(0, -size/4, 0, size/4);
                    }
                    
                    if(random(1) > .5 ){
                        line(-size/2, size/2, size/2, size/2);
                    }

                    if(random(1) > .5 ){
                        line(-size/2, -size/2, -size/2, size/2);
                    }
                    
                    if(random(1) > .75 ){
                        line(-size/2, -size/2, 0, -size/2);
                    }

                    if(random(1) > .5 ){
                        push();
                        console.log('cool')
                        fill(0)
                        let p = random(1);
                                p = p < .25 ?
                                0 :
                                p < .5 ?
                                PI / 4 : 
                                p < .75 ? 
                                PI / 2 :
                                PI * 3 / 4;
                            rotate(p);
                            arc(0, 0, size/4, size/4, 0, PI);
                            
                            if(random(1) < .75){
                                noFill()
                                arc(0, 0, size , size, 0, PI);
                            }
                        pop()
                    }
                    
                    if(random(1) > .5 ){
                        push()
                        if(random(1) > .5 ){
                            rotate(PI)
                        }
                        rect(0, -size/4, size/4, size/4);
                        pop()
                    }

                    
                    const min = 10;
                    const w = random(1) < .5 ? -size/2 : size/2; 
                    const z = random(1) < .5 ? -size/2 : size/2 ;

                    if(random(1) > .5 ){
                        rect(size/2, size/2, min/2, min)
                    }
                    
                    if(random(1) < .5 ){
                        rect(z, w, min, min)
                    }

                    ellipse(w, z, min, min);
                    if(random(1) > .5){
                        push();
                            fill(0);
                            ellipse(w, z, min/3, min/3  );
                        pop();
                    }

                    if(random(1) > .5){
                        push();
                            translate(0, -z);
                            let p = random(1);
                                p = p < .25 ?
                                0 :
                                p < .5 ?
                                PI / 4 : 
                                p < .75 ? 
                                PI / 2 :
                                PI * 3 / 4;
                            rotate(p);

                            fill(random(1) > .5 ? 255 : 0);
                            triangle(w/4, w/2, -w/4, w/2, 0, 0);

                            if(random(1) < .5){
                                line(-w/2,0, w/2, 0);
                            }
                        pop();
                    }
                    
                    
                pop();
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