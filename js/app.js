let aparece = false;
let personajesEpisodio = [];
let resultados = [];

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
		borrarLista();
		const res = await fetch ("https://rickandmortyapi.com/api/character/?name=" + name + "&status=alive");
		const data = await res.json();
		console.log(data);

		const episodesNode = document.getElementById("lista");
		data.results.forEach(resultado => {
			resultados.push(resultado.episode);			
			//console.log("RESULTADO: " + resultado.episode);
			const episodeNode = document.createElement("li");
			episodeNode.id = "episode" + resultado.name;
			episodeNode.innerHTML = resultado.episode;
			episodesNode.appendChild(episodeNode);
			//console.log("LI - " + resultado.episode.name);
		});
		aparece = true;

	} catch (error) {
		//console.log(error);
		aparece = false;
		console.log("No hemos encontrado el personaje.");
	}
};


const comprobarPersonaje = (nombre,episodes) => {	
	try {
		const personaje = nombre.toLowerCase();
		
		/*episodes.forEach(episode => {
			//console.log("Personajes: " + episode.name);
			personajesEpisodio.push(episode.name);
		});*/
		const episodesNode = document.getElementById("lista");
		episodes.forEach(episode => {
			const episodeNode = document.createElement("li");
			episodeNode.id = "episode" + episode.name;
			episodeNode.innerHTML = episode.name;
			/*if (episode.name.toLowerCase() == personaje){
				episodesNode.appendChild(episode.episode.name);
			}*/
			episodesNode.appendChild(episodeNode);
		});
		return true;
	} catch (error){
		return false;
	}	
}

const mostrarPersonajes = (episodes) => {		
	const episodesNode = document.getElementById("lista");
	for(let p in episodes){
			//console.log("Nombre:" + episodes[p]);
			const episodeNode = document.createElement("li");
			episodesNode.appendChild(episodes[p]);
		}
}

const mostrarResultados = (episodes) => {		
	const episodesNode = document.getElementById("lista");
	episodes.forEach(episode => {
		const episodeNode = document.createElement("li");
		episodeNode.id = "episode" + episode.name;
		episodeNode.innerHTML = episode.name;
		episodesNode.appendChild(episodeNode);
	});
}

const removeEpisodes = () => {
	const episodesNode = document.getElementById("lista");

	if (episodesNode) {
		episodesNode.remove();
	}
}

const borrarLista = () => {
	if (document.querySelector('li')){
			document.getElementById("lista").innerHTML = '';
	}
	if (document.getElementById('busqueda').value == ''){
			document.getElementById("lista").innerHTML = '';
			const li = document.querySelectorAll(".list-item-class");
			for(let i = 0; i <= li.length; i++ ){
			    l = li[i];
			    l.remove();
			}
	}

}

