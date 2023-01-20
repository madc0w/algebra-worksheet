for (let i = 0; i < 20; i++) {
	const a = Math.floor(Math.random() * 10) + 1;
	const b = Math.floor(Math.random() * 10) + 1;
	const c = Math.floor(Math.random() * 10) + 1;
	const d = Math.floor(Math.random() * 10) + 1;
	const e = Math.floor(Math.random() * 10) + 1;
	const f = Math.floor(Math.random() * 10) + 1;
	console.log(
		`${Math.random() < 0.5 ? '-' : ''}${a}(${b == 1 ? '' : b}x ${
			Math.random() < 0.5 ? '-' : '+'
		} ${c}) ${Math.random() < 0.5 ? '-' : '+'} ${d}(${e == 1 ? '' : e}x ${
			Math.random() < 0.5 ? '-' : '+'
		} ${f})`
	);
	console.log();
	console.log();
}
