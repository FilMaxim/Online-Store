import Component from '../../templates/components';
import { Product } from '../../../types';
export default class SortSelect extends Component {
    static sortObj(obj: Product[], param: string[]): Product[] {
        const t = param[0];
        const p = param[1];
        let res = obj;
        if (p === 'asc') {
            if (t === 'price' || t === 'rating' || t === 'stock') res = res.sort((a, b) => (a[t] > b[t] ? 1 : -1));
        } else {
            if (t === 'price' || t === 'rating' || t === 'stock') {
                res = res.sort((a, b) => (a[t] < b[t] ? 1 : -1));
            }
        }

        return res;
    }
    options: string[];
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.options = ['price-asc', 'price-desc', 'rating-asc', 'rating-desc', 'stock-asc', 'stock-desc'];
    }
    renderSort() {
        const elD = document.createElement('option') as HTMLOptionElement;
        elD.textContent = 'Sort options';
        elD.setAttribute('disabled', 'true');
        elD.setAttribute('selected', 'true');
        this.container.append(elD);
        this.options.forEach((item) => {
            const el = document.createElement('option') as HTMLOptionElement;
            el.value = item;
            el.textContent = 'Sort by ' + item.split('-').join(' ');
            this.container.append(el);
        });
    }
    setHash() {
        const el = this.container as HTMLSelectElement;
        const selectedOption = el.options[el.selectedIndex];
        const url = new URL(window.location.href.replace('#', ''));
        url.searchParams.set('sort', selectedOption.value);
        window.location.hash = url.search;
    }
    render() {
        this.container.addEventListener('change', this.setHash.bind(this));
        this.renderSort();
        return this.container;
    }
}
