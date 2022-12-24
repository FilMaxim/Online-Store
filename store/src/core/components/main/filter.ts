import Component from '../../templates/components';

import * as obj from '../../../pages/main/products.json';
export default class Filter extends Component {
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
                const reg1 = new RegExp(`,${target.id}`, 'gi');
                const reg2 = new RegExp(`${target.id}`, 'gi');
                res = res.replace(reg1, '');
                res = res.replace(reg2, '');
            } else res += `,${targetCheck.id}`;
        }
        url.searchParams.set(this.filterBlock, res);
        console.log(res);

        window.location.hash = url.search;
    }
    arrCategories() {
        const arr: string[] = [];
        obj.products.forEach((el) => {
            if (arr.indexOf(el[this.filterBlock]) === -1) {
                arr.push(el[this.filterBlock]);
            }
        });
        return arr;
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
        const arrCategory = this.arrCategories();

        arrCategory.forEach((el) => {
            const checkboxLine = document.createElement('div');
            checkboxLine.classList.add('checkbox-line');

            const imputCategory = document.createElement('input');
            imputCategory.type = 'checkbox';
            imputCategory.id = el;
            if (this.param.indexOf(el) !== -1) imputCategory.checked = true;

            const labelCategory = document.createElement('label');
            labelCategory.htmlFor = el;
            labelCategory.textContent = el;

            checkboxLine.append(imputCategory);
            checkboxLine.append(labelCategory);
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
