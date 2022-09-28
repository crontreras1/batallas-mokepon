//startGame ()
const selectAttackPlayer = document.getElementById ('select-attack');
const restartSection = document.getElementById ('restart');
const buttonSelectPet = document.getElementById ('button-select-pet');
const restartButton = document.getElementById ('button-restart')

const cardsContainer = document.getElementById ('cards-container')

//selectPetPlayer ()
const alreadySelectPet = document.getElementById ('select-pet');
const spanPetPlayer = document.getElementById ('pet-player');

//selectPetEnemy ()
const spanPetEnemy = document.getElementById ('pet-enemy');

//combatResults ()
const spanPlayerLife = document.getElementById ('player-lifes');
const spanEnemyLife = document.getElementById ('enemy-lifes');

//createMessage() 
const sectionMessage = document.getElementById ('result');
const playerAttackMessage = document.getElementById ('player-attack-message');
const enemyAttackMessage = document.getElementById ('enemy-attack-message');

// showAttaks ()
const attacksContainer = document.getElementById ('attaks-container')

let mokepons = []
let playerAttack
let enemyAttack
let mokeponOptions 
let inputHipodoge
let inputCapipepo 
let inputRatigueya 
let petPlayer
let mokeponAttacks
let fireButton 
let waterButton 
let earthButton 
let buttons = []
let playerLifes = 3
let enemyLifes = 3

class Mokepon {
    constructor (name, image, life) {
        this.name = name
        this.image = image
        this.life = life
        this.attacks = []
    }
}

let hipodoge = new Mokepon ('Hipodoge', './assets/mokepon-hipodoge.png', 5)
let capipepo = new Mokepon ('Capipepo', './assets/mokepon-capipepo.png', 5)
let ratigueya = new Mokepon ('Ratigueya', './assets/mokepon-ratigueya.png', 5)

hipodoge.attacks.push (
    {name: '💧', id: 'water-button'},
    {name: '💧', id: 'water-button'},
    {name: '💧', id: 'water-button'},
    {name: '🔥', id: 'fire-button'},
    {name: '🌱', id: 'earth-button'},
)

capipepo.attacks.push (
    {name: '🌱', id: 'earth-button'},
    {name: '🌱', id: 'earth-button'},
    {name: '🌱', id: 'earth-button'},
    {name: '💧', id: 'water-button'},
    {name: '🔥', id: 'fire-button'},
)

ratigueya.attacks.push (
    {name: '🔥', id: 'fire-button'},
    {name: '🔥', id: 'fire-button'},
    {name: '🔥', id: 'fire-button'},
    {name: '🌱', id: 'earth-button'},
    {name: '💧', id: 'water-button'},
)

mokepons.push (hipodoge, capipepo, ratigueya)

function startGame () {   
    selectAttackPlayer.style.display = 'none'; 
    
    mokepons.forEach ((mokepon) => {
       mokeponOptions = `
        <input type="radio" name="pet" id=${mokepon.name}/>
        <label class="mokepon-card" for=${mokepon.name}>
            <p>${mokepon.name}</p>
            <img src=${mokepon.image} alt=${mokepon.name}>
        </label>
       `
       
       cardsContainer.innerHTML += mokeponOptions
       
       inputHipodoge = document.getElementById('Hipodoge')
       inputCapipepo = document.getElementById('Capipepo')
       inputRatigueya = document.getElementById('Ratigueya')
    })  

    buttonSelectPet.addEventListener ('click', selectPetPlayer);      
    restartButton.addEventListener ('click', restartGame);
}

function selectPetPlayer () {
    
    selectAttackPlayer.style.display = 'flex';    
    alreadySelectPet.style.display = 'none';

    if (inputHipodoge.checked) {
        spanPetPlayer.innerHTML = `Mokepon: ${inputHipodoge.id}`;
        petPlayer = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanPetPlayer.innerHTML = `Mokepon: ${inputCapipepo.id}`;
        petPlayer = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanPetPlayer.innerHTML = `Mokepon: ${inputRatigueya.id}`;
        petPlayer = inputRatigueya.id
    } else {
        alert ('Primero tienes que seleccionar una mascota');
        restartGame ();
    }

    extractAttack (petPlayer)
    selectPetEnemy ()
}

function selectPetEnemy () {
    let randomPetEnemy = randomFunc (0, mokepons.length - 1);

    spanPetEnemy,innerHTML = mokepons [randomPetEnemy].name
}

function extractAttack (petPlayer) {
    let attacks
    for (let i = 0; i < mokepons.length; i++) {
        if (petPlayer === mokepons[i].name) {
            attacks = mokepons[i].attack
        }       
    }
    
    showAttacks (attacks)
}

function showAttacks (attacks) {
    attacks.forEach ((attack) => {
        mokeponAttacks = `
        <button id=${attack.id} class="attack-button attackBtn">${attack.name}</button>
        `

        attacksContainer.innerHTML += mokeponAttacks
    })

    fireButton = document.getElementById ('fire-button')
    waterButton = document.getElementById ('water-button')
    earthButton = document.getElementById ('earth-button')
    buttons = document.querySelectorAll ('.attackBtn')


    fireButton.addEventListener ('click', fireAttack)   
    waterButton.addEventListener ('click', waterAttack)    
    earthButton.addEventListener ('click', earthAttack)  
}

function sequenceAttack () {
    
}

function fireAttack () {
    playerAttack = 'FUEGO 🔥'
    randomEnemyAttack ();
}

function waterAttack () {
    playerAttack = 'AGUA 💧'
    randomEnemyAttack ();
}

function earthAttack () {
    playerAttack = 'TIERRA 🌱'
    randomEnemyAttack ();
}

function randomEnemyAttack () {
    let randomPetEnemy = randomFunc (1, 3);

    if (randomPetEnemy == 1) {
        enemyAttack = 'FUEGO 🔥';
    } else if (randomPetEnemy == 2) {
        enemyAttack = 'AGUA 💧';
    } else {
        enemyAttack = 'TIERRA 🌱';
    }

    combatResults ();
}

function combatResults () {

    if (enemyAttack == playerAttack) {
        createMessage ('Empate')
    } else if (playerAttack == 'FUEGO 🔥' && enemyAttack == 'TIERRA 🌱') {
        createMessage ('Ganaste, Maestro Mokepon');
        enemyLifes--;
        spanEnemyLife.innerHTML = `Vidas: ${enemyLifes}`;
    } else if (playerAttack == 'AGUA 💧' && enemyAttack == 'FUEGO 🔥') {
        createMessage ('Ganaste, Maestro Mokepon');
        enemyLifes--;
        spanEnemyLife.innerHTML = `Vidas: ${enemyLifes}`;
    } else if (playerAttack == 'TIERRA 🌱' && enemyAttack == 'AGUA 💧') {
        createMessage ('Ganaste, Maestro Mokepon');
        enemyLifes--;
        spanEnemyLife.innerHTML = `Vidas: ${enemyLifes}`;
    } else {
        createMessage ('Eres el gran perdedor');
        playerLifes --;
        spanPlayerLife.innerHTML = `Vidas: ${playerLifes}`;
    }

    lifes ();
}

function lifes () {
    if (enemyLifes == 0) {
        createFinalMessage ('Felicitaciones, maestro Mokepon, haz ganado.')
    } else if (playerLifes == 0) {
        createFinalMessage ('Buhhhh, perdedor!!')
    }
}

function createMessage (result) {
    sectionMessage.innerHTML = result;

    let newPlayerAttack = document.createElement ('p');
    newPlayerAttack.innerHTML = playerAttack;

    let newEnemyAttack = document.createElement ('p');
    newEnemyAttack.innerHTML = enemyAttack;

    // let paragraph = document.createElement ('p');
    // paragraph.innerHTML = `Tu mascota atacó con ${playerAttack}, tu enemigo con ${enemyAttack} - ${result}`;

    playerAttackMessage.appendChild (newPlayerAttack);
    enemyAttackMessage.appendChild (newEnemyAttack);
}

function createFinalMessage (finalResult) {
    restartSection.style.display = 'flex';

    sectionMessage.innerHTML = finalResult;

    fireButton.disabled = true;
    waterButton.disabled = true;
    earthButton.disabled = true;
}

function randomFunc (min, max) {
    return Math.floor( Math.random () * (max - min + 1) + min);
}

function restartGame () {
    location.reload ();
}

window.addEventListener ('load', startGame)