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
    context.arc(x, y, r, 0, 2*Math.PI);
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
    ball.y += ball.VelocityY;

    //detecção de colição com a corda superior e inferior
    if(ball.y + ball.radius > canvas.height || ball.y - ball.canvas < 0){
        ball.VelocityY = -ball.VelocityY;
    }

    //detecta colição com a borda esquerda e direita
    if(ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    } else if(ball.x - ball.radius < 0){
        computer.score++;
        resetBall();
    }

    //detecção com a raquete
    let player = (ball.x < canvas.width/2) ? user : computer

    if(colision(ball, player)){
        ball.velocityX = -ball.velocityX;
    }
};

//Sistema de Colisão
function colision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.botoom;
}

function resetBall(){
    ball.x = canvas.width/2
    ball.y = canvas.hight/2
    ball.velocityX = -ball.velocityX
    ball.speed = 7;
}

function game(){
    render();
}

//loop do jogo
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);