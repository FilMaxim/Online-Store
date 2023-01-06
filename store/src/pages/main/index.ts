import Page from '../../core/templates/page';
import Card from '../../core/components/main/card';
import Filter from '../../core/components/main/filter';
import Range from '../../core/components/main/range';
import SortSelect from '../../core/components/main/sortSelect';
import Search from '../../core/components/main/search/search';
import SearchInput from '../../core/components/main/search/inputText';
import SearchClose from '../../core/components/main/search/inputBtn';
import ViewCards from '../../core/components/main/viewsCards/viewsCard';
import ItemView from '../../core/components/main/viewsCards/itemView';
import BtnsReset from '../../core/components/main/btnsFilter/reset';
import BtnsCopy from '../../core/components/main/btnsFilter/copy';

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
        if (hashParametr['search']) {
            const val = new RegExp(hashParametr['search'], 'gi');
            obj = obj.filter(
                (item) =>
                    val.test(item.brand) ||
                    val.test(item.title) ||
                    val.test(item.category) ||
                    val.test(item.description) ||
                    val.test(String(item.discountPercentage)) ||
                    val.test(String(item.price)) ||
                    val.test(String(item.rating)) ||
                    val.test(String(item.stock))
            );
        }

        //добавить сюда сортировку
        if (hashParametr['sort']) {
            obj = SortSelect.sortObj(obj, hashParametr['sort'].split('-'));
        }
        const total = document.querySelector('.sort__total');
        if (total) total.innerHTML = `Found: ${obj.length}`;

        const areaCards = document.querySelector('.products-items');

        if (areaCards) {
            if (hashParametr['view']) {
                if (hashParametr['view'] === 'small') areaCards.classList.add('small-view');
                else areaCards.classList.remove('small-view');
            } else areaCards.classList.remove('small-view');
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

        const filterBtns = document.createElement('div');
        filterBtns.classList.add('filter__btns');
        filterBtns.append(new BtnsReset('button', 'filter__btn btn').render());
        filterBtns.append(new BtnsCopy('button', 'filter__btn btn').render());
        filter.append(filterBtns);

        filter.append(new Filter('div', 'filterBlock category', 'category').render());
        filter.append(new Filter('div', 'filterBlock brand', 'brand').render());

        filter.append(new Range('div', 'filterBlock range', 'price').render());
        filter.append(new Range('div', 'filterBlock range', 'stock').render());

        const products = document.createElement('div');
        products.classList.add('products');

        const sortProducts = document.createElement('div');
        sortProducts.classList.add('sort-products');
        products.append(sortProducts);

        //сортировка,тотал
        const sort = new SortSelect('select', 'sort__select');
        sortProducts.append(sort.render());

        const total = document.createElement('span');
        total.classList.add('sort__total');
        total.innerHTML = `Found: ${obj.length}`;
        sortProducts.append(total);

        //поиск
        const inputSearch = new SearchInput('input', 'search__text');
        const inputClose = new SearchClose('input', 'search__close');

        const searchArea = new Search(
            'form',
            'sort__search',
            inputSearch.render() as HTMLInputElement,
            inputClose.render() as HTMLInputElement
        );
        sortProducts.append(searchArea.render());

        //внешний вид
        const viewBig = new ItemView('div', 'big view-item view__big', 4);
        const viewSmall = new ItemView('div', 'small view-item view__small', 6);
        const views = new ViewCards('div', 'sort__views views', viewBig.render(), viewSmall.render());
        sortProducts.append(views.render());

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
