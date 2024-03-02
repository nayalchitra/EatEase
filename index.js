

import { getRecipeCards } from "./getRecipeCards.js";
import { getCuisineRecords } from "./getCuisineRecords.js";


const mainContainer = document.querySelector('.main');
const cuisineAside  = document.querySelector('.aside');
const input = document.querySelector('.food-search');
const title = document.querySelector('.title');


const createElement =  (element)=>document.createElement(element);



const RECIPE_URL = "http://localhost:8000/receipes";
const CUISINE_URL = "http://localhost:8000/cuisine";

let cuisineData = "";
let RecipeData = "";
let selectedCuisineList = []
let inputValue = ""
let targetId= "";
let isCuisineSelected = false;
let filteredRecipe=[]

const getData = async (URL)=>{
    try{
        const {data} = await axios.get(URL);  
    
        return data; 
    }
    catch(error){
        console.log(error);
    }
}

RecipeData = await getData(RECIPE_URL);
let cussine = RecipeData.map(x=>x.Cuisine);

let uniqueCussine = cussine.reduce((acc, curr)=> {
    if(acc.includes(curr))
        return acc;
    else{
        acc.push(curr);
        return acc;
    }
} ,[])

cuisineData = await getData(CUISINE_URL);


title.addEventListener('click',()=>{
    location.reload();
})

getRecipeCards(RecipeData,mainContainer,createElement);
getCuisineRecords(cuisineData, cuisineAside ,createElement);


const getFilteredRecipe = ()=>{

    console.log("keyup/clicked");
    filteredRecipe = inputValue?.length > 0 ? 
                        RecipeData.filter((recipe)=>recipe.TranslatedRecipeName.toLowerCase().includes(inputValue)):
                        RecipeData;
  

    if(selectedCuisineList.length > 0){
        filteredRecipe = inputValue?.length > 0 ? filteredRecipe : RecipeData;
        console.log({filteredRecipe});
        filteredRecipe = filteredRecipe.filter((recipe)=> 
            selectedCuisineList.includes(recipe.Cuisine.trim())
        );
        console.log({filteredRecipe});
    }

    return filteredRecipe;
}

const getSelectedCuisines = ()=>{

    let selectedCuisine = cuisineData.filter((cuisine)=>cuisine.id == targetId);
    if(selectedCuisine.length)
    {
        let cuisineName = selectedCuisine[0].Name;
        selectedCuisineList = isCuisineSelected ? [...selectedCuisineList, cuisineName] : selectedCuisineList.filter((cuisine)=>cuisine!==cuisineName);
    }
}


cuisineAside.addEventListener('click', (e)=>{
    targetId = e.target.id;
    isCuisineSelected = e.target.checked; 
   
    getSelectedCuisines();
    console.log(selectedCuisineList);
    filteredRecipe = getFilteredRecipe();
    mainContainer.innerHTML = "";
    getRecipeCards(filteredRecipe,mainContainer,createElement);


})


input.addEventListener('keyup', (e)=>{
    inputValue = e.target.value.toLowerCase();
    console.log(inputValue);
    filteredRecipe = getFilteredRecipe();
    console.log(filteredRecipe);
    mainContainer.innerHTML = "";
    getRecipeCards(filteredRecipe,mainContainer,createElement);

})


mainContainer.addEventListener('click',(e)=>{
    console.log(e.target);
    localStorage.removeItem('recipe-id');
    localStorage.setItem('recipe-id', e.target.dataset.id);
    location.href="recipe.html";
})

