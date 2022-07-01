var pokemonList = [];

pokemonList.push({name: "Charizard", height: 1.7,types: ["fire", "flying"]});
pokemonList.unshift({name: "Squirtle", height: 0.5, types: ["water"]});
pokemonList.push({name: "Bulbasaur",height: 0.7, types: ["grass", "poison"]});
pokemonList.unshift({name: "Pikachu",height: 0.4, types: ["electric"]});
pokemonList.push({name: "Nidoran",height: 0.5, types: ["poison"]});

let height = ""
for (let i =0; i < pokemonList.length; i++) {
    document.write("<BR>" + pokemonList[i].name + ": (height: " + pokemonList[i].height + ")");
    if (pokemonList[i].height >= 0.7) {
        document.write(" - Wow, that's big!");
    }
}