import Page from '../../core/templates/page';
import MainPage from '../main/index';
import CartPage from '../cart/index';
import DescriptionPage from '../description/index';
import Header from '../../core/components/header/index';
import ErrorPage, { ErrorTypes } from '../error/index';

export const enum PageIds {
    MainPage = 'main-page',
    CartPage = 'cart-page',
    DescriptionPage = 'description-page',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';
    private header: Header;

    //проверка на корректные url
    static checkHash(str: string): boolean {
        const regExpCategory = str.split('=');
        return (
            regExpCategory[0] === '?category' ||
            regExpCategory[0] === '?brand' ||
            regExpCategory[0] === '?stock' ||
            regExpCategory[0] === '?price' ||
            regExpCategory[0] === '?sort' ||
            regExpCategory[0] === '?search'
        );
    }

    static renderNewPage(idPage: string) {
        if (idPage === '') return;
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);

        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage || App.checkHash(idPage)) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.CartPage) {
            page = new CartPage(idPage);
        } else if (idPage.includes('id=')) {
            page = new DescriptionPage(idPage.replace('id=', ''));
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();

            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
            if (page instanceof MainPage) MainPage.searchProductsHash();
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            //если хеш сформирован корректный (вручную или кликами), то новую страниицу не рисуем
            if (App.checkHash(hash)) MainPage.searchProductsHash();
            else App.renderNewPage(hash);
        });
    }

    constructor() {
        this.header = new Header('header', 'header');
    }

    run() {
        App.container.append(this.header.render());

        if (window.location.hash === '') window.location.hash = 'main-page';
        else App.renderNewPage(window.location.hash.slice(1));
        this.enableRouteChange();
    }
}

export default App;
