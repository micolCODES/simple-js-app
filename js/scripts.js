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
        buttons.innerText = pokemon.name;
        buttons.classList.add(".buttonsClass");
        listItem.appendChild(buttons);
        ulList.appendChild(listItem);
        //call function to show detail of Pokemon clicked
        buttons.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    function showModal (pokemonClicked) {
        //made variable 'modalBox" to select the <div> that will contain the modal
        let modalBox = document.getElementById("modal-container");

        //??? clreaning any content from the modal, just in case, I think ?!?
        modalBox.innerHTML = "";

        //making a virtual modal box and giving it a class of "modal"
        let virtualModalDiv = document.createElement("div");
        virtualModalDiv.classList.add("modal");

        //My virtualModalDiv now exists but it's empty. 
        //Let's add some elements, namely:
        //- A title: the name of the PokemonClicked
        //- A text: the height of the PokemonClicked
        //- A picture: the icon of the PokemonCLicked
        //- A close button to get the hell out of the damn modal
        // All with class for CSS styling and variable inner text

        //Title: nameOfPokemon
        let nameOfPokemon = document.createElement('h1');
        nameOfPokemon.classList.add("name");
        nameOfPokemon.innerText = pokemonClicked.name;

        //Text: heightOfPokemon
        let heightOfPokemon = document.createElement('p')
        heightOfPokemon.classList.add("height");
        heightOfPokemon.innerText = 'Height: '+pokemonClicked.height;

        //Picture: pictureOfPokemon
        let pictureOfPokemon = document.createElement('img');
        pictureOfPokemon.classList.add("picture");
        pictureOfPokemon.src = pokemonClicked.imageUrl;

        //Close button
        let virtualCloseButtonDiv = document.createElement('button');
            //add a class of .close so we can close the modal
        virtualCloseButtonDiv.classList.add("modal-close");
        virtualCloseButtonDiv.innerText = "Close";
            // add event so modal will close when:
                //you click on button
        virtualCloseButtonDiv.addEventListener("click", hideModal);
                //you press Esc
        window.addEventListener("keydown", (e) => {
            let modalBox = document.querySelector("#modal-container");
            if (e.key === "Escape" && modalBox.classList.contains("is-visible")){
                hideModal();
            }
        })
                //you click outside of the box
        modalBox.addEventListener("click", (e) =>{
            let whereYouClick = e.target;
            if (whereYouClick === modalBox) {
                hideModal();
            }
        })
        
        //Now nest Title, Text, Picture and Close inside of my virtualModalDiv
        virtualModalDiv.appendChild(nameOfPokemon);
        virtualModalDiv.appendChild(heightOfPokemon);
        virtualModalDiv.appendChild(pictureOfPokemon);
        virtualModalDiv.appendChild(virtualCloseButtonDiv);

        //Now stick virtualModalDiv inside of modalBox
        modalBox.appendChild(virtualModalDiv);

        //in this function, we want the modal to be visible, so we need to add the CSS class .isvisible
        modalBox.classList.add("is-visible");



        //console.log(item.imageUrl);
        //document.write('<img src="'+item.imageUrl+'">');
    }

    function hideModal() {
        let modalBox = document.querySelector("#modal-container");
        modalBox.classList.remove('is-visible');
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
                //console.log(pokemon); //just checking that this works. It does. All pokemons added
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
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
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

//let pokemonList = pokemonRepository.getAll();
//console.log(pokemonRepository.getAll())

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});




/* pokemonList.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon); 
});*/