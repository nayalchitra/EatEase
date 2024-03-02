
function getRecipeCards(records, parentContainer, createElement){

   
//    console.log(records);
    for(let record of records){

        const recipeCardConatiner = createElement('div');
        recipeCardConatiner.classList.add('recipe-card-container');
        recipeCardConatiner.setAttribute('data-id',record.id);
    
        const imageContainer = createElement('div');
        imageContainer.classList.add('image-container');
        

        const img = createElement('img');
        img.setAttribute('src',record["image-url"]);
        img.setAttribute('data-id',record.id);

        imageContainer.appendChild(img);

        const recipeContainer = createElement('div');
        recipeContainer.classList.add('recipe-container');

        const recipeName = createElement('h5');
        recipeName.classList.add('recipe-name');
        recipeName.innerHTML = record.TranslatedRecipeName;

        recipeContainer.appendChild(recipeName);

        const cusine_time_container = createElement('div');
        cusine_time_container.classList.add('cusine-time-conatiner')
        const cusineData = createElement('h5');
        cusineData.innerHTML = record.Cuisine;

        const clock = createElement('span');
        clock.classList.add('material-symbols-outlined');
        clock.innerHTML = "av_timer";

        const timeTaken = createElement('h5');
        timeTaken.innerHTML = record.TotalTimeInMins;

        const clock_container = createElement('div');
        clock_container.classList.add('clock-container');
        cusine_time_container.appendChild(cusineData);
        clock_container.appendChild(clock);

        clock_container.appendChild(timeTaken);
        cusine_time_container.appendChild(clock_container);

        recipeContainer.appendChild(cusine_time_container);
        recipeCardConatiner.appendChild(imageContainer);
        recipeCardConatiner.appendChild(recipeContainer);

        parentContainer.appendChild(recipeCardConatiner);
    }
   
}

export {getRecipeCards};
