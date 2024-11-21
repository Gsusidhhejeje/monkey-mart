let monkey;
let banana;
let obstacle;
let gameArea;
let score = 0;
let gameInterval;
let bananaInterval;
let obstacleInterval;

const startGame = () => {
    // Initialize game
    score = 0;
    document.getElementById('score').textContent = score;
    gameArea = document.getElementById('gameArea');
    monkey = document.getElementById('monkey');
    banana = document.getElementById('banana');
    obstacle = document.getElementById('obstacle');

    // Reset positions
    monkey.style.left = '200px';
    monkey.style.bottom = '20px';

    banana.style.display = 'none';
    obstacle.style.display = 'none';

    // Start the game loop
    gameInterval = setInterval(gameLoop, 20);

    // Start spawning bananas and obstacles
    bananaInterval = setInterval(spawnBanana, 3000);
    obstacleInterval = setInterval(spawnObstacle, 4000);
};

const gameLoop = () => {
    // Check for collisions with obstacles
    const monkeyRect = monkey.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    if (
        monkeyRect.left < obstacleRect.left + obstacleRect.width &&
        monkeyRect.left + monkeyRect.width > obstacleRect.left &&
        monkeyRect.top < obstacleRect.top + obstacleRect.height &&
        monkeyRect.top + monkeyRect.height > obstacleRect.top
    ) {
        endGame();
        alert("Game Over! You hit an obstacle.");
    }

    // Check for collisions with bananas
    const bananaRect = banana.getBoundingClientRect();
    if (
        monkeyRect.left < bananaRect.left + bananaRect.width &&
        monkeyRect.left + monkeyRect.width > bananaRect.left &&
        monkeyRect.top < bananaRect.top + bananaRect.height &&
        monkeyRect.top + monkeyRect.height > bananaRect.top
    ) {
        score++;
        document.getElementById('score').textContent = score;
        resetBanana();
    }
};

const spawnBanana = () => {
    const randomX = Math.random() * (gameArea.offsetWidth - 40);
    const randomY = Math.random() * (gameArea.offsetHeight - 40);
    banana.style.left = `${randomX}px`;
    banana.style.top = `${randomY}px`;
    banana.style.display = 'block';
};

const spawnObstacle = () => {
    const randomX = Math.random() * (gameArea.offsetWidth - 40);
    const randomY = Math.random() * (gameArea.offsetHeight - 40);
    obstacle.style.left = `${randomX}px`;
    obstacle.style.top = `${randomY}px`;
    obstacle.style.display = 'block';
};

const resetBanana = () => {
    banana.style.display = 'none';
    setTimeout(spawnBanana, 1000);
};

const moveMonkey = (event) => {
    const key = event.key;
    const monkeyRect = monkey.getBoundingClientRect();

    if (key === 'ArrowUp' && monkeyRect.top > 0) {
        monkey.style.top = `${monkeyRect.top - 5}px`;
    } else if (key === 'ArrowDown' && monkeyRect.top < gameArea.offsetHeight - monkeyRect.height) {
        monkey.style.top = `${monkeyRect.top + 5}px`;
    } else if (key === 'ArrowLeft' && monkeyRect.left > 0) {
        monkey.style.left = `${monkeyRect.left - 5}px`;
    } else if (key === 'ArrowRight' && monkeyRect.left < gameArea.offsetWidth - monkeyRect.width) {
        monkey.style.left = `${monkeyRect.left + 5}px`;
    }
};

const endGame = () => {
    clearInterval(gameInterval);
    clearInterval(bananaInterval);
    clearInterval(obstacleInterval);
    alert("Game Over! Final Score: " + score);
};

document.addEventListener('keydown', moveMonkey);
