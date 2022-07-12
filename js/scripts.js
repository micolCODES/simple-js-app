let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof(pokemon) === "string") {
            pokemonList.push(pokemon);
        }
    }

    function addListItem(pokemon) {
        let ulList = document.querySelector("ul");
        let listItem = document.createElement("li");
        let buttons = document.createElement("button");
        //call function to show detail of Pokemon clicked
        buttons.addEventListener('click', function() {
            showDetails(pokemon);
        });
        buttons.innerText = pokemon.name;
        buttons.classList.add(".buttonsClass");
        listItem.appendChild(buttons);
        ulList.appendChild(listItem);
    }

    function showDetails (pokemon) {
        console.log(pokemon);
    }

    function loadList (){
        return fetch(apiUrl).then(function (response) {
           return response.json(); 
        }).then(function (json){
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                //console.log(pokemon); just checking that this works. It does. All pokemons added
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList
    }
}) ();

//let pokemonList = pokemonRepository.getAll();
//console.log(pokemonRepository.getAll())

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});


/* pokemonList.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon); 
});*/