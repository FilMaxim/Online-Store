import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';

export default class CartInfo extends Component {
    total: number;
    count: number;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.total = 2748.1;
        this.count = 2;
    }
    renderCartInfo() {
        const newTotal = document.createElement('span');
        newTotal.className = 'cart-info__total';
        newTotal.textContent = '€' + String(this.total);
        const newBtnCart = document.createElement('a');
        newBtnCart.className = 'cart-info__btn btn';
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
