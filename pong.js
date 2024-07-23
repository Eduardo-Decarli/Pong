const canvas = document.getElementById('pong')
const context = canvas.getContext('2d')

//criação da bola
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: 'WHITE'
};

//criação da raquete
const user = {
    x: 10,
    y: (canvas.height -100) / 2,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0,
    dy: 0
};

//Boot do player2
const computer = {
    x: canvas.width - 20,
    y: (canvas.height -100) / 2,
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0,
    speed: 5
};

//Evento de captura de tecla
document.addEventListener('keydown', movePaddle);
document.addEventListener('keyup', stopPaddle);

//Movimento do usuário
function movePaddle(event) {
    switch(event.keyCode) {
        case 38: //Seta para cima
            user.dy = -8;
            break;
        case 40: //Seta para baixo
            user.dy = 8;
            break;
    }
}

//Movimento das teclas soltas
function stopPaddle(event) {
    switch(event.keyCode){
        case 38:
        case 40:
            user.dy = 0;
            break;
    }
}

//Desenho do Player
function drawRect(x, y, w, h, color){
    //método define a cor utilizada na função drawRect
    context.fillStyle = color;
    //método utilizado para desenhar retângulos
    context.fillRect(x,y,w,h);
}

//Desenho da Bola
function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    //Método arc() Cria a curvatura da bola
    context.arc(x, y, r, 0, 2*Math.PI, false);
    context.closePath();
    context.fill();
}

//Desenho do Placar
function drawText(text, x, y, color){
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text, x, y);
}

//Renderização dos Elementos
function render(){
    //Limpa o canvas
    drawRect(0, 0, canvas.width, canvas.height, 'BLACK');

    //Desenho do Placar
    drawText(user.score, canvas.width / 4, canvas.height / 5, 'WHITE')
    drawText(computer.score, 3*canvas.width/4, canvas.height/5, 'WHITE')

    //Desenho da Bola
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    //Desenho das raquetes
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
}

//Lógica do jogo
function update(){
    //movimento da bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //Move a raquete do usuario
    user.y +=user.dy;

    //Impede que a raquete do usuario saia do canvas
    if(user.y < 0){
        user.y = 0;
    }else if(user.y +user.height > canvas.height){
        user.y = canvas.height - user.height;
    }

    //Move a raquete do computador
    if(ball.y < computer.y + computer.height/2){
        computer.y -= computer.speed;
    }else{
        computer.y += computer.speed;
    }

    //Impede que o computador saia do jogo
    if(computer.y < 0){
        computer.y = 0;
    }else if(computer.y + computer.height > canvas.height){
        computer.y = canvas.height - computer.height;
    }

    //detecção de colição com a corda superior e inferior
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    //detecta colição com a borda esquerda e direita
    if(ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    } else if(ball.x - ball.radius < 0){
        computer.score++;
        resetBall();
    }

    //colisão com a raquete
    let player = (ball.x < canvas.width/2) ? user : computer

    if(collision(ball, player)){
        //inverte a direção da bola
        ball.velocityX = -ball.velocityX;
    }
};

//Sistema de Colisão
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.velocityY = 5 * (Math.random()> 0.5 ? 1 : -1);
    ball.speed = 7;
}

function game(){
    update();
    render();
}

//loop do jogo
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);