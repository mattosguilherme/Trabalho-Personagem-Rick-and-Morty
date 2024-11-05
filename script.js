const container = document.getElementById('character-container');

async function fetchCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character/?page=19');
        const { results: characters } = await response.json();
        characters.forEach(character => container.appendChild(createCharacterCard(character)));
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function translateStatus(status) {
    return { 'Alive': 'Vivo', 'Dead': 'Morto', 'unknown': 'Desconhecido' }[status] || status;
}

function createCharacterCard(character) {
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    characterCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character-image">
        <div class="character-details">
            <h2 class="character-name">${character.name}</h2>
            <p class="character-info">
                <strong>Status:</strong> ${translateStatus(character.status)} <br>
                <strong>Espécie:</strong> ${character.species}${character.type ? ` (${character.type})` : ''} <br>
                <strong>Origem:</strong> ${character.origin.name} <br>
                <strong>Localização:</strong> ${character.location.name}
            </p>
        </div>
    `;
    
    return characterCard;
}

fetchCharacters();