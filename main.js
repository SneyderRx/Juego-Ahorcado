// Diccionario
const words = ["javascript", "python", "java", "csharp", "ruby", "php", "swift", "kotlin", "typescript", "html", "caballo", "perro", "gato", "elefante", "jirafa", "leon", "tigre", "oso", "lobo", "zorro", "raton", "pajaro", "pez", "tortuga", "serpiente", "rana", "cocodrilo", "delfin", "ballena", "tiburon", "koala"];

const word = words[Math.floor(Math.random() * words.length)];
const wordContainer = document.getElementById("palabraOculta");
const intentosSpan = document.getElementById("intentos");
const partesAhorcado = document.querySelectorAll("#ahorcado .parte");
const lettersContainer = document.getElementById("letras");

let hiddenWord = "_".repeat(word.length);
let errores = 0;
const maxIntentos = partesAhorcado.length;

wordContainer.textContent = hiddenWord;
intentosSpan.textContent = maxIntentos - errores;

function mostrarParteAhorcado() {
  if (errores < partesAhorcado.length) {
    partesAhorcado[errores].style.display = "block";
    errores++;
    intentosSpan.textContent = maxIntentos - errores;
    if (errores === maxIntentos) {
      setTimeout(() => {
        alert("¡Perdiste! La palabra era: " + word);
        resetGame();
      }, 300);
    }
  }
}

function checkWin() {
  if (!hiddenWord.includes("_")) {
    setTimeout(() => {
      alert("¡Ganaste!");
      resetGame();
    }, 300);
  }
}

function resetGame() {
  hiddenWord = "_".repeat(word.length);
  errores = 0;
  wordContainer.textContent = hiddenWord;
  intentosSpan.textContent = maxIntentos - errores;
  partesAhorcado.forEach(parte => parte.style.display = "none");

  // Volver a habilitar los botones de las letras
  const botonesLetra = lettersContainer.querySelectorAll('boton-letra');
  botonesLetra.forEach(boton => {
    boton.disabled = false;
  });

  // Seleccionar una nueva palabra
  const newWordIndex = Math.floor(Math.random() * words.length);
  word = words[newWordIndex];
}

// Generar los botones de las letras usando el Web Component
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
letters.forEach(letter => {
  const Boton = document.createElement('boton-letra');
  Boton.setAttribute('letra', letter);
  Boton.addEventListener('letra-seleccionada', (event) => {
    const letraSeleccionada = event.detail;
    Boton.disabled = true;
    if (word.includes(letraSeleccionada)) {
      hiddenWord = hiddenWord.split("").map((l, index) => word[index] === letraSeleccionada ? letraSeleccionada : l).join("");
      wordContainer.textContent = hiddenWord;
      checkWin();
    } else {
      mostrarParteAhorcado();
    }
  });
  lettersContainer.appendChild(Boton);
});

// Botón de reiniciar
const resetButton = document.createElement('button');
resetButton.textContent = 'Reiniciar';
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);