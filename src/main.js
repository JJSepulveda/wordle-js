/*
Main logic
*/

const WORD_TOTAL_LENGTH = 6
const FIELD_ROWS = 5
const FIELD_COLORS = ['green', 'yellow', 'gray']

const keyboardLetters = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm','delete']
]
// Esto no me gusta, si cambio el nombre de la función esto quedaria
// desincronizados, busca una forma de solucionarlo despues.
const clickFunctions = {
	'enter': 'checkWord()',
	'delete': 'deleteLetter()',
	'default': 'pressLetter()'
}

const listElements = []
let myAnswer = []

// get a ramdo word
const getRandomWord = () => {
	number = Math.floor(Math.random() * WORDS_SET.length);
	word = WORDS_SET[number].toLowerCase()
	wordSplit = word.split('')
	return wordSplit;
}

let secretWord = getRandomWord()

keyboardLetters.map((letters) => {
	// Este map es para crear el teclado en el html.
	const list = document.createElement("ul");

	letters.map((letter) => {
		const listItem = document.createElement("li");

		const functionName = Boolean(clickFunctions[letter]) 
			? clickFunctions[letter]: clickFunctions['default'];

		listItem.innerHTML = `
			<button onclick="${functionName}" id="${letter}">
				${letter}
			</button>
		`;
		// Agrega al nodo listItem como nodo hijo del nodo list
		list.appendChild(listItem) 
	})

	// almacenamos los nodos ul en este arreglo para
	// posteriormente insertarlos en el nodo neceesario
	listElements.push(list)
});

// se usa append cuando quieres agregar mas de 1 nodo
keyboardSection.append(...listElements)


// Crear los campos dond se mostraran las letras escritas
let attempts = 0;
const rows = [];
for (let i = 0; i < FIELD_ROWS; i++) {
	const list = document.createElement("ul")
	list.classList.add("grid-row")

	for (let j = 0; j < WORD_TOTAL_LENGTH; j++) {
		const listItem = document.createElement("li")	
		listItem.classList.add("grid-item")
		listItem.id = `${i}${j}`
		list.appendChild(listItem)
	}

	rows.push(list)
}
grid.append(...rows)


const getField = () => {
	// Traemos el campo donde se debe imprimir la letra
	const currentField = document.getElementById(`${attempts}${myAnswer.length}`)
	return currentField;
}

const setFieldText = (field, text) => {
	field.innerText = text;
}	

const checkWord = () => {
	// Función para revisar si la palabra escrita es correcta
	console.log(myAnswer.join(''))
	
	if (!didYouWriteTheCorrectWordLength())
	{
		return;
	}

	if (!didYouHaveAttempts())
	{
		return;
	}

	if (myAnswer.join('') === secretWord.join(''))
	{
		const result = Array(WORD_TOTAL_LENGTH).fill(FIELD_COLORS[0])
		colorTheFields(result)
		console.log("Bien")
	}
	else
	{
		const result = checkWichWordsAreInTheCorrectPosition()
		colorTheFields(result)
		console.log(result)
	}

	// aumentamos el numero de intentos
	attempts += 1;
	// resetea lo que escribiste
	myAnswer = []
}

const deleteLetter = () => {
	// Función para borrar una letra
	myAnswer.pop()
	// ahora tenemos que obtener el field despues del pop
	// para poder borrar el carater correcto
	const currentField = getField();
	setFieldText(currentField, '')
	console.log(myAnswer)
}

const pressLetter = () => {
	// Función para agregar una letra
	const button = event.target;
	const currentField = getField();
	if (myAnswer.length < WORD_TOTAL_LENGTH)
	{
		setFieldText(currentField, button.id)
		myAnswer.push(button.id)
	}
	console.log(myAnswer)
}

const didYouHaveAttempts = () => {
	return attempts <= FIELD_ROWS;
}

const didYouWriteTheCorrectWordLength = () => {
	/*
	Retorna verdadero si la palabra escrita es del
	tamaño correcto
	*/
	return myAnswer.length === WORD_TOTAL_LENGTH
}

const checkWichWordsAreInTheCorrectPosition = () => {
	/* 	
	Revisar letra por letra cada palabra para
	saber si estan en la posición correcta.
	*/
	/*
	input: ['', '', '', ''], ['', '', '', '']
	output: [gray, green, yellow]
	yellow = si la letra existe en la variable secretWord y no esta en la posición correcta
	green = si la letra existe en la variable secretWord y esta en la posición correcta
	gray = si la letra no esta en la secretWord
	*/
	
	// const result = myAnswer.map(letter => {
	// 	
	// })
	if (!didYouWriteTheCorrectWordLength()) {
		console.log(`La resuesta debe tener ${WORD_TOTAL_LENGTH} letras y tu palabra tiene ${myAnswer.length}`)
		return null;
	}

	let result = []

	for (let i = 0; i < secretWord.length; i++){
		const actualLetter = myAnswer[i];
		if(actualLetter === secretWord[i]) {
			result.push(FIELD_COLORS[0]);
		}
		else if(secretWord.includes(actualLetter)) {
			result.push(FIELD_COLORS[1]);
		}
		else {
			result.push(FIELD_COLORS[2]);
		}
	}

	return result;
}

const colorTheFields = (colors) => {
	// colorea los campos de las letras
	colors.map((color, index) => {
		const field = document.getElementById(`${attempts}${index}`)
		field.classList.add(`field-${color}`)
	})
}

