let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let marker = {
    x: 350,
    y: 0
};
let place = 'NONE';
let sand = [{
    x: -25,
    y: -25
}];
let water = [{
    x: -25,
    y: -25
}];
let direction = 'NONE';

setInterval(update, 10);
document.addEventListener('keydown', keyDown);

render();

function render() {
    //backdrop
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //marker
    renderMarker(marker.x, marker.y);

    //water
    ctx.fillStyle = "blue";
    renderWater();

    //sand
    ctx.fillStyle = "yellow";
    renderSand();


    requestAnimationFrame(render);
}

function update() {
    updateMarker();
    updateSand();
    updateWater();
}

// Marker
function renderMarker(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(marker.x, marker.y, 25, 25);
}

function updateMarker() {
    if (direction == 'LEFT') {
        marker.x -= 25;
        direction = 'NONE';
    }
    if (direction == 'RIGHT') {
        marker.x += 25;
        direction = 'NONE';
    }
    if (place == 'SAND') {
        placeSand(marker.x, marker.y + 25);
        place = 'NONE';
    }
    if (place == 'WATER') {
        placeWater(marker.x, marker.y + 25);
        place = 'NONE';
    }
}

function keyDown(e) {
    if (e.keyCode == 32) {
        place = 'SAND';
    }
    if (e.keyCode == 65) {
        place = 'WATER';
    }
    if (e.keyCode == 37) {
        direction = 'LEFT';
    }
    if (e.keyCode == 39) {
        direction = 'RIGHT';
    }
}

// Sand
function renderSand() {
    sand.forEach(e => {
        ctx.fillRect(e.x, e.y, 25, 25);
    });
}

function updateSand() {
    sand.forEach(e => {
        if (e.y + 25 < canvas.height) {
            if (!findSand(e.x, e.y + 25)) e.y++;
            else rollSand(e);
        }
    });
}

function rollSand(e) {
    if (!findSand(e.x + 25, e.y + 25)) e.x += 25;
    if (!findSand(e.x - 25, e.y + 25)) e.x -= 25;
}

function findSand(x, y) {
    for (var i = 0; i < sand.length; i++) {
        if (sand[i].x == x && sand[i].y == y) return true;
    }
    return false;
}

function placeSand(x, y) {
    sand = [{
        x: x,
        y: y
    }, ...sand];
}

// Water
function renderWater() {
    water.forEach(e => {
        ctx.fillRect(e.x, e.y, 25, 25);
    });
}

function updateWater() {
    water.forEach(e => {
        if (e.y + 25 < canvas.height) {
            if (!findBlock(e.x, e.y + 25)) e.y++;
            else flowWater(e);
        }
        if ((findWater(e.x, e.y + 25) && !findWater(e.x + 25, e.y) || (findWater(e.x, e.y + 25) && !findWater(e.x - 25, e.y)))) flattenWater(e);
    });
}

function findWater(x, y) {
    for (var i = 0; i < water.length; i++) {
        if (water[i].x == x && water[i].y == y) return true;
    }
    return false;
}

function flowWater(e) {
    if (!findBlock(e.x + 25, e.y + 25)) e.x += 25;
    if (!findBlock(e.x - 25, e.y + 25)) e.x -= 25;
}

function flattenWater(e) {
    if (!findWater(e.x + 25, e.y + 25))
        e.x += 25;
    if (!findWater(e.x - 25, e.y + 25))
        e.x -= 25;
}

function placeWater(x, y) {
    water = [{
        x: x,
        y: y
    }, ...water];
}

// Blocks combined
function findBlock(x, y) {
    if (findSand(x, y)) return true;
    if (findWater(x, y)) return true;

    return false;
}