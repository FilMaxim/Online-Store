import './main.css';
import Page from '../../core/templates/page';
import * as obj from './products.json';

interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    textContent?: string;
    thumbnail: string;
    title: string;
}

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Страница товаров с фильтрами',
    };

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
        filter.append(this.createFilter('category'));
        filter.append(this.createFilter('brand'));

        const products = document.createElement('div');
        products.classList.add('products');

        const sortProducts = document.createElement('div');
        sortProducts.classList.add('sort-products');
        products.append(sortProducts);

        appStorePage.append(filter);
        appStorePage.append(products);

        products.append(this.createListProduct());
        return main;
    }

    createListProduct() {
        const productsUl = document.createElement('ul');
        productsUl.classList.add('products-items');

        const createProduct = (product: Product) => {
            const productLi = document.createElement('li');
            productLi.classList.add('prod-elem');

            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-wrapper');
            itemWrapper.style.backgroundImage = `url(${product.thumbnail})`;

            const title = document.createElement('div');
            title.classList.add('item-title');
            title.textContent = product.title;
            itemWrapper.append(title);

            const info = document.createElement('div');
            info.classList.add('item-info');
            itemWrapper.append(info);

            const itemInfo = document.createElement('div');
            itemInfo.classList.add('item-info-item');
            info.append(itemInfo);

            const properItemArr = [
                `Caregory: ${product.category}`,
                `Brand: ${product.brand}`,
                `Price: €${product.price}`,
                `Discount: ${product.discountPercentage}%`,
                `Rating: ${product.rating}`,
                `Stock: ${product.stock}`,
            ];

            properItemArr.forEach((elem) => {
                const pProp = document.createElement('p');
                pProp.classList.add('ngcontent');
                pProp.textContent = elem;
                itemInfo.append(pProp);
            });

            productLi.append(itemWrapper);

            return productLi;
        };

        obj.products.forEach((el) => {
            productsUl.append(createProduct(el));
        });

        return productsUl;
    }

    //массив для фильтра;
    arrCategories = function (key: 'category' | 'brand') {
        const arr: string[] = [];
        obj.products.forEach((el) => {
            if (arr.indexOf(el[key]) === -1) {
                arr.push(el[key]);
            }
        });
        return arr;
    };

    createFilter(filterBlock: 'category' | 'brand') {
        const category = document.createElement('div');
        category.classList.add('filterBlock');

        const categoryH1 = document.createElement('h3');
        categoryH1.textContent = filterBlock;
        category.append(categoryH1);

        const filterList = document.createElement('div');
        filterList.classList.add('filter-list');
        category.append(filterList);
        // arrCategory - массив для category
        const arrCategory = this.arrCategories(filterBlock);
        console.log(arrCategory);

        arrCategory.forEach((el) => {
            const checkboxLine = document.createElement('div');
            checkboxLine.classList.add('checkbox-line');

            const imputCategory = document.createElement('input');
            imputCategory.type = 'checkbox';
            imputCategory.id = el;
            const labelCategory = document.createElement('label');
            labelCategory.htmlFor = el;
            labelCategory.textContent = el;

            checkboxLine.append(imputCategory);
            checkboxLine.append(labelCategory);
            filterList.append(checkboxLine);
        });

        return category;
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
