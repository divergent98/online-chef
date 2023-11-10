import View from "./View";
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  addHandlerUpdateServings(){
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--tiny');
      if(!btn) return
      console.log(btn);
      
    })
  }
  _generateMarkup() {

    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {

    return `
         <li class="preview ">
            <a class="preview__link toggle-sidebar-btn" href="#${result.id}">
           
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
        `;
  
  }
}
export default new ResultsView();