// Imports
const readlineSync = require('readline-sync');

// TEXTS
const TEXTS = {
	init: ({ username1, username2 }) =>
		`Juego inicializado con jugadores ${username1} y ${username2}`,
	askThrow: ({ username, i }) =>
		[
			`Ingrese el lanzamiento N°${i} de ${username}`,
			'1. Double Bull (DB)',
			'2. Single Bull (SB)',
			'3. Null',
			'4. Otro\n',
		].join('\n'),
	multBase: () => 'Ingrese el puntaje base (1-20)\n',
	multMultiplier: () => 'Ingrese el multiplicador (1-3)\n',
	badChoice: () => 'Opción inválida, por favor inténtelo nuevamente\n',
	currScore: ({ username, score }) => `¡${username} queda con ${score} puntos!`,
	win: ({ username }) => `¡¡¡EL JUGADOR ${username} HA GANADO!!!`,
};

const Player = (name) => {
	const username = name;
	let score = 501;
	let roundScore = 0;

	const multiplierThrow = () => {
		const base = parseInt(readlineSync.question(TEXTS.multBase()));
		const multiplier = parseInt(readlineSync.question(TEXTS.multMultiplier()));
		return base * multiplier;
	};
	const makeThrow = (i) => {
		const choice = parseInt(
			readlineSync.question(TEXTS.askThrow({ username, i }))
		);
		if (choice === 1) return 50;
		if (choice === 2) return 25;
		if (choice === 3) return 0;
		if (choice === 4) return multiplierThrow();
	};

	return {
		updateScore: () => {
			score = Math.abs(score - roundScore);
			roundScore = 0;
		},
		checkScore: () => {
			console.log(TEXTS.currScore({ username, score }));
			if (score === 0) {
				console.log(TEXTS.win({ username }));
				process.exit(0);
			}
		},
		makeThrows: (nThrows) => {
			for (let i = 0; i < nThrows; i++) roundScore += makeThrow(i + 1);
		},
	};
};

// Functions
const initGame = (...names) => names.map((name) => Player(name));

const playGame = (name1, name2) => {
	const players = initGame(name1, name2);
	console.log(TEXTS.init({ username1: name1, username2: name2 }));

	while (true) {
		players.forEach((player) => {
			player.makeThrows(3);
			player.updateScore();
			player.checkScore();
		});
	}
};

// Instance
playGame('Jaime', 'Ema');
