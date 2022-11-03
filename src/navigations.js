/*
Logic for change the navigation.
*/
const pages = {
	menu: '',
	inGame: 'inGame',
	gameOver: 'gameOver'
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator()
{
	console.log(location)
	if(location.hash.startsWith(`#${pages.inGame}`)) {
		inGamePage();
	}
	else if(location.hash.startsWith(`#${pages.gameOver}`)) {
		gameOverPage();
	}
	else {
		menuPage();
	}

	// resetar el scroll
	document.body.scrollTop = 10;
	document.documentElement.scrollTop = 10;
}

function menuPage()
{

}

function inGamePage()
{
	
}

function gameOverPage()
{
	
}