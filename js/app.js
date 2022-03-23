document.addEventListener('DOMContentLoaded', async () => {
  const myInputNode = document.getElementById('busqueda');

	myInputNode.addEventListener('keyup', function(e) {
	  handlerInputChange(e.target.value);
	});
});

async function handlerInputChange(inputValue){
	const characterEpisodesApiUrls = await fetchCharacterEpisodesApiUrls(inputValue);
	console.log('characterEpisodesApiUrls', characterEpisodesApiUrls);
	const charactersEpisodes = await fetchEpisodes(characterEpisodesApiUrls);
	console.log('charactersEpisodes', charactersEpisodes);
	renderEpisodes(charactersEpisodes);
}

const renderEpisodes = (episodes) => {
	const episodesNode = document.getElementById("lista");

	for (let i in episodes){
		const episodeNode = document.createElement("li");
		episodeNode.innerHTML = episodes[i].name;
		episodesNode.appendChild(episodeNode);
	}
}

const fetchEpisode = async (characterEpisodeApiUrl) => {
	try {
		const res = await fetch(characterEpisodeApiUrl);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

const fetchEpisodes = async (characterEpisodesApiUrls) => {
	const charactersEpisodes = [];

	for (const characterEpisodeApiUrl of characterEpisodesApiUrls) {
		const characterEpisode = await fetchEpisode(characterEpisodeApiUrl);
		charactersEpisodes.push(characterEpisode);
	}

	return charactersEpisodes;
}

const fetchCharacterEpisodesApiUrls = async (name) => {
	try {
		clearCharacterEpisodesNode();

		const res = await fetch (`https://rickandmortyapi.com/api/character/?name=${name}&status=alive`);
		const data = await res.json();

		let episodesApiUrls = [];

		data.results.forEach(item => {
			if (item.name === name) {
				episodesApiUrls = [...episodesApiUrls, ...item.episode];
			}
		});

		return episodesApiUrls;
	} catch (error) {
		console.log("No hemos encontrado el personaje.");
	}
};

const clearCharacterEpisodesNode = () => {
	document.getElementById("lista").innerHTML = '';

	if (document.getElementById('busqueda').value == ''){
		const li = document.querySelectorAll(".list-item-class");

		for(let i = 0; i <= li.length; i++ ){
			l = li[i];
			l.remove();
		}
	}
}











































