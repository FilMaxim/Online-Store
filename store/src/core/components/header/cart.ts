import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';
import { TypeCart } from '../../../types';

export default class CartInfo extends Component {
    total: number;
    count: number;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.total = 2748.1;
        this.count = 2;
    }
    static changeLocal() {
        const cartValues = localStorage.getItem('cart');
        if (!cartValues) return;
        const total = document.querySelector('.cart-info__total');
        const count = document.querySelector('.cart-info__btn span') as HTMLElement;

        let cartCount = 0;
        let cartTotal = 0;

        const arrObj: TypeCart[] = JSON.parse(cartValues);
        arrObj.forEach((item) => {
            cartCount += item.count;
            cartTotal += item.count * item.price;
        });
        if (total) total.textContent = `€ ${cartTotal}`;
        if (count) {
            if (cartCount > 0) {
                count.textContent = String(cartCount);
                count.style.display = 'flex';
            } else {
                count.style.display = 'none';
            }
        }
        return [cartCount, cartTotal];
    }
    renderCartInfo() {
        const newTotal = document.createElement('span');
        newTotal.className = 'cart-info__total';
        newTotal.textContent = '€' + String(this.total);
        const newBtnCart = document.createElement('a');
        newBtnCart.className = 'cart-info__btn btn btn-cart';
        if (this.count > 0)
            newBtnCart.innerHTML = `<span>${this.count}</span>
        Cart`;
        else newBtnCart.innerHTML = 'Cart';
        newBtnCart.href = `#${PageIds.CartPage}`;
        this.container.append(newTotal);
        this.container.append(newBtnCart);
    }

    render() {
        this.renderCartInfo();
        return this.container;
    }
}
