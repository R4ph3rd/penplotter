const name = document.URL.split('/')[document.URL.split('/').length - 2];

const params = {
    pointCount: 600,
    freqX: 4,
    freqY: 7,
    phi: 15,
    modFreqX: 3,
    modFreqY: 2,
    lineWeight: 1,
    lineColor: '#5778CE',
    connectionRadius: 100,
}

let lissajousPoints = [];


function setup(){
    createCanvas(windowWidth, windowHeight);
    noLoop();
    pixelDensity(1);

    menu = QuickSettings.create(0, 0, "options");

    menu.addRange("pointCount", 100, 2000, params.pointCount, 1, function (v) {
        params.pointCount = v;
        drawing();
    })
    
    menu.addRange("freqX", 0, 20, params.freqX, 1, function (v) {
        params.freqX = v;
        drawing();
    })

    menu.addRange("freqY", 0, 20, params.freqY, 1, function (v) {
        params.freqY = v;
        drawing();
    })
    
    menu.addRange("phi", 8, 40, params.phi, 1, function (v) {
        params.phi = v;
        drawing();
    })
    
    menu.addRange("modFreqX", 0, 10, params.modFreqX, 1, function (v) {
        params.modFreqX = v;
        drawing();
    })

    menu.addRange("modFreqY", 0, 10, params.modFreqY, 1, function (v) {
        params.modFreqY = v;
        drawing();
    })
    
    menu.addRange("connectionRadius", 30, 200, params.connectionRadius, 1, function (v) {
        params.connectionRadius = v;
        drawing();
    })
   
    menu.addColor("lineColor", params.lineColor, function (v) {
        params.lineColor = v;
        drawing();
    })

    drawing();
}

function draw(){
    // drawing();
}

function drawing(){
    calculate();
    drawLissajous();
}


function calculate(){  
    for (let i = 0; i <= params.pointCount; i++) {
        let angle =  map(i, 0, params.pointCount, 0,  TAU);
  
        let x =  sin(angle * params.freqX +  radians(params.phi)) *  cos(angle * params.modFreqX);
        let y =  sin(angle * params.freqY) *  cos(angle * params.modFreqY);
        x *=  width / 2 - 30;
        y *=  height / 2 - 30;
  
        lissajousPoints[i] =  createVector(x,y);
    }
}

function drawLissajous() {
    clear();
    noFill()
    strokeWeight(params.lineWeight)
    stroke(params.lineColor)
    push();
    translate( width / 2,  height / 2);

    for (let i = 0; i < params.pointCount; i++) {
      for (let y = 0; y < i; y++) {
        let d = lissajousPoints[i].dist(lissajousPoints[y]);
        if (d <= params.connectionRadius) {
           line(
            lissajousPoints[i].x,
            lissajousPoints[i].y,
            lissajousPoints[y].x,
            lissajousPoints[y].y
          );
        }
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