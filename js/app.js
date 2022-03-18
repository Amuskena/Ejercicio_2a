document.addEventListener('DOMContentLoaded', async () => {
    const myInput = document.getElementById('busqueda');
	myInput.addEventListener('keyup', function() {
	     handlerInputChange(myInput.value);
	});
});

async function handlerInputChange(v){
	console.log(v);
	await fetchCharacter(v);
}

const fetchCharacter = async (name) => {
	try {
		const res = await fetch ("https://rickandmortyapi.com/api/character/?name=" + name + "&status=alive");
		const data = await res.json();
		console.log(data);
		mostrarResultados(data);

	} catch (error) {
		console.log(error);
	}
};

const mostrarResultados = (resultados) => {
	const appNode = document.getElementById("app");
	const resultadosNode = document.createElement("ul");

	resultadosNode.id = "resultados";
	appNode.appendChild(resultadosNode);

	resultados.forEach(resultado => {
		const resultadoNode = document.createElement("li");
		resultadoNode.id = "resultado" + resultado.name;
		resultadoNode.innerHTML = resultado.name;
		resultadoNode.appendChild(resultadoNode);
	});
}