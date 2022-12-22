import './main.css';
import Page from '../../core/templates/page';

import mainCards from '../../core/components/main/mainCards';
import { Product } from '../../core/components/main/card';
import mainFilter from '../../core/components/main/mainFilter';
import { parametrObj } from '../../core/components/main/mainFilter';
import * as objProducts from './products.json';

export const obj = objProducts;

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Страница товаров с фильтрами',
    };
    products: Product[];
    mainAreaCards: mainCards;
    checkFilter: parametrObj;

    //делаем из строки хеша объект для фильтра
    static createObjectParametrs(str: string): parametrObj {
        if (str[0] !== '?') return { category: [], brand: [] };
        str = str.slice(1);

        const reg = new RegExp('%20', 'gi');
        str = str.replace(reg, '');

        const res: string[][] = str.split('?&').map((item) => item.split('='));
        const newRes: parametrObj = { category: [], brand: [] };
        res.forEach((item) => {
            if (item[0] === 'category') newRes[item[0]] = item[1].split('|');
            if (item[0] === 'brand') newRes[item[0]] = item[1].split('|');
        });

        return newRes;
    }

    constructor(id: string) {
        super(id);
        this.checkFilter = MainPage.createObjectParametrs(id);
        this.products = mainFilter.searchCardsFilter(this.checkFilter); //вызываем метод из фильтра, который ищет объекты из массива с товарами
        this.mainAreaCards = new mainCards('ul', 'products-items', this.products);
    }

    createMainPage() {
        const main = document.createElement('div');
        main.classList.add('main');
        const appStorePage = document.createElement('div');
        appStorePage.classList.add('app-store-page');
        main.append(appStorePage);

        const filter = new mainFilter('div', 'filter', this.mainAreaCards, this.checkFilter);

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

        return this.container;
    }
}

export default MainPage;
