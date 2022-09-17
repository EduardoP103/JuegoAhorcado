const word = document.getElementById('word');
const incorrect = document.getElementById('incorrect');
const incorrectLettersEl = document.querySelector('#incorrect p');
const backdrop = document.getElementById('backdrop');
const finalMsg = document.getElementById('final-msg');
const msgInfo = document.getElementById('msg-info');
const playBtn = document.getElementById('play');
const indication = document.getElementById('indication');
const bodyParts = document.getElementsByClassName('body-part');

// Lista de palabras
const wordList = [
  'python',
  'dart',
  'javascript',
  'php'
];

// Palabra que se selecciona para jugar
let selectedWord = null;
// Almacena el conteo del número de letras escritas incorrectamente
let incorrectCount = 0;
// Letras correctas escritas por el jugador
const correctLetters = [];
// Letras incorrectas escritas por el jugador
const incorrectLetters = [];

// Selecciona una palabra aleatoriamente de wordList e inicializa en el DOM
function initializeWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  const noOfLetters = selectedWord.length;
  for (let i = 0; i < noOfLetters; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
}


// Muestra una indicación deslizándose desde la parte inferior
function displayIndication() {
    indication.classList.add('visible');
  
    setTimeout(() => {
      indication.classList.remove('visible');
    }, 2400);
  }
  
  // Update the figure when incorrect letters typed
  function updateFigure() {
    try {
      bodyParts[incorrectCount].style.display = 'block';
      incorrectCount++;
    } catch (error) {}
  }
  
  // Cuando el jugador gana
  function successState() {
    setTimeout(() => {
      backdrop.classList.add('visible');
      finalMsg.classList.add('visible');
      msgInfo.textContent = '¡Ganaste. Felicidades!';
    }, 400);
  }
  
  // Cuando el jugador pierde
  function failureState() {
    setTimeout(() => {
      backdrop.classList.add('visible');
      finalMsg.classList.add('visible');
      msgInfo.textContent = `¡Fin del juego! "${selectedWord}"`;
    }, 400);
  }
  
  // Comprobar si la clave escrita es parte de la palabra seleccionada y actualizar en el DOM si es necesario
  function check(ev) {
    const letterElements = document.querySelectorAll('.word .letter');
    const character = ev.key;
  
  // Manejar eventos de teclado
    if (
      !backdrop.classList.contains('visible') &&
      !indication.classList.contains('visible') &&
      ev.keyCode >= 65 &&
      ev.keyCode <= 90
    ) {
      if (selectedWord.includes(character)) {
        if (correctLetters.includes(character)) {
          displayIndication();
        } else {
          correctLetters.push(character);
          const indexes = [];
          [...selectedWord].forEach((value, index) => {
            if (value === character) {
              indexes.push(index);
            }
          });
          indexes.forEach((value) => {
            letterElements[value].textContent = character;
          });
        }
      } else {
        if (incorrectLetters.includes(character)) {
          displayIndication();
        } else {
          incorrectLetters.push(character);
          if (!incorrect.classList.contains('visible')) {
            incorrect.classList.add('visible');
          }
          incorrectLettersEl.textContent = `${incorrectLetters.join(', ')}`;
          updateFigure();
        }
      }
    }
  
  // Crear una palabra a partir de todos los elementos de letras
    let formedWord = '';
    letterElements.forEach((value) => {
      formedWord += value.textContent;
    });
  
  // Comprobar si la palabra creada es correcta
    if (formedWord === selectedWord) {
      successState();
    }
  // Comprobar si el hombre fue colgado
    if (incorrectCount >= 6) {
      failureState();
    }
  }
  
  // Restablecer todas las variables y comenzar un nuevo juego
  function startNewGame() {
    selectedWord = null;
    incorrectCount = 0;
    correctLetters.splice(0);
    incorrectLetters.splice(0);
    word.innerHTML = '';
    Array.from(bodyParts).forEach((value) => {
      value.style.display = 'none';
    });
    incorrect.classList.remove('visible');
    backdrop.classList.remove('visible');
    finalMsg.classList.remove('visible');
    initializeWord();
  }
  
  // Comenzar el juego
  initializeWord();
  
  //Oir los eventos 
  
  window.addEventListener('keyup', check); // CUANDO SE PRESIONA UNA TECLA
  playBtn.addEventListener('click', startNewGame);
  
