
function getCuisineRecords(cuisineData, parentContainer, createElement){
        // console.log({cuisineData});

    for(let cuisine of cuisineData ){
        const cuisineContainer = createElement('div');
        cuisineContainer.setAttribute('data-id',cuisine.id);

        cuisineContainer.classList.add('cuisine-data');

        const input = createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('id',cuisine.id);

        const label = createElement('label');
        label.setAttribute('for',cuisine.id);
        label.innerHTML = cuisine.Name;

        cuisineContainer.appendChild(input);
        cuisineContainer.appendChild(label);

        parentContainer.appendChild(cuisineContainer);
    }
}

export {getCuisineRecords}