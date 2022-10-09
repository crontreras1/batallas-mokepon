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
const attacksContainer = document.getElementById ('attacks-container')

const viewMapSection = document.getElementById ('view-map')
const mapa = document.getElementById ('mapa')

let mokepons = []
let playerAttack = []
let enemyAttack = []
let mokeponOptions 
let inputHipodoge
let inputCapipepo 
let inputRatigueya 
let petPlayer
let petPlayerObject
let mokeponAttacksmapBackground
let mokeponEnemyAttacks
let fireButton 
let waterButton 
let earthButton 
let buttons = []
let indexPlayerAttack 
let indexEnemyAttack 
let playerVictories = 0
let enemyVictories = 0
// let playerLifes = 3
// let enemyLifes = 3
let canvas = mapa.getContext ('2d')
let interval
let mapBackground = new Image ()
mapBackground.src = './assets/mokemap.png'
let heightMap
let widthMap = window.innerWidth - 20
const maxWidthMap = 350 

if (widthMap > maxWidthMap) {
    widthMap = maxWidthMap - 20
}

heightMap = widthMap * 600 / 800

mapa.width = widthMap
mapa.height = heightMap

class Mokepon {
    constructor (name, image, life, imageMap) {
        this.name = name
        this.image = imageMap
        this.life = life
        this.attacks = []
        this.width = 30
        this.height = 30
        this.x = randomFunc (0, mapa.width - this.width)
        this.y = randomFunc (0, mapa.height - this.height)
        this.mapaImage = new Image ()
        this.mapaImage.src = image
        this.speedX = 0
        this.speedY = 0
    }

    paintMokepon () {
        canvas.drawImage (
            this.mapaImage,
            this.x,
            this.y,
            this.width,
            this.height 
        )
    }
}

let hipodoge = new Mokepon ('Hipodoge', './assets/mokepon-hipodoge.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon ('Capipepo', './assets/mokepon-capipepo.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon ('Ratigueya', './assets/mokepon-ratigueya.png', 5,'./assets/ratigueya.png' )

let hipodogeEnemy = new Mokepon ('Hipodoge', './assets/mokepon-hipodoge.png', 5, './assets/hipodoge.png')
let capipepoEnemy = new Mokepon ('Capipepo', './assets/mokepon-capipepo.png', 5, './assets/capipepo.png')
let ratigueyaEnemy = new Mokepon ('Ratigueya', './assets/mokepon-ratigueya.png', 5,'./assets/ratigueya.png')

hipodoge.attacks.push (
    {name: '💧', id: 'water-button'},
    {name: '💧', id: 'water-button'},
    {name: '💧', id: 'water-button'},
    {name: '🔥', id: 'fire-button'},
    {name: '🌱', id: 'earth-button'},
)

// hipodogeEnemy.attacks.push (
//     {name: '💧', id: 'water-button'},
//     {name: '💧', id: 'water-button'},
//     {name: '💧', id: 'water-button'},
//     {name: '🔥', id: 'fire-button'},
//     {name: '🌱', id: 'earth-button'},
// )

capipepo.attacks.push (
    {name: '🌱', id: 'earth-button'},
    {name: '🌱', id: 'earth-button'},
    {name: '🌱', id: 'earth-button'},
    {name: '💧', id: 'water-button'},
    {name: '🔥', id: 'fire-button'},
)

// capipepoEnemy.attacks.push (
//     {name: '🌱', id: 'earth-button'},
//     {name: '🌱', id: 'earth-button'},
//     {name: '🌱', id: 'earth-button'},
//     {name: '💧', id: 'water-button'},
//     {name: '🔥', id: 'fire-button'},
// )

ratigueya.attacks.push (
    {name: '🔥', id: 'fire-button'},
    {name: '🔥', id: 'fire-button'},
    {name: '🔥', id: 'fire-button'},
    {name: '🌱', id: 'earth-button'},
    {name: '💧', id: 'water-button'},
)

// ratigueyaEnemy.attacks.push (
//     {name: '🔥', id: 'fire-button'},
//     {name: '🔥', id: 'fire-button'},
//     {name: '🔥', id: 'fire-button'},
//     {name: '🌱', id: 'earth-button'},
//     {name: '💧', id: 'water-button'},
// )

mokepons.push (hipodoge, capipepo, ratigueya)

function startGame () {   
    selectAttackPlayer.style.display = 'none'
    viewMapSection.style.display = 'none'
    
    mokepons.forEach ((mokepon) => {
       mokeponOptions = `
        <input type="radio" name="pet" id=${mokepon.name} />
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
    alreadySelectPet.style.display = 'none'
    viewMapSection.style.display ='flex'

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
    
    extractAttacks (petPlayer)
    startMap ()
}

function extractAttacks (petPlayer) {
    let attacks
    for (let i = 0; i < mokepons.length; i++) {
        if (petPlayer === mokepons[i].name) {
            attacks = mokepons[i].attacks
        }       
    }
    
    showAttacks (attacks)
}

function showAttacks (attacks) {
    attacks.forEach((attack) => {
        mokeponAttacks = `
        <button id=${attack.id} class="attack-button attackBtn"> ${attack.name} </button>
        `
        
        attacksContainer.innerHTML += mokeponAttacks
    })
    
    fireButton = document.getElementById ('fire-button')
    waterButton = document.getElementById ('water-button')
    earthButton = document.getElementById ('earth-button')
    buttons = document.querySelectorAll ('.attackBtn')
}

function sequenceAttack () {
    buttons.forEach ((button) => {
        button.addEventListener ('click', (e) => {

            if (e.target.textContent === ' 🔥 ') {
                playerAttack.push ('FUEGO')
                console.log (playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else if (e.target.textContent === ' 💧 ') {
                playerAttack.push ('AGUA')
                console.log (playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else {
                playerAttack.push ('TIERRA')
                console.log (playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            }

            randomEnemyAttack ()
        })
    })
}

function selectPetEnemy (enemy) {
    spanPetEnemy.innerHTML = `Mokepon: ${enemy.name}`
    mokeponEnemyAttacks = `ataques: ${enemy.attacks}`
    sequenceAttack ()
}

function randomEnemyAttack () {
    console.log ('ataques enemigo ', mokeponEnemyAttacks)
    let randomPetEnemy = randomFunc (0, mokeponEnemyAttacks.length - 1);

    if (randomPetEnemy == 0 || randomPetEnemy == 1) {
        enemyAttack.push ('FUEGO');
    } else if (randomPetEnemy == 3 || randomPetEnemy == 4) {
        enemyAttack.push ('AGUA');
    } else {
        enemyAttack.push ('TIERRA');
    }

    console.log (enemyAttack)
    startFight ()
}

function startFight () {
    if (playerAttack.length === 5) {
        combatResults ();
    }
}

function indexBothOponents (player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}

function combatResults () {

    for (let index = 0; index < playerAttack.length; index++) {
        if (playerAttack[index] === enemyAttack[index]) {
            indexBothOponents (index, index)
            createMessage ('Empate')
            // playerVictories++
            // spanEnemyLife.innerHTML = `Victorias: ${enemyLifes}`;
        } else if (playerAttack[index] === 'FUEGO' && enemyAttack[index]  === 'TIERRA') {
            indexBothOponents (index, index)
            createMessage ('Ganaste, Maestro Mokepon');
            playerVictories++
            spanPlayerLife.innerHTML = `Victorias: ${playerVictories}`;
        } else if (playerAttack[index] === 'AGUA' && enemyAttack[index]  === 'FUEGO') {
            indexBothOponents (index, index)
            createMessage ('Ganaste, Maestro Mokepon');
            playerVictories++
            spanPlayerLife.innerHTML = `Victorias: ${playerVictories}`;
        } else if (playerAttack[index] === 'TIERRA' && enemyAttack[index] === 'AGUA')  {
            indexBothOponents (index, index)
            createMessage ('Ganaste, Maestro Mokepon');
            playerVictories++
            spanPlayerLife.innerHTML = `Victorias: ${playerVictories}`;
        } else {
            indexBothOponents (index, index)
            createMessage ('Perdiste')
            enemyVictories++
            spanEnemyLife.innerHTML = `Victorias: ${enemyVictories}`;
        }
    }

    victories ();
}

function victories () {
    if (playerVictories === enemyVictories) {
        createFinalMessage ('Esto fue un empate')
    } else if (playerVictories > enemyVictories) {
        createFinalMessage ('Ganaste, maestro mokepon!!')
    } else {
        createFinalMessage ('Buhhh, eres el gran perdedor')
    }
    console.log (enemyVictories)
}

function createMessage (result) {
    sectionMessage.innerHTML = result;

    let newPlayerAttack = document.createElement ('p');
    newPlayerAttack.innerHTML = indexPlayerAttack;

    let newEnemyAttack = document.createElement ('p');
    newEnemyAttack.innerHTML = indexEnemyAttack;

    playerAttackMessage.appendChild (newPlayerAttack);
    enemyAttackMessage.appendChild (newEnemyAttack);
    console.log (enemyAttackMessage)
}

function createFinalMessage (finalResult) {
    restartSection.style.display = 'flex';

    sectionMessage.innerHTML = finalResult;
}

function randomFunc (min, max) {
    return Math.floor( Math.random () * (max - min + 1) + min);
}

function restartGame () {
    location.reload ();
}

function drawCanvas () {
    petPlayerObject.x = petPlayerObject.x + petPlayerObject.speedX
    petPlayerObject.y = petPlayerObject.y + petPlayerObject.speedY
    canvas.clearRect (0, 0, mapa.width, mapa.height)
    canvas.drawImage (
        mapBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    petPlayerObject.paintMokepon ()
    hipodogeEnemy.paintMokepon ()
    capipepoEnemy.paintMokepon ()
    ratigueyaEnemy.paintMokepon ()

    if (petPlayer.speedX !== 0 || petPlayer.speedY !== 0) {
        reviewCollision (hipodogeEnemy)
        reviewCollision (capipepoEnemy)
        reviewCollision (ratigueyaEnemy)
    }
}

function moveMokeponRight () {
    petPlayerObject.speedX = 5
}

function moveMokeponLeft () {
    petPlayerObject.speedX = -5
}

function moveMokeponDown () {
    petPlayerObject.speedY = 5
}

function moveMokeponUp () {
    petPlayerObject.speedY = -5
}

function stopMove () {
    petPlayerObject.speedX = 0
    petPlayerObject.speedY = 0
}

function keyTap (event) {
    switch (event.key) {
        case 'ArrowUp':
            moveMokeponUp ()
            break;
        case 'ArrowDown':
            moveMokeponDown ()
            break;
        case 'ArrowLeft':
            moveMokeponLeft ()
            break;
        case 'ArrowRight':
            moveMokeponRight ()
            break;    
        default:
            break;
    }
}

function startMap () {
    petPlayerObject = getPetObject (petPlayer)
    interval = setInterval (drawCanvas, 50)

    window.addEventListener ('keydown', keyTap)
    window.addEventListener ('keyup', stopMove)
}

function getPetObject () {
    for (let i = 0; i < mokepons.length; i++) {
        if (petPlayer === mokepons[i].name) {
            return mokepons[i]
        }       
    }
}

function reviewCollision (enemy) {
    const topEnemy = enemy.y
    const bottomEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    const leftEnemy = enemy.x
    
    const topPet = petPlayerObject.y
    const bottomPet = petPlayerObject.y + petPlayerObject.height
    const rightPet = petPlayerObject.x + petPlayerObject.width
    const leftPet = petPlayerObject.x

    if (bottomPet < topEnemy  || 
        topPet > bottomEnemy ||
        rightPet < leftEnemy ||
        leftPet > rightEnemy
        ) {
            return 
    }

    stopMove ()
    console.log('Se detectó una colisión');
    clearInterval (interval)
    viewMapSection.style.display ='none'
    selectAttackPlayer.style.display = 'flex'
    selectPetEnemy (enemy)
}

window.addEventListener ('load', startGame)