
const recipeId = localStorage.getItem('recipe-id');
console.log(recipeId);

const SINGLE_RECIPE = `http://localhost:8000/receipes/${recipeId}`;

let singleRecipeData = ""
const mainContainer = document.querySelector('.main');
const title = document.querySelector('.title');

const createElement = (element) => document.createElement(element);


const getData = async (URL)=>{
    try{
        const {data} = await axios.get(URL);  
        
        return data; 
    }
    catch(error){
        console.log(error);
    }
}

singleRecipeData = await getData(SINGLE_RECIPE);
console.log(singleRecipeData);

const getSingleRecipeCard = ()=>{

    const container = createElement('div');
    container.classList.add('container');

    const imageRecipe = createElement('div');
    imageRecipe.classList.add('image-recipe');

    const img = createElement('img');
    img.setAttribute('src',singleRecipeData["image-url"]);

    imageRecipe.appendChild(img);

    const recipeContainer = createElement('div');
    recipeContainer.classList.add('singleRecipe-container');

    const instruction = createElement('div');
    instruction.classList.add('instruction');
    
    const hOne = createElement('h1');
    hOne.innerHTML = "Instructions";

    const para = createElement('p');
    para.innerHTML = singleRecipeData.TranslatedInstructions;

    instruction.appendChild(hOne);
    instruction.appendChild(para);


    const ingredienTitle = createElement('h1');
    ingredienTitle.innerHTML = "Ingredients";

    let ingredientsList = singleRecipeData.TranslatedIngredients.split(",");
    const ul = createElement('ul');
    for(let ingredient of ingredientsList){
        const li = createElement('li');
        li.innerHTML = ingredient;
        ul.appendChild(li);
    }

    recipeContainer.appendChild(ingredienTitle);
    recipeContainer.appendChild(ul);

   
    imageRecipe.appendChild(recipeContainer);
    container.appendChild(imageRecipe);
     container.appendChild(instruction);

    mainContainer.appendChild(container);

}


getSingleRecipeCard();

title.addEventListener('click', ()=>{
    location.href = "index.html";
})