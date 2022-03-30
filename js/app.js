document.addEventListener('DOMContentLoaded', async () => {
  const myInputNode = document.getElementById('busqueda');

	myInputNode.addEventListener('keyup', function(e) {
	  handlerInputChange(e.target.value);
	});

	/*const debouncedSearch = debounce(handlerInputChange, 500);
	myInputNode.addEventListener('keyup', debouncedSearch);*/
});

/*const debounce = (func, delay = 200) => {
  let timeoutId;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  }
};*/

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;
  
  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: abortController.signal  
  });
  clearTimeout(id);
  return response;
}

// PUNTO DE GUARDADO 3

async function handlerInputChange(inputValue){
	//inputValue = this.value;
	const characterEpisodesApiUrls = await fetchCharacterEpisodesApiUrls(inputValue);

	if (!characterEpisodesApiUrls) {
		return;
	}

	const charactersEpisodes = await fetchEpisodes(characterEpisodesApiUrls);

	if (!charactersEpisodes) {
		return;
	}

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
	if (!characterEpisodesApiUrls || characterEpisodesApiUrls.length <= 0){
		return;
	}

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

		//const res = await fetch (`https://rickandmortyapi.com/api/character/?name=${name}&status=alive`);
    const res = await fetchWithTimeout(`https://rickandmortyapi.com/api/character/?name=${name}&status=alive`, {
      timeout: 5000
    });

		if (!res) {
			return;
		}

		const data = await res.json();

		let episodesApiUrls = [];

		data.results.forEach(item => {
			if (item.name.toLowerCase() === name.toLowerCase()) {
				episodesApiUrls = [...episodesApiUrls, ...item.episode];
			}
		});

		return episodesApiUrls;
	} catch (error) {
		console.log("No hemos encontrado el personaje.", error);
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












































