import Component from '../../templates/components';
import { Product } from '../../../types';
export default class Range extends Component {
    rangeType: 'price' | 'stock';
    inputMin: HTMLInputElement;
    inputMax: HTMLInputElement;
    constructor(tagName: string, className: string, rangeType: 'price' | 'stock') {
        super(tagName, className);
        this.rangeType = rangeType;
        this.inputMin = document.createElement('input');
        this.inputMin.id = `${this.rangeType}-min`;
        this.inputMax = document.createElement('input');
        this.inputMax.id = `${this.rangeType}-max`;
    }
    createRange() {
        //   const container = document.createElement('div');
        //   container.classList.add(`container-range ${this.rangeType}`);
        //   container.innerHTML = `<div class="range__title">
        //   <h2>${this.rangeType}</h2>
        // </div>`;

        //   const rangeSlider = document.createElement('div');
        //   rangeSlider.classList.add('range__slider');
        //   const inputs = document.createElement('div');
        //   inputs.id = `range-${this.rangeType}`;
        //   rangeSlider.append(inputs);

        //   const rangeValues = document.createElement('div');
        //   rangeValues.classList.add('range__values');

        this.container.innerHTML = ` <h3>${this.rangeType}</h3>
        <section class="range-slider">
          <span class="rangeValues"></span>
          <input value="500" min="500" max="50000" step="500" type="range">
          <input value="50000" min="500" max="50000" step="500" type="range">
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

        const displayElement = parent.getElementsByClassName('rangeValues')[0];
        if (this.rangeType === 'price') displayElement.innerHTML = '$ ' + slide1 + ' - $' + slide2;
        else displayElement.innerHTML = slide1 + ' - ' + slide2;
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
