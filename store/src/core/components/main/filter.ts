import Component from '../../templates/components';

import * as obj from '../../../pages/main/products.json';
export default class Filter extends Component {
    filterBlock: 'category' | 'brand';
    constructor(tagName: string, className: string, filterBlock: 'category' | 'brand') {
        super(tagName, className);
        this.filterBlock = filterBlock;
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

        return this.container;
    }
    render() {
        this.createFilter();
        return this.container;
    }
}
