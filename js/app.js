document.addEventListener("DOMContentLoaded", async () => {
  let controller;
  const myInputNode = document.getElementById("busqueda");
  const myButton = document.getElementById("cancelar");
  const debouncedSearch = debounce(handlerInputChange, 500);

  myInputNode.addEventListener("keyup", debouncedSearch);
  myButton.addEventListener("click", () => handlerCancel(controller));
});

function handlerCancel(ctrler) {
  if (!ctrler?.abort) {
    return;
  }

  ctrler.abort();
}

function debounce(func, delay = 200) {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

async function handlerInputChange(inputValue) {
  controller = new AbortController();
  const signal = controller.signal;

  inputValue = this.value;

  const characterEpisodesApiUrls = await fetchCharacterEpisodesApiUrls(
    inputValue,
    signal
  );

  if (!characterEpisodesApiUrls) {
    return;
  }

  const charactersEpisodes = await fetchEpisodes(
    characterEpisodesApiUrls,
    signal
  );

  console.log(charactersEpisodes);

  if (!charactersEpisodes) {
    return;
  }

  renderEpisodes(charactersEpisodes);
}

const renderEpisodes = (episodes) => {
  const episodesNode = document.getElementById("lista");

  for (let i in episodes) {
    const episodeNode = document.createElement("li");

    episodeNode.innerHTML = episodes[i]?.name;
    episodesNode.appendChild(episodeNode);
  }
};

const fetchEpisode = async (characterEpisodeApiUrl, signal) => {
  try {
    const res = await fetch(characterEpisodeApiUrl, { signal });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const fetchEpisodes = async (characterEpisodesApiUrls, signal) => {
  if (!characterEpisodesApiUrls || characterEpisodesApiUrls.length <= 0) {
    return;
  }

  const charactersEpisodes = [];

  for (const characterEpisodeApiUrl of characterEpisodesApiUrls) {
    const characterEpisode = await fetchEpisode(characterEpisodeApiUrl, signal);
    charactersEpisodes.push(characterEpisode);
  }

  return charactersEpisodes;
};

const fetchCharacterEpisodesApiUrls = async (name, signal) => {
  try {
    clearCharacterEpisodesNode();

    const res = await fetch(
      encodeURI(`https://rickandmortyapi.com/api/character/?name=${name}&status=alive`),
      { signal }
    );

    if (!res) {
      return;
    }

    const data = await res.json();

    let episodesApiUrls = [];

    data.results.forEach((item) => {
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
  document.getElementById("lista").innerHTML = "";

  if (document.getElementById("busqueda").value === "") {
    const li = document.querySelectorAll(".list-item-class");

    for (let i = 0; i <= li.length; i++) {
      let l = li[i];
      l.remove();
    }
  }
};
