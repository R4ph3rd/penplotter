const name = '04 - square'
const square = window.innerHeight * 5 / 6;
const step = square / 30;
const variation = 500;
const radiusCenter = 30;
const colors = ['#b53bce', '#3bcec7']

function setup(){
    createCanvas(windowWidth, windowHeight);
    noLoop();
    pixelDensity(1);

    drawing();
}

function draw(){
    // drawing();
}

const curvePoint = (pos) => {
    return createVector(
        pos.x + map(noise(0.05, 1, 3), 0 , 1, -variation, variation), 
        pos.y + map(noise(0.05, 1, 2), 0 , 1, -variation, variation)
    );
}

const centerPoint = (pos) => {
    /* console.log( 'centerpoint', createVector(
        (width/2) + (radiusCenter * acos(pos.x)),
        (height/2) + (radiusCenter * asin(pos.y))
    ), 'pos' , pos) */
    const normPos = createVector(
        map(pos.x, -square/2, square/2, -radiusCenter/2, radiusCenter/2),
        map(pos.y, -square/2, square/2, -radiusCenter/2, radiusCenter/2)
    );
    return normPos
    return createVector(
        (radiusCenter * acos(normPos.x)),
        (radiusCenter * asin(normPos.y))
    );
}

function drawing(){
    push();
        translate(width/2, height/2);
        
        push();
            noFill();
            // stroke(colors[0]);

            const c0 = centerPoint({x: 0, y: 0})
            const a0 = curvePoint(c0.x, c0.y);

            const corner = createVector(square/2,square/2);
            const cornerPoint = curvePoint(corner.x, corner.y);                
            
            for (let y = 0 ; y < 2; y ++){
                stroke(colors[y]);
                rect((-square/2) - y * 3, (-square/2) - y * 3, square + (y * 6), square + (y * 6));

                for (let i = y * 5 ; i < square ; i += step){
                    // bezier(i, height/12, ,width/2, height/2)
                    const p1 = createVector((-square/2) + i, -square/2);
                    const p2 = createVector((-square/2) + i, square/2);
                    const p3 = createVector(-square/2, (-square/2) + i);
                    const p4 = createVector(square/2, (-square/2) + i);
    
                    
                    const c1 = curvePoint(p1);
                    const c2 = curvePoint(p2)
                    const c3 = curvePoint(p3);
                    const c4 = curvePoint(p4);

                    const o1 = centerPoint(c1);
                    const o2 = centerPoint(c2);
                    const o3 = centerPoint(c3);
                    const o4 = centerPoint(c4);
                    
                    const a1 = curvePoint(o1.x, o1.y);
                    const a2 = curvePoint(o2.x, o2.y)
                    const a3 = curvePoint(o3.x, o3.y);
                    const a4 = curvePoint(o4.x, o4.y);


                    push();
                    fill(0)
                    ellipse(a1.x ,a1.y, 10, 10)
                    ellipse(a2.x ,a2.y, 10, 10)
                    ellipse(a3.x ,a3.y, 10, 10)
                    ellipse(a4.x ,a4.y, 10, 10)
                    pop()
                    
                    // horizontals
                    curve(c1.x, c1.y,
                        p1.x, p1.y,
                        o1.x, o1.y,
                        a1.x, a1.y);
    
                    curve(c2.x, c2.y,
                        p1.x, p2.y,
                        o2.x, o2.y,
                        a2.x, a2.y);
    
                    //verticals
                    curve(c3.x, c3.y,
                        p3.x, p3.y,
                        o3.x, o3.y,
                        a3.x, a3.y);
    
                    curve(c4.x, c4.y,
                        p4.x, p3.y,
                        o4.x, o4.y,
                        a4.x, a4.y);
                }
            }

            stroke(colors[0]);

            const cornerCenter = centerPoint({x :square/2, y: square/2})

            curve(cornerPoint.x, cornerPoint.y,
                corner.x, corner.y,
                cornerCenter.x, cornerCenter.y,
                a0.x, a0.y);

            stroke(colors[1]);
            
            curve(cornerPoint.x - 5, cornerPoint.y,
                corner.x - 5, corner.y,
                cornerCenter.x, cornerCenter.y,
                a0.x, a0.y);

            curve(cornerPoint.x, cornerPoint.y - 5,
                corner.x, corner.y- 5,
                cornerCenter.x, cornerCenter.y,
                a0.x, a0.y);
        pop();

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