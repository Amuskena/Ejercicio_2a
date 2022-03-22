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
		//console.log(data);

		let personajes = [];
		let episodios = [];
		data.results.forEach(item => {
			personajes.push(item.name);
			//episodios.push(item.episode);
			item.episode.forEach(ep => {
				//console.log("Episodio " + ep);
				episodios.push(ep);
			});
		});

		const episodesNode = document.getElementById("lista");
		for (let i in episodios){
			//console.log(episodios[i]);
			const episodeNode = document.createElement("li");
			episodeNode.innerHTML = episodios[i];
			episodesNode.appendChild(episodeNode);
		}

	} catch (error) {
		console.log("No hemos encontrado el personaje.");
	}
};

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











































