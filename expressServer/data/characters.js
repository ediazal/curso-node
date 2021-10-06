const characters = [
  {
    "id": 1,
    "username": "Leela",
    "role": "Capitana"
  },
  {
    "id": 2,
    "username": "Fry",
    "role": "Está ahí"
  },
  {
    "id": 3,
    "username": "Zoidberg",
    "role": "Médico"
  },
  {
    "id": 4,
    "username": "Amy",
    "role": "Científica"
  }
];

exports.characters = {
  getCharacters: () => characters,
  findCharacterByName: characterName => characters.filter(
                                      currentCharacter => currentCharacter.username === characterName
                                    )[0],
  findCharactersByProfile: profile => characters.filter(
                                      currentCharacter => currentCharacter.role === profile
                                    ),
  addNewCharacter: character => characters.push(character)
};