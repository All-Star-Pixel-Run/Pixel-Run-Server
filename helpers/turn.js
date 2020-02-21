function turn(rule, suits) {
	const batu = suits.filter(el => el.toLowerCase() == "batu").length;
	const kertas = suits.filter(el => el.toLowerCase() == "kertas").length;
	const gunting = suits.filter(el => el.toLowerCase() == "gunting").length;

	const score = [];
	suits.forEach(el => {
		switch (el) {
			case "batu":
				score.push(gunting * rule.batu);
				break;
			case "kertas":
				score.push(batu * rule.kertas);
				break;
			case "gunting":
				score.push(kertas * rule.gunting);
		}
	});
	return score;
}

module.exports = turn; 
