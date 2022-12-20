import './main.css';
import Page from '../../core/templates/page';
import * as obj from './products.json';

import mainCards from '../../core/components/main/mainCards';
import { Product } from '../../core/components/main/card';
import mainFilter from '../../core/components/main/mainFilter';

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Страница товаров с фильтрами',
    };
    products: Product[];
    mainAreaCards: mainCards;

    constructor(id: string, products: Product[]) {
        super(id);
        this.products = products;
        this.mainAreaCards = new mainCards('ul', 'products-items', products);
    }

    createMainPage() {
        const main = document.createElement('div');
        main.classList.add('main');
        const appStorePage = document.createElement('div');
        appStorePage.classList.add('app-store-page');
        main.append(appStorePage);

        const filter = new mainFilter('div', 'filter', this.mainAreaCards);

        const products = document.createElement('div');
        products.classList.add('products');

        const sortProducts = document.createElement('div');
        sortProducts.classList.add('sort-products');
        products.append(sortProducts);

        appStorePage.append(filter.render());
        appStorePage.append(products);

        products.append(this.mainAreaCards.render());
        return main;
    }

    render() {
        const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
        this.container.append(title);
        this.container.append(this.createMainPage());
        console.log(obj.products);

        return this.container;
    }
}

export default MainPage;
