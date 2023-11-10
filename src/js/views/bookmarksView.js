import View from './View';
//import icons from 'url:../../img/icons.svg';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  addHandlerUpdateServings() {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      console.log(btn);
    });
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    return `
         <li class="bookmark__preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="bookmark__data">
                <h4 class="bookmark__title">${result.title}</h4>
                <p class="bookmark__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
        `;
  }
}
export default new BookmarksView();
