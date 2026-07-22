// ==========================================
// RUSSIAN ROULETTE GAME LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const menuScene = document.getElementById("menu-scene");
  const gameScene = document.getElementById("game-scene");
  const taskbar = document.getElementById("taskbar");
  const fadeOverlay = document.getElementById("fade-overlay");
  
  const botImg = document.getElementById("bot");
  const handsImg = document.getElementById("hands");
  const revolverImg = document.getElementById("revolver");

  const startBtn = document.getElementById("start-btn");
  const spinBtn = document.getElementById("spin-btn");
  const triggerSelfBtn = document.getElementById("trigger-self-btn");
  const shootOpponentBtn = document.getElementById("shoot-opponent-btn");

  const chamberCount = 6;
  let loadedChamber = -1;
  let currentChamber = 0;
  let isGameOver = false;

  const ASSETS = {
    botAlive: "media/bot-rough.png",
    botDead: "media/dead-bot-rough.png",
    handsUp: "media/hands-up.png",
    handsDown: "media/hands-down.png",
    tableUp: "media/table-up.png",
    tableDown: "media/table-down.png"
  };

  // --- MENU TO GAME TRANSITION ---
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      fadeOverlay.classList.add("fade-in");

      setTimeout(() => {
        menuScene.style.display = "none";
        gameScene.style.display = "flex";
        taskbar.style.display = "flex";

        setTimeout(() => {
          fadeOverlay.classList.remove("fade-in");
        }, 100);
      }, 800);
    });
  }

  // --- GAMEPLAY FUNCTIONS ---
  function spinCylinder() {
    if (isGameOver) return;
    
    loadedChamber = Math.floor(Math.random() * chamberCount);
    currentChamber = 0;
    
    // Animation removed completely as requested
    alert(`Cylinder spun! Bullet is loaded.`);
  }

  function pullTriggerSelf() {
    if (isGameOver) return;
    if (loadedChamber === -1) {
      spinCylinder();
    }

    if (currentChamber === loadedChamber) {
      isGameOver = true;
      alert("BANG! You shot yourself. Game Over!");
      disableButtons();
    } else {
      alert("*CLICK* ... Safe.");
      currentChamber = (currentChamber + 1) % chamberCount;
    }
  }

  function shootOpponent() {
    if (isGameOver) return;
    if (loadedChamber === -1) {
      spinCylinder();
    }

    if (currentChamber === loadedChamber) {
      isGameOver = true;
      botImg.src = ASSETS.botDead;
      alert("BANG! You eliminated the opponent. You Win!");
      disableButtons();
    } else {
      alert("*CLICK* ... Opponent survived.");
      currentChamber = (currentChamber + 1) % chamberCount;
    }
  }

  function disableButtons() {
    if (spinBtn) spinBtn.disabled = true;
    if (triggerSelfBtn) triggerSelfBtn.disabled = true;
    if (shootOpponentBtn) shootOpponentBtn.disabled = true;
  }

  // --- EVENT LISTENERS ---
  if (spinBtn) spinBtn.addEventListener("click", spinCylinder);
  if (triggerSelfBtn) triggerSelfBtn.addEventListener("click", pullTriggerSelf);
  if (shootOpponentBtn) shootOpponentBtn.addEventListener("click", shootOpponent);
});
