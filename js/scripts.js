let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
          ) {
            pokemonList.push(pokemon);
          } else {
            console.log("pokemon is not correct");
          }
    }

    function addListItem(pokemon) {
        let ulList = document.querySelector("ul");
        let listItem = document.createElement("li");
        let buttons = document.createElement("button");
        listItem.classList.add('group-list-item');
        buttons.innerText = pokemon.name;
        buttons.classList.add(".buttonsClass");
        buttons.classList.add('btn', 'btn-light');
        buttons.setAttribute('data-toggle', 'modal');
        buttons.setAttribute('data-target', '#myModal')
        listItem.appendChild(buttons);
        ulList.appendChild(listItem);
        //call function to show detail of Pokemon clicked
        buttons.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    function showModal(pokemonClicked) {
        //header container
        let modalHeader = $('.modal-header');
        // contained in header, is title <h5>
        let modalTitle = $('.modal-title');
        //modal body 
        let modalBody = $('.modal-body');
        
        //empty modal title and body so they don't show more than 1 pokemon at the time.
        //This is useful after you've used it once
        modalTitle.empty();
        
        modalBody.empty();

        //now I create elements that will show up inside of my modal:
        //name, images, height, weight, type and abilities
            //Name
        let nameElement = $('<h1>'+pokemonClicked.name+'</h1>');
            //img front
        let imageElementFront = $('<img class="modal-img picture">');
        imageElementFront.attr("src", pokemonClicked.imageUrlFront);
            //img back
        let imageElementBack = $('<img class="modal-img picture">');
        imageElementBack.attr('src', pokemonClicked.imageUrlBack);
            //height
        let heightElement = $('<p>'+'Height: '+pokemonClicked.height+'</p>');
            //weight
        let weightElement = $('<p>'+'Weight: '+pokemonClicked.weight+'</p>');
            //type
        let typesElement = $('<p>'+'Type: '+pokemonClicked.types+'</p>');
            //abilities
        let abilitiesElement = $('<p>'+'Abilities: '+pokemonClicked.abilities+'</p>');
        
        // now append every element created to wither the modalTitle or the modalBody
        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }


    function showDetails (item) {
        pokemonRepository.loadDetails(item).then(function(){
            console.log(item);
            showModal(item);
        });

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
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function(details) {
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showModal: showModal,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    }
}) ();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});