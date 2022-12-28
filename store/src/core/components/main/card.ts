import Component from '../../templates/components';
import { Product } from '../../../types';
import BtnAddCart from './btnAddCart';

export default class Card extends Component {
    product: Product;
    btnAdd: HTMLButtonElement;
    constructor(tagName: string, className: string, product: Product) {
        super(tagName, className);
        this.product = product;
        this.btnAdd = new BtnAddCart(
            'button',
            'card__btn btn btn-cart',
            'Add',
            'Drop',
            product.id,
            product.price
        ).render() as HTMLButtonElement;
    }
    renderCard(product: Product) {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');
        itemWrapper.style.backgroundImage = `url(${product.thumbnail})`;

        const title = document.createElement('div');
        title.classList.add('item-title');
        title.textContent = product.title;
        itemWrapper.append(title);

        const info = document.createElement('div');
        info.classList.add('item-info');
        itemWrapper.append(info);

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info-item');
        info.append(itemInfo);

        const properItemArr = [
            `Caregory: ${product.category}`,
            `Brand: ${product.brand}`,
            `Price: €${product.price}`,
            `Discount: ${product.discountPercentage}%`,
            `Rating: ${product.rating}`,
            `Stock: ${product.stock}`,
        ];

        properItemArr.forEach((elem) => {
            const pProp = document.createElement('p');
            pProp.classList.add('ngcontent');
            pProp.textContent = elem;
            itemInfo.append(pProp);
        });

        const btns = document.createElement('div');
        btns.classList.add('card__btns');

        const element = document.createElement('button');
        element.className = 'card__btn btn btn-desc';
        element.textContent = 'Desc';

        btns.append(this.btnAdd);

        btns.append(element);

        itemWrapper.append(btns);
        this.container.setAttribute('id', String(product.id));
        this.container.setAttribute('price', String(product.price));

        this.container.append(itemWrapper);
    }
    setHashDeskId(e: Event) {
        const target = e.target as Element;
        if (!target.matches('button')) return;
        const id = target.closest(`.${this.container.className}`)?.getAttribute('id');

        if (target.matches('.btn-desc')) window.location.hash = `id=${id}`;
    }
    render() {
        this.renderCard(this.product);
        this.container.addEventListener('click', this.setHashDeskId.bind(this));

        return this.container;
    }
}
