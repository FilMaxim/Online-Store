import Component from '../../templates/components';
import { Product } from '../../../types/index';
import { TypeCart } from '../../../types/index';
export default class ElementCart extends Component {
    cart: Product;
    itemInfo: HTMLAnchorElement;
    constructor(tagName: string, className: string, cart: Product) {
        super(tagName, className);
        this.cart = cart;
        this.itemInfo = document.createElement('a');
    }
    createElementCartPage() {
        const data2 = JSON.parse(String(localStorage.getItem('cart')));
        const elementPr = data2.find((e: TypeCart) => e.id === this.cart.id);

        const cartItemWrap = document.createElement('div');
        cartItemWrap.classList.add('cart-item-wrap');
        const itemI = document.createElement('div');
        itemI.classList.add('item-i');
        itemI.textContent = String(this.cart.num);
        this.itemInfo.classList.add('item-info');

        const imgCart = document.createElement('img');
        imgCart.src = this.cart.images[0];
        const itemDetailP = document.createElement('div');
        itemDetailP.classList.add('item-detai-p');

        const productTitle = document.createElement('div');
        productTitle.classList.add('product-title-cart');
        const productTitleH3 = document.createElement('h3');
        productTitleH3.textContent = this.cart.title;
        productTitle.append(productTitleH3);
        const productDescription = document.createElement('div');
        productDescription.classList.add('product-description');
        productDescription.innerHTML = this.cart.description;
        const productOther = document.createElement('div');
        productOther.classList.add('product-other');
        const rating = document.createElement('div');
        rating.classList.add('rating-discount');
        rating.textContent = `Rating: ${this.cart.rating}`;
        const discount = document.createElement('div');
        discount.classList.add('rating-discount');
        discount.textContent = `Discount: ${this.cart.discountPercentage}`;
        productOther.append(rating);
        productOther.append(discount);

        itemDetailP.append(productTitle);
        itemDetailP.append(productDescription);
        itemDetailP.append(productOther);

        this.itemInfo.append(imgCart);
        this.itemInfo.append(itemDetailP);

        const numberControl = document.createElement('div');
        numberControl.classList.add('number-control');
        const stockControl = document.createElement('div');
        stockControl.classList.add('stock-control');
        stockControl.textContent = `Stock: ${this.cart.stock}`;
        const incDecControl = document.createElement('div');
        incDecControl.classList.add('incDec-control');

        const btnControl1 = document.createElement('div');
        btnControl1.classList.add('btn-control');
        btnControl1.textContent = '-';
        const btnControl2 = document.createElement('div');
        btnControl2.classList.add('btn-control');
        btnControl2.textContent = '+';

        const spanAmount = document.createElement('span');
        let amound = 1;
        if (elementPr.count) {
            amound = elementPr.count;
            spanAmount.innerHTML = String(amound);
        }
        incDecControl.append(btnControl1);
        incDecControl.append(spanAmount);
        incDecControl.append(btnControl2);

        const amountControl = document.createElement('div');
        amountControl.classList.add('amount-control');
        amountControl.textContent = `€${this.cart.price}`;
        numberControl.append(stockControl);
        numberControl.append(incDecControl);
        numberControl.append(amountControl);

        cartItemWrap.append(itemI);
        cartItemWrap.append(this.itemInfo);
        cartItemWrap.append(numberControl);

        // слушатели клики по кол-ву товара
        btnControl1.addEventListener('click', () => {
            if (amound > 0) {
                const data2 = JSON.parse(String(localStorage.getItem('cart')));
                const elementPr = data2.findIndex((e: TypeCart) => e.id === this.cart.id);
                amound--;
                if (amound === 0) {
                    data2.splice(elementPr, 1);
                    if (data2.length === 0) localStorage.removeItem('cart');
                    this.container.remove();
                } else {
                    spanAmount.innerHTML = String(amound);
                    data2[elementPr].count = amound;
                }
                localStorage.setItem('cart', JSON.stringify(data2));
            }
        });
        btnControl2.addEventListener('click', () => {
            if (amound < this.cart.stock) {
                const data2 = JSON.parse(String(localStorage.getItem('cart')));
                const elementPr = data2.find((e: TypeCart) => e.id === this.cart.id);
                amound++;
                spanAmount.innerHTML = String(amound);
                elementPr.count = amound;
                localStorage.setItem('cart', JSON.stringify(data2));
            }
        });

        return cartItemWrap;
    }
    clickItemInfo() {
        window.location.hash = `id=${this.cart.id}`;
    }

    render() {
        const cart = this.createElementCartPage();
        this.itemInfo.addEventListener('click', this.clickItemInfo.bind(this));
        this.container.append(cart);
        return this.container;
    }
}
