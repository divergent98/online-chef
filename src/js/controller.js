import * as model from './model.js'
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeContainer = document.querySelector('.recipe');
const resultsContainer = document.querySelector('.preview');
const hideBookmarks = document.querySelector("#bookmark-list");
const body = document.querySelector('#body');
const controlRecipes = async function() {
    try {
      const id = window.location.hash.slice(1);
      console.log(id);
      recipeView.renderSpinner();
      if(!id) return;

     
      
      await model.loadRecipe(id);
      document.location.reload;
      
      recipeView.render(model.state.recipe);
      bookmarksView.render(model.state.bookmarks);
      body.classList.toggle('toggle-sidebar');
      hideBookmarks.classList.toggle('hidden')
      addRecipePage.classList.add('hidden');
      //controlServings();
    } catch (err){
      console.log(err)
      recipeView.renderError();
    }
}

const controlSearchResults = async function(){
  try {
    resultsView.renderSpinner();
    console.log(resultsView)

    const query = searchView.getQuery();
    
    if(!query) return;
    await model.loadSearchResults(query);
  
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch(err) {
    console.log(err);
  }
};
const controlPagination = function(goToPage){
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);

}
const controlAddBookmark = function (){
  console.log(model.state.recipe.bookmarked);
  if(model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.render(model.state.recipe);

  bookmarksView.render(model.state.bookmarks)
};
const controlAddRecipe = function(newRecipe) {

      console.log(newRecipe);
  model.uploadRecipe(newRecipe)

}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();