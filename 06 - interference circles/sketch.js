const name = document.URL.split('/')[document.URL.split('/').length - 2];
const base = 50;
const colors = ['#b53bce', '#3bcec7'];

let step;

const params = {
    smoothness: 200,
    xShift: 4,
    yShift: 2,
    noiseStrength: 50
}


function setup(){
    createCanvas(windowWidth, windowHeight);
    noLoop();
    pixelDensity(1);

    menu = QuickSettings.create(0, 0, "options");

    menu.addRange("Smoothness", 10, 400, params.smoothness, 1, function (v) {
        params.smoothness = v;
        drawing();
    })

    menu.addRange("xShift", -100, 100, params.xShift, 1, function (v) {
        params.xShift = v;
        drawing();
    })
    
    menu.addRange("yShift", - 100, 100, params.yShift, 1, function (v) {
        params.yShift = v;
        drawing();
    })
    
    menu.addRange("noise strenght", 10, 100, params.noiseStrength, 1, function (v) {
        params.noiseStrength = v;
        drawing();
    })

    step = TWO_PI/ params.smoothness;
    drawing();
}

function draw(){
    // drawing();
}


function drawing(){
    clear();
    noFill()
    strokeWeight(1)
    
    for (let i = 0 ; i < 400; i += 4){
        stroke(0,0,93)
        /* ellipse((width/2), (height/2), base + i, base + i)

        stroke(118,0,90)
        ellipse((width/2) - 8, (height/2) - 1, base + (i - 4), base + i)
 */
        /* beginShape()
        for (let z = 0 ; z < TWO_PI ; z += step){
            const x = (width/2) + (cos(z) * i);
            const y = (height/2) + (sin(z) * i);
            vertex(x,y)
        }
        endShape(CLOSE) */
        
        beginShape()
        for (let z = PI ; z < TWO_PI + PI ; z += step){
            const x = (width/2) + (cos(z) * i) + (noise(z) * params.noiseStrength);
            const y = (height/2) + (sin(z) * i) + (noise(z) * params.noiseStrength);
            vertex(x,y)
        }
        endShape(CLOSE)
        
        stroke(118,0,90)
        beginShape()
        for (let z = PI ; z < TWO_PI + PI ; z += step){
            const x = (width/2) + (cos(z) * i) + (noise(z * random(-.004, .005)) * params.noiseStrength);
            const y = (height/2) + (sin(z) * i) + (noise(z * random(-.005, .001)) * params.noiseStrength);
            vertex(x,y)
        }
        endShape(CLOSE)
    }
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