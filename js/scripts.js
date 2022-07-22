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
        bottons.classList.add('btn', 'btn-primary');
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
        let modalHeader = $('modal-header');
        // contained in header, is title <h5>
        let modalTitle = $('modal-title');
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
        imageElementBack.attr("src", pokemonClicked.imageUrlBack);
            //height
        let heightElement = $('<p>'+'Height: '+pokemonClicked.height+'</p>');
            //weight
        let weightElement = $('<p>'+'Weight: '+pokemonClicked.weight+'</p>');
            //type
        let typeElement = $('<p>'+'Type: '+pokemonClicked.type+'</p>');
            //abilities
        let abilitiesElement = $('<p>'+'Abilities: '+pokemonClicked.abilities+'</p>');
        
        // now append every element created to wither the modalTitle or the modalBody
        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typeElement);
        modalBody.append(abilitiesElement);
    }

    /*function showModal (pokemonClicked) {
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
*/

    function hideModal() {
        let modalBox = document.querySelector("#myModal");
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
            item.type = detail.types;
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