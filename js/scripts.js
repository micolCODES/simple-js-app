let pokemonRepository = (function () {
    var pokemonList = [
        {name: "Charizard", height: 1.7,types: ["fire", "flying"]}, 
        {name: "Squirtle", height: 0.5, types: ["water"]}, 
        {name: "Bulbasaur",height: 0.7, types: ["grass", "poison"]}, 
        {name: "Pikachu",height: 0.4, types: ["electric"]}, 
        {name: "Nidoran",height: 0.5, types: ["poison"]}
    ];
    
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof(pokemon) === "string") {
            pokemonList.push(pokemon);
        }
    }

    return {
        add: add,
        getAll: getAll
    }
}) ();

let pokemonList = pokemonRepository.getAll();


pokemonList.forEach(function(pokemon) {
    document.write("<BR>" + pokemon.name + ": (height: " + pokemon.height + ")");
    if (pokemon.height >= 0.7) {
        document.write(" - Wow, that's big!");
    }
});