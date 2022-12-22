import Component from '../../templates/components';

import * as obj from '../../../pages/main/products.json';
export default class Filter extends Component {
    filterBlock: 'category' | 'brand';
    param: string[];
    constructor(tagName: string, className: string, filterBlock: 'category' | 'brand', param: string[]) {
        super(tagName, className);
        this.filterBlock = filterBlock;
        this.param = param; //для выделения чекнутых фильтров
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
        return this.container;
    }
}
