const getFlag = (flag1, flag2) => {
	let flag1Text;
	let flag2Text;
	for (j = 0; j < process.argv.length; j++) {
		if (process.argv[j].match(flag1)) {
			flag1Text = process.argv[j + 1];
		}
		if (process.argv[j].match(flag2)) {
			flag2Text = process.argv[j + 1];
		}
	}

	return `Oi ${flag1Text} ${flag2Text}.`;
};

module.exports = { getFlag };
