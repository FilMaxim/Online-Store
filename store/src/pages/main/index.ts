import './main.css';
import Page from '../../core/templates/page';
import Card from '../../core/components/main/card';
import Filter from '../../core/components/main/filter';
import Range from '../../core/components/main/range';
import SortSelect from '../../core/components/main/sortSelect';

import { IUrlHashParametr } from '../../types';

import * as objProducts from './products.json';

export const obj = objProducts.products;

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
        //range по стоку и цену
        if (hashParametr['stock']) {
            const minMax = hashParametr['stock'].split('|').map((item) => Number(item));
            obj = obj.filter((item) => item.stock > minMax[0] && item.stock < minMax[1]);
        }
        if (hashParametr['price']) {
            const minMax = hashParametr['price'].split('|').map((item) => Number(item));
            obj = obj.filter((item) => item.price > minMax[0] && item.price < minMax[1]);
        }

        //количество товаров в по каждой категории в фильтрах
        const filtersCountProduct = Filter.arrCategories(obj);
        Filter.filterCount(filtersCountProduct, 'brand');
        Filter.filterCount(filtersCountProduct, 'category');
        //добавить сюда поиск и тотал

        //добавить сюда сортировку
        if (hashParametr['sort']) {
            obj = SortSelect.sortObj(obj, hashParametr['sort'].split('-'));
        }

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

        filter.append(new Range('div', 'filterBlock range', 'price').render());
        filter.append(new Range('div', 'filterBlock range', 'stock').render());

        const products = document.createElement('div');
        products.classList.add('products');

        const sortProducts = document.createElement('div');
        sortProducts.classList.add('sort-products');
        products.append(sortProducts);

        //сортировка,тотал,поиск,вид
        const sort = new SortSelect('select', 'sort__select');
        sortProducts.append(sort.render());

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
