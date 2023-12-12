const iconsList = [
	"📷",
	"📄",
	"🐱‍💻",
	"🐱‍👤",
	"🐱‍🚀",
	"🐱‍👓",
	"🐱‍🐉",
	"🔋",
	"🔗",
	"🔧",
	"🔨",
	"🎉",
	"🎲",
	"🚀",
	"👨‍🚀",
	"🧱",
	"🔬",
	"🧰",
	"🎬",
	"📺",
	"📚",
	"📁",
	"💡",
	"🧪",
	"⚡",
	"🎯",
	"♟️",
	"🎨",
];

function randomIntNumber(range = 2) {
	return Math.floor(Math.random() * range);
}

function setFavicon(icon = "📄") {
	const favicon = document.querySelector("link[rel~='icon']");

	favicon.href =
		"data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 110 100%22><text y=%22.9em%22 font-size=%2290%22>" +
		icon +
		"</text></svg>";
}

function setRandomIcon() {
	setFavicon(iconsList[randomIntNumber(iconsList.length)]);
}

function setFaviconDevice() {
	const iconsDevice = { desktop: "🖥️", laptop: "💻", mobile: "📱" };

	if (window.innerWidth <= 800) {
		setFavicon(iconsDevice.mobile);
	} else if (window.innerWidth <= 1400) {
		setFavicon(iconsDevice.laptop);
	} else {
		setFavicon(iconsDevice.desktop);
	}
}

setFavicon("⚙️");
setTimeout(() => {
	setRandomIcon();
}, 400);
setTimeout(() => {
	setRandomIcon();
}, 800);
setTimeout(() => {
	setRandomIcon();
}, 1500);
setTimeout(() => {
	setFaviconDevice();
}, 3000);

function divideBy60(time) {
	return Math.round(time / 60);
}

const initialTime = new Date();

function elapsedTime() {
	const currentTime = new Date();
	let minute = divideBy60((currentTime - initialTime) / 1000);
	let hour = divideBy60(minute);
	const hasHours = Number(hour) > 0;
	const hasMinutes = Number(minute) > 0;
	let text = `Site aberto há `;
	if (hasHours) {
		text += `${hour} hora${hour > 1 ? "s" : ""} e ${minute} minuto${
			minute > 1 ? "s" : ""
		}`;
	} else if (hasMinutes) {
		text += `${minute} minuto${minute > 1 ? "s" : ""}`;
	} else {
		text += `menos de um minuto`;
	}
	document.getElementById("time").innerHTML = `${text}`;
	setTimeout(elapsedTime, 1000);
}

elapsedTime();

const inputExampleText = `4
5
bebidas 150
entrada 100
principal 400
sobremesa 300
reserva 40
bebidas reserva`;

const inputExample = document.getElementById("ql-input");

inputExample.innerHTML = inputExampleText;

function selectElementText(el, win) {
	win = win || window;
	var doc = win.document,
		sel,
		range;
	if (win.getSelection && doc.createRange) {
		sel = win.getSelection();
		range = doc.createRange();
		range.selectNodeContents(el);
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (doc.body.createTextRange) {
		range = doc.body.createTextRange();
		range.moveToElementText(el);
		range.select();
	}
}

document.getElementById("ql-output").innerHTML = `${
	main(inputExampleText).total
}
${main(inputExampleText).dividido_por_cliente}
${main(inputExampleText).excluido_da_divisao}`;

const source = document.getElementById("source");
const result = document.getElementById("result");

const inputHandler = function (element) {
	const resultado = main(element.target.value);
	result.innerText = `Resultado:
		${resultado.total}
        ${resultado.dividido_por_cliente}
        ${resultado.excluido_da_divisao}
    `;
};

source.addEventListener("input", inputHandler);
source.addEventListener("propertychange", inputHandler);

function main(entradas) {
	const linhas = entradas.trim().split("\n");
	let lista_itens = [];
	let lista_divisao_excecao;
	let clientes;
	let total_itens_divididos = 0;
	let resultado = {
		total: 0,
		dividido_por_cliente: 0,
		excluido_da_divisao: 0,
	};
	for (let i = 0; i < linhas.length; i++) {
		let linha_entrada;
		try {
			linha_entrada = eval(linhas[i]);
		} catch {
			linha_entrada = linhas[i];
		}

		if (i != 1) {
			if (i == 0) {
				clientes = linha_entrada;
			} else if (i + 1 == linhas.length) {
				lista_divisao_excecao = linha_entrada.trim().split(" ");
			} else {
				lista_itens.push({
					nome: linha_entrada.split(" ")[0],
					preco: parseInt(linha_entrada.split(" ")[1]),
				});
			}
		}
	}
	lista_itens.forEach((item) => {
		if (lista_divisao_excecao.includes(item.nome)) {
			resultado.excluido_da_divisao += item.preco;
		} else {
			total_itens_divididos += item.preco;
		}
		resultado.dividido_por_cliente = parseInt(
			total_itens_divididos / clientes
		);
		resultado.total += item.preco;
	});

	console.log(
		`${resultado.total}\n${resultado.dividido_por_cliente}\n${resultado.excluido_da_divisao}`
	);
	return resultado;
}

const reload = document.getElementById("reload");

const reloadHandler = function (element) {
	if (element.srcElement.checked) {
		window.onbeforeunload = function () {
			return "Confirm before closing the tab/window";
		};
	} else {
		window.onbeforeunload = null;
	}
};

reload.addEventListener("input", reloadHandler);
reload.addEventListener("propertychange", reloadHandler);

function toggleMode() {
	const html = document.documentElement;
	html.classList.toggle("light");
}
