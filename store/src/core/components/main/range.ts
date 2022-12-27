import Component from '../../templates/components';
import { Product } from '../../../types';
import { obj as objProduct } from '../../../pages/main';
import { sort } from 'semver';
export default class Range extends Component {
    static sortObj(obj: Product[], typeProduct: 'price' | 'stock') {
        const res = obj.sort((a, b) => (a[typeProduct] > b[typeProduct] ? 1 : -1));
        return res;
    }
    static minMaxObj(obj: Product[], typeProduct: 'price' | 'stock') {
        const url = new URL(window.location.href.replace('#', ''));
        const search = url.searchParams.get(typeProduct);
        if (search) {
            const minMax = search.split('|').map((item) => Number(item));
            return { min: minMax[0], max: minMax[1] };
        } else {
            const res = Range.sortObj(obj, typeProduct);
            return { min: res[0][typeProduct], max: res[res.length - 1][typeProduct] };
        }
    }

    rangeType: 'price' | 'stock';
    inputMin: number;
    inputMax: number;
    constructor(tagName: string, className: string, rangeType: 'price' | 'stock') {
        super(tagName, className);
        this.rangeType = rangeType;
        const minMax = Range.minMaxObj(objProduct, this.rangeType);
        this.inputMin = minMax.min;
        this.inputMax = minMax.max;
    }
    createRange() {
        Range.minMaxObj(objProduct, 'price');
        this.container.innerHTML = ` <h3>${this.rangeType}</h3>
        <section class="range-slider">
          <span class="rangeValues">${this.rangeType === 'price' ? '$' : ''}<span class=range-min>${
            this.inputMin
        }</span> - ${this.rangeType === 'price' ? '$' : ''}<span class=range-max>${this.inputMax}</span></span>
          <input value="${this.inputMin}" min="${this.inputMin}" max="${this.inputMax}" step="10" type="range">
          <input value="${this.inputMax}" min="${this.inputMin}" max="${this.inputMax}" step="10" type="range">
        </section>`;
    }
    rangeChange() {
        const parent = this.container;
        const slides = parent.getElementsByTagName('input');
        let slide1 = parseFloat(slides[0].value);
        let slide2 = parseFloat(slides[1].value);
        if (slide1 > slide2) {
            const tmp = slide2;
            slide2 = slide1;
            slide1 = tmp;
        }

        const min = parent.querySelector('.range-min');
        const max = parent.querySelector('.range-max');
        const res = [];
        if (min) {
            min.textContent = String(slide1);
            res.push(min.textContent);
        }
        if (max) {
            max.textContent = String(slide2);
            res.push(max.textContent);
        }
        const url = new URL(window.location.href.replace('#', ''));
        url.searchParams.set(this.rangeType, res.join('|'));
        window.location.hash = url.search;
    }

    rangeInit() {
        const sliders: NodeList | null = this.container.querySelectorAll('input');
        if (sliders) {
            for (let y = 0; y < sliders.length; y++) {
                sliders[y].addEventListener('input', this.rangeChange.bind(this));
            }
        }
    }

    render() {
        this.createRange();
        this.rangeInit();
        return this.container;
    }
}
