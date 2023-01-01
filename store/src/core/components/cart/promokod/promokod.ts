import Component from '../../../templates/components';
import CartInfo from '../../header/cart';

export default class Promokod extends Component {
    count: HTMLElement;
    total: HTMLElement;
    discount: HTMLElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        const infoLocal = CartInfo.changeLocal();
        this.count = document.createElement('span');
        this.total = document.createElement('span');

        if (infoLocal) {
            this.count.textContent = '€' + String(infoLocal[0]);
            this.total.textContent = String(infoLocal[1]);
        }
        this.discount = document.createElement('span');
    }
    createAreaBlock() {
        const title = document.createElement('h2');
        title.className = 'promo__title';
        title.textContent = 'Summary';
        this.container.append(title);

        const count = document.createElement('div');
        count.className = 'promo__count promo__head-text';
        count.innerText = 'Products: ';
        count.append(this.count);
        this.container.append(count);
        console.log(this.count, count);

        const total = document.createElement('div');
        total.className = 'promo__total promo__head-text';
        total.textContent = 'Total: ';
        total.append(this.total);
        this.container.append(total);

        const discount = document.createElement('div');
        discount.className = 'promo__discount promo__head-text';
        discount.textContent = 'Total: ';
        discount.append(this.discount);
        this.container.append(discount);

        // this.container.innerHTML = `
        // <h2 class="promo__title">Summary</h2>
        // <div class="promo__count promo__head-text">Products ${this.count.textContent}</div>
        // <div class="promo__total promo__head-text delete">Total ${this.total.textContent}</div>
        // <div class="promo__discount promo__head-text">Total €${this.discount.textContent}</div>
        // <div class="promo__cods cods">
        //   <div class="cods__title">Applied codes</div>
        //   <div class="cods__item">
        //     <span class="cods__text">Rolling Scopes School - 10% -</span>
        //     <button class="btn">Drop</button>
        //   </div>
        //   <div class="cods__item">
        //     <span class="cods__text">Rolling Scopes School - 10% -</span>
        //     <button class="btn promo__drop">Drop</button>
        //   </div>

        // </div>
        // <input type="text" class="promo__input" placeholder="Enter promo code">
        // <span class="promo__help">Promo for test: 'RS', 'EPM'</span>
        // <div class='promo__desc'><span>EPAM Systems - 10%</span><button class='btn promo__add'>Add</div>
        // <button class="promo__btn btn">BUY NOW</button>`;
    }
    render() {
        this.createAreaBlock();
        return this.container;
    }
}
