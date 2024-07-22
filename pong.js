const canvas = document.getElementById('pong')
const context = canvas.getContext('2d')

//criação da bola
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    VelocityY: 5,
    speed: 7,
    color: 'WHITE'
};

//criação da raquete
const user = {
    x: 0,
    y: (canvas.height -100) / 2,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
};

//Boot do player2
const computer = {
    x: canvas.width -10,
    y: (canvas.height -100) / 2,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
};

//Desenho do Player
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

//desenho da Bola
function drawCircle(x, y, r, color){
    context.fillStyle = color;

}