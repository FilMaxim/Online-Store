import './main.css';
import Page from '../../core/templates/page';
import Card from '../../core/components/main/card';
import Filter from '../../core/components/main/filter';
import { Product } from '../../core/components/main/card';
import { ICountProducts } from '../../core/components/main/filter';

import * as objProducts from './products.json';

export const obj = objProducts;

export interface IParametrs {
    category: string[];
    brand: string[];
    sort: string;
    search: string;
    big: boolean;
    price: number[];
    stok: number[];
}
export interface IUrlHashParametr {
    [key: string]: string;
}
class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Страница товаров с фильтрами',
    };

    //метод который по хешу ищет товары и рендерит их на страницу
    static searchProductsHash() {
        let obj = objProducts.products;
        const url = new URL(window.location.href.replace('#', ''));
        const hashParametr: IUrlHashParametr = {};

        //перебираем все параметры, что есть в юрл
        url.searchParams.forEach((item, index) => {
            hashParametr[index] = item;
        });

        //фильтры по категориям
        if (hashParametr['category']) {
            obj = obj.filter((item) => {
                if (hashParametr.category.indexOf(item.category) === -1) return false;
                return true;
            });
        }
        //фильтры по бренду
        if (hashParametr['brand'])
            obj = obj.filter((item) => {
                if (hashParametr.brand.indexOf(item.brand) === -1) return false;
                return true;
            });

        //количество товаров в по каждой категории в фильтрах
        const filtersCountProduct = Filter.arrCategories(obj);
        MainPage.filterCount(filtersCountProduct, 'brand');
        MainPage.filterCount(filtersCountProduct, 'category');

        //добавить сюда сортировку и два ренжа

        const areaCards = document.querySelector('.products-items');

        if (areaCards) {
            areaCards.textContent = '';
            if (obj.length === 0) areaCards.textContent = 'Не найдено соответствующих товаров';
            else
                obj.forEach((item) => {
                    const card = new Card('li', 'prod-elem', item);
                    areaCards.append(card.render());
                });
        }
    }

    static filterCount(filtersCountProduct: ICountProducts, param: 'category' | 'brand') {
        const filterCategory = filtersCountProduct[param];
        console.log(filterCategory);
        const categories = document.querySelectorAll(`.${param} .check-line`);
        categories.forEach((item) => {
            const name = item.getAttribute('data-name');
            const elem = filterCategory.find((i) => Object.keys(i)[0] === name);
            console.log(elem);
            const c = item.querySelector('.count') as Element;
            if (elem) {
                c.textContent = String(Object.values(elem)[0]);
            } else {
                c.textContent = '0';
            }
        });
    }

    constructor(id: string) {
        super(id);
    }

    createMainPage() {
        const main = document.createElement('div');
        main.classList.add('main');
        const appStorePage = document.createElement('div');
        appStorePage.classList.add('app-store-page');
        main.append(appStorePage);

        const filter = document.createElement('div');
        filter.classList.add('filter');
        filter.append(new Filter('div', 'filterBlock category', 'category').render());
        filter.append(new Filter('div', 'filterBlock brand', 'brand').render());

        const products = document.createElement('div');
        products.classList.add('products');

        const sortProducts = document.createElement('div');
        sortProducts.classList.add('sort-products');
        products.append(sortProducts);

        appStorePage.append(filter);
        appStorePage.append(products);

        const mainAreaCards = document.createElement('ul');
        mainAreaCards.classList.add('products-items');

        products.append(mainAreaCards);
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
