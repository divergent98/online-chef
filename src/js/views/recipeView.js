import View from './View.js';

import icons from 'url:../../img/icons.svg';
import { Fractional } from 'fractional';
console.log(Fraction);
class RecipeView extends View {
_parentElement = document.querySelector('.recipe');

_errorMessage = 'Greskyyy. Ne mošemo naći vash recepte. Pokushajte ponofo!';
_message = '';
addHandlerRender(handler) {
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
}

addHandlerUpdateServings(handler) {
this._parentElement.addEventListener('click', function (e) {
const btn = e.target.closest('.btn--update-servings');
if (!btn) return;
console.log(btn);
const updateTo = +btn.dataset.updateTo;
console.log(`update to ${updateTo}`)

if(updateTo > 0) handler(updateTo);
});
}

addHandlerAddBookmark(handler) {
this._parentElement.addEventListener('click', function(e){
const btn = e.target.closest('.btn--bookmark');
if(!btn) return;
handler();
console.log("clicked")
});
}

_generateMarkup() {
return `


<div class="row ">
  <div class="image-left col-3 hidden-on-small"></div>

  <div class="col-lg-6 col-sm-12">
    <div class="spacer"></div>
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />

    </figure>

    <div class="row">
      <div class="col-lg-6">
        <button class="servings-btn"><i class=" fa fa-clock"></i></button>
        <span class="number"> ${this._data.cookingTime }</span>
        <span class="minutes"> minutes</span>
      </div>
      <div class="col-lg-5 col-sm-4 col-md-4 ">
        <button class="servings-btn btn--update-servings" data-update-to="${
                    this._data.servings - 1
                  }">
          <i class="fa fa-circle-minus"></i>
        </button>
        <span class="minutes"> ${this._data.servings}</span>
     
        <button class="servings-btn btn--update-servings" data-update-to="${
                    this._data.servings + 1
                  }">
          <i class="fa fa-circle-plus"></i>
        </button>
      </div>
      <div class="col-1 bookmark-button ">
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill': ''}"></use>
          </svg>
        </button>
      </div>
    </div>






    <h1 class="recipe__title mb-4 ps-2 mt-4">
      ${this._data.title}
    </h1>


    <div class="recipe__ingredients ps-2">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._data.ingredients
        .map(this._generateMarkupIngredient)
        .join('')}


      </ul>
    </div>

    <div class="recipe__directions ps-2 mt-4">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text mb-4">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
          }</span>. Please check out
        directions at their website.
      </p>

      <a class="directions-link" href="${this._data.sourceUrl}" target="_blank">

        <span class="button-directions mt-5">Directions</span>

      </a>
    </div>
  </div>
  <div class="image-right col-3 hidden-on-small"></div>
</div>



`;
}
_generateMarkupIngredient(ing) {
return `
<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ing.quantity ? new Fraction(ing.quantity).toString() : ''
    }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
  </div>
</li>

`;
}
}
export default new RecipeView();