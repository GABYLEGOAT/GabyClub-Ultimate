// --- GESTION INTERFACE ---
function showNews() {
    document.getElementById('newsletter-content').style.display = 'block';
    const btnRead = document.getElementById('btn-read');
    btnRead.innerText = "J'AI TOUT LU !";
    btnRead.onclick = closeNewsletter;
}

function closeNewsletter() {
    document.getElementById('newsletter-overlay').style.display = 'none';
}

function toggleDarkMode() { 
    document.body.classList.toggle('dark-mode'); 
}

let clicks = 0;
function addFanClick() {
    clicks++;
    document.getElementById('click-count').innerText = clicks;
}

// --- LOGIQUE DU JEU PONG ---
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
let ballX = 350, ballY = 200, dx = 4, dy = 4;
let paddleY = 150, aiY = 150;
let score = 0, level = 1;

let highScore = localStorage.getItem("gabyClubHighScore") || 0;
document.getElementById('high-score').innerText = highScore;

canvas.addEventListener('mousemove', e => {
    let rect = canvas.getBoundingClientRect();
    paddleY = (e.clientY - rect.top) * (canvas.height / rect.height) - 40;
});

function resetGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("gabyClubHighScore", highScore);
        document.getElementById('high-score').innerText = highScore;
    }
    ballX = 350; ballY = 200;
    dx = 4 * (dx > 0 ? -1 : 1);
    dy = 4;
    score = 0; level = 1;
    document.getElementById('score-display').innerText = score;
    document.getElementById('level-display').innerText = level;
}

function draw() {
    ctx.fillStyle = "#000"; ctx.fillRect(0,0,700,400);
    
    // Paddle Joueur
    ctx.fillStyle = "#edff00"; 
    ctx.fillRect(0, paddleY, 10, 80); 

    // IA Invincible
    aiY = ballY - 40; 
    if(aiY < 0) aiY = 0;
    if(aiY > 320) aiY = 320;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(690, aiY, 10, 80); 

    // Balle
    ctx.fillStyle = "#edff00";
    ctx.beginPath(); ctx.arc(ballX, ballY, 8, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke(); 

    ballX += dx; ballY += dy;

    if(ballY < 0 || ballY > 400) dy = -dy;

    // Collision Joueur
    if(ballX < 10 && ballY > paddleY && ballY < paddleY + 80) {
        dx = Math.abs(dx);
        score++;
        document.getElementById('score-display').innerText = score;
        if(score % 3 === 0) {
            level++;
            dx *= 1.15; dy *= 1.15;
            document.getElementById('level-display').innerText = level;
        }
    }
    
    // Collision IA
    if(ballX > 690 && ballY > aiY && ballY < aiY + 80) dx = -Math.abs(dx);

    if(ballX < 0 || ballX > 700) resetGame();

    requestAnimationFrame(draw);
}
draw();