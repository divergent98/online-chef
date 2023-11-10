import View from "./View";
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler){
      this._parentElement.addEventListener('click', function(e){
          const btn =e.target.closest('.btn--inline');
            if(!btn) return;

          const goToPage = +btn.dataset.goto;
          console.log(goToPage);
          handler(goToPage);
      })
  }

    _generateMarkup(){
        const curPage = this._data.page;
        
      const numPages = Math.ceil(
        this._data.results.length / this._data.resultsPerPage
      );
       console.log(curPage);
      console.log(numPages);
        if(curPage === 1 && numPages > 1){
            return `   
           
                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <i class="fa fa-circle-arrow-right"></i>
                </button>
           
            `;
        }else if(curPage === numPages && numPages > 1){
            return `
            
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">

            <i class="fa fa-circle-arrow-left"></i>

           
          </button>`;
        }else if(curPage < numPages){
            return `<button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
   
            <i class="fa fa-circle-arrow-left"></i>

          
          </button>
           <button data-goto="${
             curPage + 1
           }" class="btn--inline pagination__btn--next">

            <i class="fa fa-circle-arrow-right custom-arrow"></i>

          </button>
          `;
        }else{
            return ''
        }
}
}
export default new PaginationView();