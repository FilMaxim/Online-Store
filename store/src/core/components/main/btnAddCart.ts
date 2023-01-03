import Component from '../../templates/components';
import { TypeCart } from '../../../types';
import CartInfo from '../header/cart';
export default class BtnAddCart extends Component {
    id: number;
    price: number;
    textDrop: string;
    textAdd: string;
    static searchIndex(id: number) {
        const cartValues = localStorage.getItem('cart');
        if (!cartValues) return -1;
        const arrObj: TypeCart[] = JSON.parse(cartValues);
        return arrObj.findIndex((item) => item.id === id);
    }
    constructor(tagName: string, className: string, textAdd: string, textDrop: string, id: number, price: number) {
        super(tagName, className);
        this.container.textContent = textAdd;
        this.id = id;
        this.price = price;
        this.textAdd = textAdd;
        this.textDrop = textDrop;
    }

    addCart() {
        const obj = { id: this.id, count: 1, price: this.price };
        const cartValues = localStorage.getItem('cart');

        if (!cartValues) {
            localStorage.setItem('cart', JSON.stringify([obj]));
            this.container.textContent = this.textDrop;
            this.container.classList.add('btn-drop');
        } else {
            const arrObj = JSON.parse(cartValues);
            const index = BtnAddCart.searchIndex(this.id);
            if (index !== -1) {
                arrObj.splice(index, 1);
                this.container.textContent = this.textAdd;
                this.container.classList.remove('btn-drop');
                localStorage.setItem('cart', JSON.stringify(arrObj));
            } else {
                arrObj.push(obj);
                localStorage.setItem('cart', JSON.stringify(arrObj));
                this.container.textContent = this.textDrop;
                this.container.classList.add('btn-drop');
            }
        }
        CartInfo.changeLocal();
    }

    render(): HTMLElement {
        this.container.addEventListener('click', this.addCart.bind(this));
        if (BtnAddCart.searchIndex(this.id) === -1) {
            this.container.textContent = this.textAdd;
            this.container.classList.remove('btn-drop');
        } else {
            this.container.textContent = this.textDrop;
            this.container.classList.add('btn-drop');
        }
        return this.container;
    }
}
