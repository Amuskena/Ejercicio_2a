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
		mostrarResultados(data.results);

	} catch (error) {
		console.log(error);
	}
};

// COMPROBAR SI EL NOMBRE DEL PERSONAJE EXISTE

const mostrarResultados = (episodes) => {		
	const episodesNode = document.getElementById("lista");

	episodes.forEach(episode => {
		const episodeNode = document.createElement("li");
		episodeNode.id = "episode" + episode.name;
		episodeNode.innerHTML = episode.name;
		episodesNode.appendChild(episodeNode);
	});
	
}