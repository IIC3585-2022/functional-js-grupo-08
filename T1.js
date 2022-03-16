const readlineSync = require('readline-sync');

const initPlayer = (name) => ({ name, score: 501 });

const initGame = (name1, name2) => {
	console.log(`Juego inicializado con jugadores ${name1} y ${name2}`);
	return [initPlayer(name1), initPlayer(name2)];
};

const multiplierThrow = () => {
	const base = readlineSync.question(`Ingrese el puntaje base (1-20)\n`);
	const multiplier = readlineSync.question(`Ingrese el multiplicador (1-3)\n`);
	return parseInt(base) * parseInt(multiplier);
};

const makeThrow = (player, i) => {
	const choice = readlineSync.question(
		`
Ingrese el lanzamiento N°${i} de ${player.name}
1. Double Bull (DB)
2. Single Bull (SB)
3. Null
4. Otro\n`
	);
	if (choice === '1') return 50;
	if (choice === '2') return 25;
	if (choice === '3') return 0;
	if (choice === '4') return multiplierThrow();
};

const makeThrows = (player) => {
	let scores = 0;
	for (let i = 1; i < 4; i++) scores += makeThrow(player, i);
	return scores;
};

const computeScore = (player) => {
	const newScore = Math.abs(player.score - makeThrows(player));
	console.log(`¡${player.name} queda con ${newScore} puntos!`);
	return newScore;
};

const checkScore = (player) => {
	if (player.score !== 0) return false;
	console.log(`¡¡¡${player.name} HA GANADO!!!`);
	return true;
};

const playGame = (name1, name2) => {
	const [player1, player2] = initGame(name1, name2);

	while (true) {
		player1.score = computeScore(player1);
		if (checkScore(player1)) break;
		player2.score = computeScore(player2);
		if (checkScore(player2)) break;
	}
};

playGame('Jaime', 'Ema');
