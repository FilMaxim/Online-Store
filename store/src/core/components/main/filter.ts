import Component from '../../templates/components';

import { obj } from '../../../pages/main';
import { Product } from '../../../types';
import { ICountProducts } from '../../../types';

export default class Filter extends Component {
    static arrCategories(obj: Product[]) {
        const categoryCount: ICountProducts = { category: [], brand: [] };
        obj.forEach((el) => {
            const indexCategory: number = categoryCount['category'].findIndex(
                (cat) => Object.keys(cat)[0] === el.category
            );
            if (indexCategory === -1) categoryCount['category'].push({ [el.category]: 1 });
            else {
                const key = Object.keys(categoryCount['category'][indexCategory])[0];
                categoryCount['category'][indexCategory][key]++;
            }
            const indexBrand: number = categoryCount['brand'].findIndex((cat) => Object.keys(cat)[0] === el.brand);
            if (indexBrand === -1) categoryCount['brand'].push({ [el.brand]: 1 });
            else {
                const key = Object.keys(categoryCount['brand'][indexBrand])[0];
                categoryCount['brand'][indexBrand][key]++;
            }
        });

        return categoryCount;
    }
    //считает кол-во товаров по каждому пункту фильтров
    static filterCount(filtersCountProduct: ICountProducts, param: 'category' | 'brand') {
        const filterCategory = filtersCountProduct[param];
        const categories = document.querySelectorAll(`.${param} .check-line`);
        categories.forEach((item) => {
            const name = item.getAttribute('data-name');
            const elem = filterCategory.find((i) => Object.keys(i)[0] === name);
            const c = item.querySelector('.count') as Element;
            if (elem) {
                c.textContent = String(Object.values(elem)[0]);
            } else {
                c.textContent = '0';
            }
        });
    }
    filterBlock: 'category' | 'brand';
    param: string[];
    static searchCheckParam(name: string): string[] {
        const url = new URL(window.location.href.replace('#', ''));
        const res = url.searchParams.get(name);

        return res ? res.split(',') : [];
    }
    constructor(tagName: string, className: string, filterBlock: 'category' | 'brand') {
        super(tagName, className);
        this.filterBlock = filterBlock;
        this.param = Filter.searchCheckParam(this.filterBlock); //для выделения чекнутых фильтров
    }
    setHash(e: Event) {
        const target = e.target as Element;
        if (!target.matches('input')) return;
        const targetCheck = e.target as HTMLInputElement;
        const url = new URL(window.location.href.replace('#', ''));
        let res = url.searchParams.get(this.filterBlock);
        if (!res) res = targetCheck.id;
        else {
            if (res.includes(target.id)) {
                const reg1 = new RegExp(`,?${target.id}`, 'gi');
                res = res.replace(reg1, '');
            } else res += `,${targetCheck.id}`;
        }
        url.searchParams.set(this.filterBlock, res);
        window.location.hash = url.search;
    }

    createFilter() {
        Filter.searchCheckParam(this.filterBlock);
        const categoryH1 = document.createElement('h3');
        categoryH1.textContent = this.filterBlock;
        this.container.append(categoryH1);

        const filterList = document.createElement('div');
        filterList.classList.add('filter-list');
        this.container.append(filterList);
        // arrCategory - массив для category
        const arrCategory = Filter.arrCategories(obj)[this.filterBlock];

        arrCategory.forEach((el) => {
            const key = Object.keys(el)[0];
            const value = el[key];
            const checkboxLine = document.createElement('div');
            checkboxLine.classList.add('checkbox-line');

            const inputs = document.createElement('div');
            inputs.classList.add('checkbox');

            const imputCategory = document.createElement('input');
            imputCategory.type = 'checkbox';
            imputCategory.id = key;
            if (this.param.indexOf(key) !== -1) imputCategory.checked = true;

            const labelCategory = document.createElement('label');
            labelCategory.htmlFor = key;
            labelCategory.textContent = key;

            //count
            const countProduct = document.createElement('span');
            countProduct.classList.add('check-line');
            countProduct.setAttribute('data-name', key);
            countProduct.innerHTML = `(<span class='count'>${value}</span>/${value})`;

            inputs.append(imputCategory);
            inputs.append(labelCategory);
            checkboxLine.append(inputs);
            checkboxLine.append(countProduct);
            filterList.append(checkboxLine);
        });

        return this.container;
    }
    render() {
        this.createFilter.call(this);
        this.container.addEventListener('click', this.setHash.bind(this));
        return this.container;
    }
}
